import { useCallback } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';
import { usePokemon } from '../../context/PokemonContext';
import { Button, Input } from '../../styles/shared';
import { POKEMON_TYPES, GENERATIONS } from '../../constants';
import { capitalize } from '../../utils/pokemon';
import { ActionType } from '../../types';
import * as S from './FilterPanel.styles';

interface FilterPanelProps {
  allAbilities: string[];
}

export default function FilterPanel({ allAbilities }: FilterPanelProps) {
  const { state, dispatch } = usePokemon();
  const { filters } = state;

  const updateFilter = useCallback(
    (key: string, value: unknown) => dispatch({ type: ActionType.UPDATE_FILTER, key, value }),
    [dispatch]
  );

  const toggleType = useCallback(
    (type: string) => {
      const current = filters.types || [];
      const updated = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      updateFilter('types', updated.length ? updated : undefined);
    },
    [filters.types, updateFilter]
  );

  const handleStatRange = useCallback(
    (stat: string, bound: string, value: string) => {
      const ranges = { ...(filters.statRanges || {}) };
      if (!ranges[stat]) ranges[stat] = {};
      if (value === '') {
        delete (ranges[stat] as Record<string, unknown>)[bound];
        if (Object.keys(ranges[stat]).length === 0) delete ranges[stat];
      } else {
        (ranges[stat] as Record<string, number>)[bound] = parseInt(value, 10);
      }
      updateFilter('statRanges', Object.keys(ranges).length ? ranges : undefined);
    },
    [filters.statRanges, updateFilter]
  );

  if (!state.showFilters) return null;

  return (
    <S.Panel>
      <S.FilterHeader>
        <h3>Filters</h3>
        <Button onClick={() => dispatch({ type: ActionType.CLEAR_FILTERS })}>
          <FiX size={14} /> Clear All
        </Button>
      </S.FilterHeader>
      <S.Sections>
        <S.Section>
          <S.Label>Search by ID or Name</S.Label>
          <S.SearchWrap>
            <FiSearch size={15} />
            <Input
              placeholder="e.g. 25 or Pikachu"
              value={filters.name || ''}
              onChange={(e) => updateFilter('name', e.target.value || undefined)}
            />
          </S.SearchWrap>
        </S.Section>

        <S.Section>
          <S.Label>Generation</S.Label>
          <S.SmallSelect
            value={filters.generation || ''}
            onChange={(e) =>
              updateFilter('generation', e.target.value ? parseInt(e.target.value, 10) : undefined)
            }
          >
            <option value="">All Generations</option>
            {GENERATIONS.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </S.SmallSelect>
        </S.Section>

        <S.Section>
          <S.Label>Abilities</S.Label>
          <S.AbilitySelect
            value=""
            onChange={(e) => {
              if (!e.target.value) return;
              const current = filters.abilities || [];
              if (!current.includes(e.target.value)) {
                updateFilter('abilities', [...current, e.target.value]);
              }
              e.target.value = '';
            }}
          >
            <option value="">Add ability filter...</option>
            {allAbilities.map((a) => (
              <option key={a} value={a}>{capitalize(a.replace('-', ' '))}</option>
            ))}
          </S.AbilitySelect>
          {filters.abilities && filters.abilities.length > 0 && (
            <S.TypeGrid style={{ marginTop: '6px' }}>
              {filters.abilities.map((a) => (
                <Button
                  key={a}
                  style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                  onClick={() =>
                    updateFilter('abilities', filters.abilities!.filter((x) => x !== a))
                  }
                >
                  {capitalize(a.replace('-', ' '))} ×
                </Button>
              ))}
            </S.TypeGrid>
          )}
        </S.Section>

        <S.Section>
          <S.Label>Stat Ranges</S.Label>
          {['attack', 'defense', 'speed', 'hp'].map((stat) => (
            <S.RangeRow key={stat}>
              <span style={{ width: '50px' }}>{capitalize(stat)}</span>
              <S.SmallInput
                type="number"
                placeholder="Min"
                min="0"
                max="255"
                value={filters.statRanges?.[stat]?.min ?? ''}
                onChange={(e) => handleStatRange(stat, 'min', e.target.value)}
              />
              <span>–</span>
              <S.SmallInput
                type="number"
                placeholder="Max"
                min="0"
                max="255"
                value={filters.statRanges?.[stat]?.max ?? ''}
                onChange={(e) => handleStatRange(stat, 'max', e.target.value)}
              />
            </S.RangeRow>
          ))}
        </S.Section>
      </S.Sections>

      <div style={{ marginTop: '16px' }}>
        <S.Label>Types</S.Label>
        <S.TypeGrid>
          {POKEMON_TYPES.map((type) => (
            <S.TypeBtn
              key={type}
              $type={type}
              $active={filters.types?.includes(type)}
              onClick={() => toggleType(type)}
            >
              {type}
            </S.TypeBtn>
          ))}
        </S.TypeGrid>
      </div>
    </S.Panel>
  );
}

