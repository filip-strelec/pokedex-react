import { GENERATIONS } from '../constants';
import type { Pokemon, Filters } from '../types';

export function getGeneration(pokemonId: number): number | null {
  for (const gen of GENERATIONS) {
    if (pokemonId >= gen.range[0] && pokemonId <= gen.range[1]) {
      return gen.id;
    }
  }
  return null;
}

export function filterPokemon(pokemonList: Pokemon[], filters: Filters): Pokemon[] {
  return pokemonList.filter((p) => {
    if (filters.name) {
      const query = filters.name.toLowerCase();
      if (!p.name.toLowerCase().includes(query)) return false;
    }

    if (filters.types && filters.types.length > 0) {
      if (!filters.types.some((t) => p.types.includes(t))) return false;
    }

    if (filters.generation) {
      if (getGeneration(p.id) !== filters.generation) return false;
    }

    if (filters.abilities && filters.abilities.length > 0) {
      if (!filters.abilities.some((a) => p.abilities.includes(a))) return false;
    }

    if (filters.statRanges) {
      for (const [stat, range] of Object.entries(filters.statRanges)) {
        const val = p.stats[stat];
        if (val === undefined) return false;
        if (range.min !== undefined && val < range.min) return false;
        if (range.max !== undefined && val > range.max) return false;
      }
    }

    return true;
  });
}

export function sortPokemon(pokemonList: Pokemon[], sortKey: string): Pokemon[] {
  const sorted = [...pokemonList];
  const [field, direction] = sortKey.split('-');
  const mult = direction === 'asc' ? 1 : -1;

  sorted.sort((a, b) => {
    switch (field) {
      case 'id':
        return (a.id - b.id) * mult;
      case 'name':
        return a.name.localeCompare(b.name) * mult;
      case 'total':
        return (a.totalStats - b.totalStats) * mult;
      case 'hp':
        return ((a.stats.hp || 0) - (b.stats.hp || 0)) * mult;
      case 'attack':
        return ((a.stats.attack || 0) - (b.stats.attack || 0)) * mult;
      case 'defense':
        return ((a.stats.defense || 0) - (b.stats.defense || 0)) * mult;
      case 'speed':
        return ((a.stats.speed || 0) - (b.stats.speed || 0)) * mult;
      default:
        return 0;
    }
  });

  return sorted;
}

export function paginatePokemon(pokemonList: Pokemon[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return {
    data: pokemonList.slice(start, start + pageSize),
    totalPages: Math.ceil(pokemonList.length / pageSize),
    totalCount: pokemonList.length,
  };
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatStatName(name: string): string {
  const map: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };
  return map[name] || name;
}

