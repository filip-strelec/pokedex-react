import type { Filters } from '../types';

export function encodeFiltersToURL(filters: Filters, sort: string, page: number, pageSize: number): string {
  const params = new URLSearchParams();

  if (filters.name) params.set('q', filters.name);
  if (filters.types?.length) params.set('types', filters.types.join(','));
  if (filters.generation) params.set('gen', String(filters.generation));
  if (filters.abilities?.length) params.set('abilities', filters.abilities.join(','));

  if (filters.statRanges) {
    for (const [stat, range] of Object.entries(filters.statRanges)) {
      if (range.min !== undefined) params.set(`${stat}_min`, String(range.min));
      if (range.max !== undefined) params.set(`${stat}_max`, String(range.max));
    }
  }

  if (sort && sort !== 'id-asc') params.set('sort', sort);
  if (page && page !== 1) params.set('page', String(page));
  if (pageSize && pageSize !== 20) params.set('size', String(pageSize));

  return params.toString();
}

export function decodeFiltersFromURL(searchString: string) {
  const params = new URLSearchParams(searchString);

  const filters: Filters = {};
  const q = params.get('q');
  if (q) filters.name = q;

  const types = params.get('types');
  if (types) filters.types = types.split(',');

  const gen = params.get('gen');
  if (gen) filters.generation = parseInt(gen, 10);

  const abilities = params.get('abilities');
  if (abilities) filters.abilities = abilities.split(',');

  const statKeys = ['attack', 'defense', 'speed', 'hp'];
  const statRanges: Record<string, { min?: number; max?: number }> = {};
  let hasStatRange = false;
  for (const stat of statKeys) {
    const min = params.get(`${stat}_min`);
    const max = params.get(`${stat}_max`);
    if (min || max) {
      statRanges[stat] = {};
      if (min) statRanges[stat].min = parseInt(min, 10);
      if (max) statRanges[stat].max = parseInt(max, 10);
      hasStatRange = true;
    }
  }
  if (hasStatRange) filters.statRanges = statRanges;

  const sort = params.get('sort') || 'id-asc';
  const page = parseInt(params.get('page') || '1', 10);
  const pageSize = parseInt(params.get('size') || '20', 10);

  return { filters, sort, page, pageSize };
}

