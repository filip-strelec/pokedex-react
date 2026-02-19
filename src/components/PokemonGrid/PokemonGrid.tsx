import PokemonCard from '../PokemonCard';
import type { Pokemon } from '../../types';
import * as S from './PokemonGrid.styles';

interface PokemonGridProps {
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
}

export default function PokemonGrid({ pokemon, loading, error }: PokemonGridProps) {
  if (loading) {
    return (
      <S.LoadingWrap>
        <S.Spinner />
        <p>Loading Pokémon...</p>
      </S.LoadingWrap>
    );
  }

  if (error) {
    return (
      <S.ErrorState>
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </S.ErrorState>
    );
  }

  if (pokemon.length === 0) {
    return (
      <S.EmptyState>
        <h3>No Pokémon found</h3>
        <p>Try adjusting your filters or search query.</p>
      </S.EmptyState>
    );
  }

  return (
    <S.Grid>
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </S.Grid>
  );
}

