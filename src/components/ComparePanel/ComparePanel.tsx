import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { usePokemon } from '../../context/PokemonContext';
import { fetchPokemonBatch } from '../../api/pokeApi';
import { Button, TypeBadge } from '../../styles/shared';
import { capitalize, formatStatName } from '../../utils/pokemon';
import type { Pokemon } from '../../types';
import { ActionType } from '../../types';
import * as S from './ComparePanel.styles';

const statKeys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

interface ComparePanelProps {
  onClose: () => void;
}

export default function ComparePanel({ onClose }: ComparePanelProps) {
  const { state, dispatch } = usePokemon();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (state.compareList.length === 0) {
      setPokemonList([]);
      return;
    }
    let cancelled = false;
    fetchPokemonBatch(state.compareList)
      .then((data) => {
        if (!cancelled) {
          const map = new Map(data.map((p) => [p.id, p]));
          setPokemonList(
            state.compareList
              .map((id) => map.get(id))
              .filter((p): p is Pokemon => p !== undefined)
          );
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [state.compareList]);

  if (pokemonList.length === 0 && state.compareList.length === 0) return null;

  const getBest = (stat: string): number => {
    const max = Math.max(...pokemonList.map((p) => (p.stats as Record<string, number>)[stat] || 0));
    return max;
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Panel onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <h2>Compare Pokémon</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button onClick={() => dispatch({ type: ActionType.CLEAR_COMPARE })}>Clear All</Button>
            <Button onClick={onClose}>
              <FiX size={18} />
            </Button>
          </div>
        </S.Header>

        <S.CompareGrid $count={pokemonList.length}>
          <S.Cell $header>Pokémon</S.Cell>
          {pokemonList.map((p) => (
            <S.Cell key={p.id}>
              <S.PokemonImg src={p.image} alt={p.name} />
              <strong style={{ textTransform: 'capitalize' }}>{capitalize(p.name)}</strong>
              <S.Types>
                {p.types.map((t) => (
                  <TypeBadge key={t} $type={t} style={{ fontSize: '0.55rem' }}>
                    {t}
                  </TypeBadge>
                ))}
              </S.Types>
            </S.Cell>
          ))}

          {statKeys.map((stat) => {
            const best = getBest(stat);
            return [
              <S.Cell key={`label-${stat}`} $header>
                {formatStatName(stat)}
              </S.Cell>,
              ...pokemonList.map((p) => (
                <S.Cell
                  key={`${p.id}-${stat}`}
                  $best={pokemonList.length > 1 && (p.stats as Record<string, number>)[stat] === best}
                >
                  {(p.stats as Record<string, number>)[stat] || 0}
                </S.Cell>
              )),
            ];
          })}

          <S.Cell $header>Total</S.Cell>
          {pokemonList.map((p) => {
            const maxTotal = Math.max(...pokemonList.map((x) => x.totalStats));
            return (
              <S.Cell
                key={`total-${p.id}`}
                $best={pokemonList.length > 1 && p.totalStats === maxTotal}
              >
                {p.totalStats}
              </S.Cell>
            );
          })}
        </S.CompareGrid>
      </S.Panel>
    </S.Overlay>
  );
}

