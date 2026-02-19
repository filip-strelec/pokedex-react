import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { getFavorites, saveFavorites, getTeam, saveTeam } from '../utils/storage';
import { decodeFiltersFromURL } from '../utils/url';
import { MAX_TEAM_SIZE } from '../constants';
import { ActionType } from '../types';
import type { AppState, AppAction, PokemonContextValue } from '../types';

const PokemonContext = createContext<PokemonContextValue | null>(null);

const initialURL = decodeFiltersFromURL(window.location.search);

const initialState: AppState = {
  masterList: [],
  cachedPokemon: [],
  pageData: { pokemon: [], totalPages: 0, totalCount: 0, filteredCount: 0 },
  typeFilterIds: null,
  loading: true,
  error: null,
  filters: initialURL.filters || {},
  sort: initialURL.sort || 'id-asc',
  page: initialURL.page || 1,
  pageSize: initialURL.pageSize || 20,
  favorites: getFavorites(),
  team: getTeam(),
  selectedPokemon: null,
  compareList: [],
  showFilters: false,
  toast: null,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case ActionType.SET_MASTER_LIST:
      return { ...state, masterList: action.payload };
    case ActionType.SET_PAGE_DATA: {
      const newPokemon = action.payload.pokemon || [];
      const cachedMap = new Map(state.cachedPokemon.map((p) => [p.id, p]));
      newPokemon.forEach((p) => cachedMap.set(p.id, p));
      return {
        ...state,
        pageData: action.payload,
        cachedPokemon: Array.from(cachedMap.values()),
        loading: false,
      };
    }
    case ActionType.SET_TYPE_FILTER_IDS:
      return { ...state, typeFilterIds: action.payload };
    case ActionType.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionType.SET_FILTERS:
      return { ...state, filters: action.payload, page: 1 };
    case ActionType.UPDATE_FILTER:
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
        page: 1,
      };
    case ActionType.CLEAR_FILTERS:
      return { ...state, filters: {}, page: 1 };
    case ActionType.SET_SORT:
      return { ...state, sort: action.payload, page: 1 };
    case ActionType.SET_PAGE:
      return { ...state, page: action.payload };
    case ActionType.SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload, page: 1 };
    case ActionType.TOGGLE_FAVORITE: {
      const id = action.payload;
      const favs = state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id];
      saveFavorites(favs);
      return { ...state, favorites: favs };
    }
    case ActionType.TOGGLE_TEAM: {
      const id = action.payload;
      if (state.team.includes(id)) {
        const team = state.team.filter((t) => t !== id);
        saveTeam(team);
        return { ...state, team };
      }
      if (state.team.length >= MAX_TEAM_SIZE) {
        return { ...state, toast: { message: `Team is full! Maximum ${MAX_TEAM_SIZE} Pokémon allowed.`, type: 'warning' } };
      }
      const team = [...state.team, id];
      saveTeam(team);
      return { ...state, team };
    }
    case ActionType.SET_FAVORITES:
      saveFavorites(action.payload);
      return { ...state, favorites: action.payload };
    case ActionType.SET_TEAM:
      saveTeam(action.payload);
      return { ...state, team: action.payload };
    case ActionType.SET_SELECTED:
      return { ...state, selectedPokemon: action.payload };
    case ActionType.TOGGLE_COMPARE: {
      const id = action.payload;
      if (state.compareList.includes(id)) {
        return { ...state, compareList: state.compareList.filter((c) => c !== id) };
      }
      if (state.compareList.length >= 3) {
        return { ...state, toast: { message: 'Compare is full! Maximum 3 Pokémon allowed.', type: 'warning' } };
      }
      return { ...state, compareList: [...state.compareList, id] };
    }
    case ActionType.CLEAR_COMPARE:
      return { ...state, compareList: [] };
    case ActionType.TOGGLE_FILTERS:
      return { ...state, showFilters: !state.showFilters };
    case ActionType.SHOW_TOAST:
      return { ...state, toast: action.payload };
    case ActionType.CLEAR_TOAST:
      return { ...state, toast: null };
    default:
      return state;
  }
}

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveFavorites(state.favorites);
  }, [state.favorites]);

  useEffect(() => {
    saveTeam(state.team);
  }, [state.team]);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon(): PokemonContextValue {
  const ctx = useContext(PokemonContext);
  if (!ctx) throw new Error('usePokemon must be used within PokemonProvider');
  return ctx;
}

