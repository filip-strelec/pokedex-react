export interface PokemonListItem {
  id: number;
  name: string;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
  [key: string]: number;
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  stats: PokemonStats;
  totalStats: number;
  abilities: string[];
  height: number;
  weight: number;
  image: string;
  sprites: unknown;
}

export interface StatRange {
  min?: number;
  max?: number;
}

export interface Filters {
  name?: string;
  types?: string[];
  generation?: number;
  abilities?: string[];
  statRanges?: Record<string, StatRange>;
}

export interface PageData {
  pokemon: Pokemon[];
  totalPages: number;
  totalCount: number;
  filteredCount: number;
}

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface AppState {
  masterList: PokemonListItem[];
  cachedPokemon: Pokemon[];
  pageData: PageData;
  typeFilterIds: number[] | null;
  loading: boolean;
  error: string | null;
  filters: Filters;
  sort: string;
  page: number;
  pageSize: number;
  favorites: number[];
  team: number[];
  selectedPokemon: Pokemon | null;
  compareList: number[];
  showFilters: boolean;
  toast: Toast | null;
}

export enum ActionType {
  SET_MASTER_LIST = 'SET_MASTER_LIST',
  SET_PAGE_DATA = 'SET_PAGE_DATA',
  SET_TYPE_FILTER_IDS = 'SET_TYPE_FILTER_IDS',
  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING',
  SET_FILTERS = 'SET_FILTERS',
  UPDATE_FILTER = 'UPDATE_FILTER',
  CLEAR_FILTERS = 'CLEAR_FILTERS',
  SET_SORT = 'SET_SORT',
  SET_PAGE = 'SET_PAGE',
  SET_PAGE_SIZE = 'SET_PAGE_SIZE',
  TOGGLE_FAVORITE = 'TOGGLE_FAVORITE',
  TOGGLE_TEAM = 'TOGGLE_TEAM',
  SET_FAVORITES = 'SET_FAVORITES',
  SET_TEAM = 'SET_TEAM',
  SET_SELECTED = 'SET_SELECTED',
  TOGGLE_COMPARE = 'TOGGLE_COMPARE',
  CLEAR_COMPARE = 'CLEAR_COMPARE',
  TOGGLE_FILTERS = 'TOGGLE_FILTERS',
  SHOW_TOAST = 'SHOW_TOAST',
  CLEAR_TOAST = 'CLEAR_TOAST',
}

export type AppAction =
  | { type: ActionType.SET_MASTER_LIST; payload: PokemonListItem[] }
  | { type: ActionType.SET_PAGE_DATA; payload: PageData }
  | { type: ActionType.SET_TYPE_FILTER_IDS; payload: number[] | null }
  | { type: ActionType.SET_ERROR; payload: string }
  | { type: ActionType.SET_LOADING; payload: boolean }
  | { type: ActionType.SET_FILTERS; payload: Filters }
  | { type: ActionType.UPDATE_FILTER; key: string; value: unknown }
  | { type: ActionType.CLEAR_FILTERS }
  | { type: ActionType.SET_SORT; payload: string }
  | { type: ActionType.SET_PAGE; payload: number }
  | { type: ActionType.SET_PAGE_SIZE; payload: number }
  | { type: ActionType.TOGGLE_FAVORITE; payload: number }
  | { type: ActionType.TOGGLE_TEAM; payload: number }
  | { type: ActionType.SET_FAVORITES; payload: number[] }
  | { type: ActionType.SET_TEAM; payload: number[] }
  | { type: ActionType.SET_SELECTED; payload: Pokemon | null }
  | { type: ActionType.TOGGLE_COMPARE; payload: number }
  | { type: ActionType.CLEAR_COMPARE }
  | { type: ActionType.TOGGLE_FILTERS }
  | { type: ActionType.SHOW_TOAST; payload: Toast }
  | { type: ActionType.CLEAR_TOAST };

export interface Generation {
  id: number;
  name: string;
  range: [number, number];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface BackupData {
  favorites: number[];
  team: number[];
  exportedAt: string;
  version: number;
}

export interface PokemonContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

