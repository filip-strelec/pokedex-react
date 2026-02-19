import { useEffect, useMemo, useRef } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { ActionType } from '../types';
import {
  fetchPokemonList,
  fetchPokemonBatch,
  fetchTypeDetail,
  extractPokemonId,
} from '../api/pokeApi';
import { encodeFiltersToURL } from '../utils/url';
import { GENERATIONS } from '../constants';
import type { PokemonListItem } from '../types';

export function usePokemonData() {
  const { state, dispatch } = usePokemon();
  const masterListRef = useRef<PokemonListItem[]>([]);

  // 1. Load the lightweight master list on mount
  useEffect(() => {
    let cancelled = false;
    async function loadMasterList() {
      try {
        const { results } = await fetchPokemonList(1025, 0);
        const list: PokemonListItem[] = results.map((p) => ({
          id: extractPokemonId(p.url),
          name: p.name,
        }));
        if (!cancelled) {
          masterListRef.current = list;
          dispatch({ type: ActionType.SET_MASTER_LIST, payload: list });
        }
      } catch (err) {
        if (!cancelled) dispatch({ type: ActionType.SET_ERROR, payload: (err as Error).message });
      }
    }
    loadMasterList();
    return () => { cancelled = true; };
  }, [dispatch]);

  // 2. Determine filtered IDs from the lightweight list + type endpoint
  const filteredIds = useMemo(() => {
    let list = state.masterList;
    if (!list.length) return [];

    const { filters } = state;

    if (filters.name) {
      const q = filters.name.toLowerCase().trim();
      // Search by ID (exact match) or name (partial match)
      list = list.filter((p) => {
        const idMatch = q === String(p.id);
        const nameMatch = p.name.toLowerCase().includes(q);
        return idMatch || nameMatch;
      });
    }

    if (filters.generation) {
      const gen = GENERATIONS.find((g) => g.id === filters.generation);
      if (gen) {
        list = list.filter((p) => p.id >= gen.range[0] && p.id <= gen.range[1]);
      }
    }

    if (filters.types && filters.types.length > 0 && state.typeFilterIds) {
      const typeSet = new Set(state.typeFilterIds);
      list = list.filter((p) => typeSet.has(p.id));
    }

    return list.map((p) => p.id);
  }, [state.masterList, state.filters, state.typeFilterIds]);

  // 3. Sort filtered IDs
  const sortedIds = useMemo(() => {
    const ids = [...filteredIds];
    const [field, direction] = state.sort.split('-');
    const mult = direction === 'asc' ? 1 : -1;

    if (field === 'id') {
      ids.sort((a, b) => (a - b) * mult);
    } else if (field === 'name') {
      const nameMap = new Map(state.masterList.map((p) => [p.id, p.name]));
      ids.sort((a, b) => (nameMap.get(a) || '').localeCompare(nameMap.get(b) || '') * mult);
    }
    return ids;
  }, [filteredIds, state.sort, state.masterList]);

  const needsDetailSort = useMemo(() => {
    const [field] = state.sort.split('-');
    return !['id', 'name'].includes(field);
  }, [state.sort]);

  const hasAdvancedFilters = useMemo(() => {
    const { filters } = state;
    return (
      (filters.abilities && filters.abilities.length > 0) ||
      (filters.statRanges && Object.keys(filters.statRanges).length > 0)
    );
  }, [state.filters]);

  // 4. Fetch type filter IDs when type filters change
  useEffect(() => {
    const types = state.filters.types;
    if (!types?.length) {
      dispatch({ type: ActionType.SET_TYPE_FILTER_IDS, payload: null });
      return;
    }
    let cancelled = false;
    async function loadTypeIds() {
      try {
        const results = await Promise.all(types!.map(fetchTypeDetail));
        const idSets = results.map(
          (r: { pokemon: { pokemon: { url: string } }[] }) =>
            new Set(r.pokemon.map((p) => extractPokemonId(p.pokemon.url)))
        );
        const union = new Set<number>();
        idSets.forEach((s) => s.forEach((id) => union.add(id)));
        if (!cancelled) {
          dispatch({ type: ActionType.SET_TYPE_FILTER_IDS, payload: [...union] });
        }
      } catch {
        if (!cancelled) dispatch({ type: ActionType.SET_TYPE_FILTER_IDS, payload: null });
      }
    }
    loadTypeIds();
    return () => { cancelled = true; };
  }, [state.filters.types, dispatch]);

  // 5. Fetch details for the current page
  useEffect(() => {
    if (sortedIds.length === 0 && state.masterList.length > 0) {
      dispatch({ type: ActionType.SET_PAGE_DATA, payload: { pokemon: [], totalPages: 0, totalCount: 0, filteredCount: 0 } });
      return;
    }
    if (sortedIds.length === 0) return;

    let cancelled = false;
    async function loadPage() {
      dispatch({ type: ActionType.SET_LOADING, payload: true });
      try {
        if (needsDetailSort || hasAdvancedFilters) {
          let detailedPokemon = await fetchPokemonBatch(sortedIds);
          if (state.filters.abilities && state.filters.abilities.length > 0) {
            detailedPokemon = detailedPokemon.filter((p) =>
              state.filters.abilities!.some((a) => p.abilities.includes(a))
            );
          }
          if (state.filters.statRanges) {
            for (const [stat, range] of Object.entries(state.filters.statRanges)) {
              detailedPokemon = detailedPokemon.filter((p) => {
                const val = p.stats[stat];
                if (val === undefined) return false;
                if (range.min !== undefined && val < range.min) return false;
                if (range.max !== undefined && val > range.max) return false;
                return true;
              });
            }
          }
          if (needsDetailSort) {
            const [field, direction] = state.sort.split('-');
            const mult = direction === 'asc' ? 1 : -1;
            detailedPokemon.sort((a, b) => {
              switch (field) {
                case 'total': return (a.totalStats - b.totalStats) * mult;
                case 'hp': return ((a.stats.hp || 0) - (b.stats.hp || 0)) * mult;
                case 'attack': return ((a.stats.attack || 0) - (b.stats.attack || 0)) * mult;
                case 'defense': return ((a.stats.defense || 0) - (b.stats.defense || 0)) * mult;
                case 'speed': return ((a.stats.speed || 0) - (b.stats.speed || 0)) * mult;
                default: return 0;
              }
            });
          }
          if (cancelled) return;
          const totalCount = detailedPokemon.length;
          const totalPages = Math.ceil(totalCount / state.pageSize);
          const start = (state.page - 1) * state.pageSize;
          const pagePokemon = detailedPokemon.slice(start, start + state.pageSize);
          dispatch({
            type: ActionType.SET_PAGE_DATA,
            payload: { pokemon: pagePokemon, totalPages, totalCount, filteredCount: totalCount },
          });
        } else {
          const finalIds = sortedIds;
          const totalCount = finalIds.length;
          const totalPages = Math.ceil(totalCount / state.pageSize);
          const start = (state.page - 1) * state.pageSize;
          const pageIds = finalIds.slice(start, start + state.pageSize);
          const pagePokemon = await fetchPokemonBatch(pageIds);
          if (cancelled) return;
          dispatch({
            type: ActionType.SET_PAGE_DATA,
            payload: { pokemon: pagePokemon, totalPages, totalCount, filteredCount: totalCount },
          });
        }
      } catch (err) {
        if (!cancelled) dispatch({ type: ActionType.SET_ERROR, payload: (err as Error).message });
      }
    }
    loadPage();
    return () => { cancelled = true; };
  }, [sortedIds, state.page, state.pageSize, needsDetailSort, hasAdvancedFilters, state.sort, state.filters, dispatch]);

  // Sync URL with filters
  useEffect(() => {
    const qs = encodeFiltersToURL(state.filters, state.sort, state.page, state.pageSize);
    const newParams = new URLSearchParams(qs);
    const currentParams = new URLSearchParams(window.location.search);
    const pokemonParam = currentParams.get('pokemon');
    if (pokemonParam) newParams.set('pokemon', pokemonParam);
    const newUrl = newParams.toString() ? `?${newParams.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [state.filters, state.sort, state.page, state.pageSize]);

  // Abilities list from cached details
  const allAbilities = useMemo(() => {
    const set = new Set<string>();
    state.cachedPokemon.forEach((p) => p.abilities.forEach((a) => set.add(a)));
    return Array.from(set).sort();
  }, [state.cachedPokemon]);

  return {
    pokemonPage: state.pageData.pokemon,
    totalPages: state.pageData.totalPages,
    totalCount: state.pageData.totalCount,
    filteredCount: state.pageData.filteredCount,
    allAbilities,
  };
}

