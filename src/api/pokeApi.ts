import { API_BASE } from '../constants';
import type { Pokemon } from '../types';

const cache = new Map<string, unknown>();
let preloadStarted = false;

async function fetchWithCache<T>(url: string): Promise<T> {
  if (cache.has(url)) return cache.get(url) as T;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  cache.set(url, data);
  return data as T;
}

// Preload all Pokemon data in the background
async function preloadAllPokemon() {
  if (preloadStarted) return;
  preloadStarted = true;

  try {
    console.log('[Cache] Starting background preload of all 1025 Pokémon...');
    const startTime = Date.now();

    // Fetch in batches to avoid overwhelming the API
    const BATCH_SIZE = 100;
    const TOTAL_POKEMON = 1025;

    for (let i = 1; i <= TOTAL_POKEMON; i += BATCH_SIZE) {
      const batchIds = Array.from(
        { length: Math.min(BATCH_SIZE, TOTAL_POKEMON - i + 1) },
        (_, idx) => i + idx
      );

      // Fetch batch in parallel
      await Promise.all(
        batchIds.map((id) =>
          fetchPokemonDetail(id).catch(() => {
            // Silently ignore errors during preload
          })
        )
      );

      // Small delay between batches to be nice to the API
      if (i + BATCH_SIZE <= TOTAL_POKEMON) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`[Cache] ✅ Preloaded all Pokémon in ${duration}s`);
  } catch (error) {
    console.error('[Cache] Preload failed:', error);
  }
}

// Hacky way to start preloading as soon as the page is loaded in the background
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => preloadAllPokemon(), { timeout: 2000 });
  } else {
    setTimeout(() => preloadAllPokemon(), 100);
  }
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

