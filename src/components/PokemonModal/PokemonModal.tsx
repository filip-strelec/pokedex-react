import { useEffect, useState, useCallback } from 'react';
import { FiX, FiHeart, FiPlus, FiCheck, FiShare2, FiShuffle } from 'react-icons/fi';
import { usePokemon } from '../../context/PokemonContext';
import { fetchPokemonSpecies } from '../../api/pokeApi';
import { capitalize, formatStatName } from '../../utils/pokemon';
import { TypeBadge, Button } from '../../styles/shared';
import { ActionType } from '../../types';
import * as S from './PokemonModal.styles';

export default function PokemonModal() {
  const { state, dispatch } = usePokemon();
  const pokemon = state.selectedPokemon;
  const [description, setDescription] = useState('');

  const close = useCallback(() => {
    dispatch({ type: ActionType.SET_SELECTED, payload: null });
    const params = new URLSearchParams(window.location.search);
    params.delete('pokemon');
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [dispatch]);

  useEffect(() => {
    if (!pokemon) return;
    const params = new URLSearchParams(window.location.search);
    params.set('pokemon', String(pokemon.id));
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [pokemon]);

  useEffect(() => {
    if (!pokemon) return;
    let cancelled = false;
    fetchPokemonSpecies(pokemon.id)
      .then((data) => {
        if (cancelled) return;
        const entry = data.flavor_text_entries.find(
          (e: { language: { name: string }; flavor_text: string }) => e.language.name === 'en'
        );
        setDescription(entry?.flavor_text?.replace(/[\n\f]/g, ' ') || '');
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [pokemon]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [close]);

  if (!pokemon) return null;

  const isFav = state.favorites.includes(pokemon.id);
  const inTeam = state.team.includes(pokemon.id);
  const inCompare = state.compareList.includes(pokemon.id);
  const compareFull = state.compareList.length >= 3 && !inCompare;
  const statEntries = Object.entries(pokemon.stats);

  return (
    <S.Overlay onClick={close}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.CloseBtn onClick={close}><FiX size={18} /></S.CloseBtn>
        <S.ImageSection $type={pokemon.types[0]}>
          <S.PokemonImg src={pokemon.image} alt={pokemon.name} />
        </S.ImageSection>
        <S.Body>
          <S.NameRow>
            <S.PokeName>{capitalize(pokemon.name)}</S.PokeName>
            <S.IdText>#{String(pokemon.id).padStart(3, '0')}</S.IdText>
          </S.NameRow>
          <S.Types>
            {pokemon.types.map((t) => (
              <TypeBadge key={t} $type={t}>{t}</TypeBadge>
            ))}
          </S.Types>
          {description && <S.Description>{description}</S.Description>}
          <S.MetaGrid>
            <S.MetaItem><strong>Height:</strong> {(pokemon.height / 10).toFixed(1)} m</S.MetaItem>
            <S.MetaItem><strong>Weight:</strong> {(pokemon.weight / 10).toFixed(1)} kg</S.MetaItem>
            <S.MetaItem><strong>Total Stats:</strong> {pokemon.totalStats}</S.MetaItem>
          </S.MetaGrid>
          <S.SectionTitle>Base Stats</S.SectionTitle>
          {statEntries.map(([name, value]) => (
            <S.StatRow key={name}>
              <S.StatLabel>{formatStatName(name)}</S.StatLabel>
              <S.StatValue>{value}</S.StatValue>
              <S.StatBar>
                <S.StatFill $pct={(value / 255) * 100} />
              </S.StatBar>
            </S.StatRow>
          ))}
          <S.SectionTitle style={{ marginTop: '16px' }}>Abilities</S.SectionTitle>
          <S.AbilityList>
            {pokemon.abilities.map((a) => (
              <S.AbilityBadge key={a}>{a.replace('-', ' ')}</S.AbilityBadge>
            ))}
          </S.AbilityList>
          <S.ActionRow>
            <Button
              $variant={isFav ? 'primary' : 'outline'}
              onClick={() => dispatch({ type: ActionType.TOGGLE_FAVORITE, payload: pokemon.id })}
            >
              <FiHeart size={14} fill={isFav ? '#fff' : 'none'} />
              {isFav ? 'Favorited' : 'Favorite'}
            </Button>
            <Button
              $variant={inTeam ? 'secondary' : 'outline'}
              onClick={() => dispatch({ type: ActionType.TOGGLE_TEAM, payload: pokemon.id })}
            >
              {inTeam ? <FiCheck size={14} /> : <FiPlus size={14} />}
              {inTeam ? 'In Team' : 'Add to Team'}
            </Button>
            <Button
              $variant={inCompare ? 'secondary' : 'outline'}
              onClick={() => dispatch({ type: ActionType.TOGGLE_COMPARE, payload: pokemon.id })}
              title={compareFull ? 'Max 3 Pokémon in compare' : inCompare ? 'Remove from compare' : 'Add to compare'}
            >
              <FiShuffle size={14} />
              {inCompare ? 'Comparing' : compareFull ? 'Max 3' : 'Compare'}
            </Button>
            <Button
              $variant="outline"
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard?.writeText(url).then(() => {
                  dispatch({ type: ActionType.SHOW_TOAST, payload: { message: 'Link copied to clipboard!', type: 'success' } });
                });
              }}
              title="Copy shareable link"
            >
              <FiShare2 size={14} /> Share
            </Button>
          </S.ActionRow>
        </S.Body>
      </S.Modal>
    </S.Overlay>
  );
}

