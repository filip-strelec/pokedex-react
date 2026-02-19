import { memo, useState } from 'react';
import { FiHeart, FiPlus, FiCheck, FiShuffle } from 'react-icons/fi';
import { GiPokecog } from 'react-icons/gi';
import { TypeBadge } from '../../styles/shared';
import { usePokemon } from '../../context/PokemonContext';
import { capitalize } from '../../utils/pokemon';
import type { Pokemon } from '../../types';
import { ActionType } from '../../types';
import * as S from './PokemonCard.styles';

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const { state, dispatch } = usePokemon();
  const [imgError, setImgError] = useState(false);
  const isFav = state.favorites.includes(pokemon.id);
  const inTeam = state.team.includes(pokemon.id);
  const inCompare = state.compareList.includes(pokemon.id);

  return (
    <S.StyledCard
      $clickable
      onClick={() => dispatch({ type: ActionType.SET_SELECTED, payload: pokemon })}
    >
      <S.ImageWrap $type={pokemon.types[0]}>
        <S.IdBadge>#{String(pokemon.id).padStart(3, '0')}</S.IdBadge>
        <S.ActionButtons onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <S.IconBtn
            $active={isFav}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => dispatch({ type: ActionType.TOGGLE_FAVORITE, payload: pokemon.id })}
          >
            <FiHeart size={13} fill={isFav ? 'currentColor' : 'none'} />
          </S.IconBtn>
          <S.IconBtn
            $active={inTeam}
            $hoverColor="#38a169"
            title={inTeam ? 'Remove from team' : 'Add to team'}
            onClick={() => dispatch({ type: ActionType.TOGGLE_TEAM, payload: pokemon.id })}
          >
            {inTeam ? <FiCheck size={13} /> : <FiPlus size={13} />}
          </S.IconBtn>
          <S.IconBtn
            $active={inCompare}
            $hoverColor="#3182ce"
            title="Toggle compare"
            onClick={() => dispatch({ type: ActionType.TOGGLE_COMPARE, payload: pokemon.id })}
          >
            <FiShuffle size={13} />
          </S.IconBtn>
          <S.IconBtn
            as="a"
            href={`https://pokedex-terminal.ssolutions.hr/?pokemon=${pokemon.id}`}
            target="_blank"
            rel="noopener noreferrer"
            $active={true}
            $hoverColor="#ee1515"
            title="Catch this Pokémon!"
          >
            <GiPokecog size={14} />
          </S.IconBtn>
        </S.ActionButtons>
        {imgError ? (
          <S.Placeholder />
        ) : (
          <S.PokemonImage
            src={pokemon.image}
            alt={pokemon.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </S.ImageWrap>
      <S.Info>
        <S.Name>{capitalize(pokemon.name)}</S.Name>
        <S.Types>
          {pokemon.types.map((t) => (
            <TypeBadge key={t} $type={t}>{t}</TypeBadge>
          ))}
        </S.Types>
        <S.Stats>
          <S.StatItem><strong>{pokemon.stats.hp}</strong><span>HP</span></S.StatItem>
          <S.StatItem><strong>{pokemon.stats.attack}</strong><span>ATK</span></S.StatItem>
          <S.StatItem><strong>{pokemon.stats.defense}</strong><span>DEF</span></S.StatItem>
        </S.Stats>
      </S.Info>
    </S.StyledCard>
  );
}

export default memo(PokemonCard);

