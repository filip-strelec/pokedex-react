import { API_BASE } from '../constants';
import type { Pokemon } from '../types';

const cache = new Map<string, unknown>();

async function fetchWithCache<T>(url: string): Promise<T> {
  if (cache.has(url)) return cache.get(url) as T;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  cache.set(url, data);
  return data as T;
}

interface PokemonListResponse {
  results: { name: string; url: string }[];
  count: number;
}

export async function fetchPokemonList(limit = 1025, offset = 0) {
  const data = await fetchWithCache<PokemonListResponse>(
    `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`
  );
  return { results: data.results, count: data.count };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchPokemonDetail(nameOrId: string | number): Promise<any> {
  return fetchWithCache(`${API_BASE}/pokemon/${nameOrId}`);
}

export async function fetchPokemonBatch(ids: number[]): Promise<Pokemon[]> {
  const results = await Promise.all(
    ids.map((id) => fetchPokemonDetail(id).then(normalizePokemon))
  );
  return results;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchPokemonSpecies(nameOrId: string | number): Promise<any> {
  return fetchWithCache(`${API_BASE}/pokemon-species/${nameOrId}`);
}

export async function fetchAllTypes() {
  const data = await fetchWithCache<{ results: { name: string; url: string }[] }>(`${API_BASE}/type`);
  return data.results.filter(
    (t) => t.name !== 'unknown' && t.name !== 'shadow'
  );
}

export async function fetchTypeDetail(typeName: string): Promise<any> { //could have types here for promise...
  return fetchWithCache(`${API_BASE}/type/${typeName}`);
}

export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function extractPokemonId(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return parseInt(parts[parts.length - 1], 10);
}

export function normalizePokemon(raw: any): Pokemon {
  const stats: Record<string, number> = {};
  let total = 0;
  for (const s of raw.stats) {
    stats[s.stat.name] = s.base_stat;
    total += s.base_stat;
  }
  return {
    id: raw.id,
    name: raw.name,
    types: raw.types.map((t: { type: { name: string } }) => t.type.name),
    stats: stats as Pokemon['stats'],
    totalStats: total,
    abilities: raw.abilities.map((a: { ability: { name: string } }) => a.ability.name),
    height: raw.height,
    weight: raw.weight,
    image:
      raw.sprites?.other?.['official-artwork']?.front_default ||
      getPokemonImageUrl(raw.id),
    sprites: raw.sprites,
  };
}

