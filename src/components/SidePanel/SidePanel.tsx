import { useEffect, useState } from 'react';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { usePokemon } from '../../context/PokemonContext';
import { fetchPokemonBatch } from '../../api/pokeApi';
import { Button, TypeBadge } from '../../styles/shared';
import { capitalize } from '../../utils/pokemon';
import type { Pokemon } from '../../types';
import { ActionType } from '../../types';
import * as S from './SidePanel.styles';

interface SidePanelProps {
  title: string;
  pokemonIds: number[];
  onClose: () => void;
  onRemove: (id: number) => void;
  emptyText?: string;
}

export default function SidePanel({ title, pokemonIds, onClose, onRemove, emptyText }: SidePanelProps) {
  const { dispatch } = usePokemon();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (pokemonIds.length === 0) {
      setPokemonList([]);
      return;
    }
    let cancelled = false;
    fetchPokemonBatch(pokemonIds)
      .then((data) => {
        if (!cancelled) {
          const map = new Map(data.map((p) => [p.id, p]));
          setPokemonList(
            pokemonIds.map((id) => map.get(id)).filter((p): p is Pokemon => p !== undefined)
          );
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [pokemonIds]);

  return (
    <S.Overlay onClick={onClose}>
      <S.Panel onClick={(e) => e.stopPropagation()}>
        <S.PanelHeader>
          <h2>{title}</h2>
          <Button onClick={onClose}>
            <FiX size={18} />
          </Button>
        </S.PanelHeader>

        {pokemonList.length === 0 ? (
          <S.Empty>{emptyText || 'No Pokémon here yet.'}</S.Empty>
        ) : (
          pokemonList.map((p) => (
            <S.PokemonRow
              key={p.id}
              onClick={() => {
                dispatch({ type: ActionType.SET_SELECTED, payload: p });
                onClose();
              }}
            >
              <S.MiniImg src={p.image} alt={p.name} $type={p.types[0]} />
              <S.PokemonInfo>
                <h4>{capitalize(p.name)}</h4>
                <S.Types>
                  {p.types.map((t) => (
                    <TypeBadge key={t} $type={t} style={{ fontSize: '0.6rem' }}>
                      {t}
                    </TypeBadge>
                  ))}
                </S.Types>
              </S.PokemonInfo>
              <S.RemoveBtn
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(p.id);
                }}
                title="Remove"
              >
                <FiTrash2 size={14} />
              </S.RemoveBtn>
            </S.PokemonRow>
          ))
        )}
      </S.Panel>
    </S.Overlay>
  );
}

