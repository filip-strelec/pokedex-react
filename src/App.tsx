import { useState, useEffect } from 'react';
import { usePokemon } from './context/PokemonContext';
import { usePokemonData } from './hooks/usePokemonData';
import { Container } from './styles/shared';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import Toolbar from './components/Toolbar';
import PokemonGrid from './components/PokemonGrid';
import Pagination from './components/Pagination';
import PokemonModal from './components/PokemonModal';
import SidePanel from './components/SidePanel';
import ComparePanel from './components/ComparePanel';
import ExportModal from './components/ExportModal';
import Toast from './components/Toast';
import { fetchPokemonBatch } from './api/pokeApi';
import { ActionType } from './types';

function App() {
  const { state, dispatch } = usePokemon();
  const {
    pokemonPage,
    totalPages,
    totalCount,
    filteredCount,
    allAbilities,
  } = usePokemonData();

  const [showFavorites, setShowFavorites] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // Capture ?pokemon=<id> from initial URL BEFORE any effects can overwrite it
  const [initialPokemonId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('pokemon');
  });

  // On mount, if we had a ?pokemon=<id> param, fetch and open that pokemon's modal
  useEffect(() => {
    if (initialPokemonId) {
      fetchPokemonBatch([parseInt(initialPokemonId, 10)])
        .then((data) => {
          if (data.length > 0) {
            dispatch({ type: ActionType.SET_SELECTED, payload: data[0] });
          }
        })
        .catch(() => {});
    }
  }, [initialPokemonId, dispatch]);

  return (
    <>
      <Header
        onShowFavorites={() => setShowFavorites(true)}
        onShowTeam={() => setShowTeam(true)}
        onShowCompare={() => setShowCompare(true)}
      />

      <Container style={{ paddingTop: '24px', paddingBottom: '48px' }}>
        <FilterPanel allAbilities={allAbilities} />

        <Toolbar
          filteredCount={filteredCount}
          totalCount={totalCount}
          onShowExport={() => setShowExport(true)}
        />

        <PokemonGrid
          pokemon={pokemonPage}
          loading={state.loading}
          error={state.error}
        />

        <Pagination totalPages={totalPages} />
      </Container>

      <PokemonModal />

      {showFavorites && (
        <SidePanel
          title="❤️ Favorites"
          pokemonIds={state.favorites}
          onClose={() => setShowFavorites(false)}
          onRemove={(id:number) => dispatch({ type: ActionType.TOGGLE_FAVORITE, payload: id })}
          emptyText="No favorites yet. Click the ❤️ on any Pokémon to add it."
        />
      )}

      {showTeam && (
        <SidePanel
          title="👥 My Team"
          pokemonIds={state.team}
          onClose={() => setShowTeam(false)}
          onRemove={(id: number) => dispatch({ type: ActionType.TOGGLE_TEAM, payload: id })}
          emptyText="Your team is empty. Add up to 6 Pokémon!"
        />
      )}

      {showCompare && (
        <ComparePanel onClose={() => setShowCompare(false)} />
      )}

      {showExport && (
        <ExportModal
          onClose={() => setShowExport(false)}
          filteredPokemon={pokemonPage}
          totalCount={totalCount}
        />
      )}

      <Toast />
    </>
  );
}

export default App;

