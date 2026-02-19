import type { Generation, SortOption } from './types';

export const API_BASE = 'https://pokeapi.co/api/v2';

export const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
];

export const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export const GENERATIONS: Generation[] = [
  { id: 1, name: 'Generation I', range: [1, 151] },
  { id: 2, name: 'Generation II', range: [152, 251] },
  { id: 3, name: 'Generation III', range: [252, 386] },
  { id: 4, name: 'Generation IV', range: [387, 493] },
  { id: 5, name: 'Generation V', range: [494, 649] },
  { id: 6, name: 'Generation VI', range: [650, 721] },
  { id: 7, name: 'Generation VII', range: [722, 809] },
  { id: 8, name: 'Generation VIII', range: [810, 905] },
  { id: 9, name: 'Generation IX', range: [906, 1025] },
];

export const PAGE_SIZE_OPTIONS = [20, 50, 100];

export const SORT_OPTIONS: SortOption[] = [
  { value: 'id-asc', label: 'ID (Low → High)' },
  { value: 'id-desc', label: 'ID (High → Low)' },
  { value: 'name-asc', label: 'Name (A → Z)' },
  { value: 'name-desc', label: 'Name (Z → A)' },
  { value: 'total-desc', label: 'Total Power (High → Low)' },
  { value: 'total-asc', label: 'Total Power (Low → High)' },
  { value: 'hp-desc', label: 'HP (High → Low)' },
  { value: 'attack-desc', label: 'Attack (High → Low)' },
  { value: 'defense-desc', label: 'Defense (High → Low)' },
  { value: 'speed-desc', label: 'Speed (High → Low)' },
];

export const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export const MAX_TEAM_SIZE = 6;

