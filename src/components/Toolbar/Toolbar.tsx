import { FiShare2, FiDownload } from 'react-icons/fi';
import { usePokemon } from '../../context/PokemonContext';
import { Select, Button } from '../../styles/shared';
import { SORT_OPTIONS, PAGE_SIZE_OPTIONS } from '../../constants';
import { ActionType } from '../../types';
import * as S from './Toolbar.styles';

interface ToolbarProps {
  filteredCount: number;
  totalCount: number;
  onShowExport: () => void;
}

export default function Toolbar({ filteredCount, totalCount, onShowExport }: ToolbarProps) {
  const { state, dispatch } = usePokemon();

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url).then(() => {
      dispatch({ type: ActionType.SHOW_TOAST, payload: { message: 'URL copied to clipboard!', type: 'success' } });
    });
  };

  return (
    <S.Bar>
      <S.Left>
        <S.Count>
          Showing {filteredCount} of {totalCount} Pokémon
        </S.Count>
        <Select
          value={state.sort}
          onChange={(e) =>
            dispatch({ type: ActionType.SET_SORT, payload: e.target.value })
          }
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
        <Select
          value={state.pageSize}
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_PAGE_SIZE,
              payload: parseInt(e.target.value, 10),
            })
          }
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </Select>
      </S.Left>
      <S.Right>
        <Button $variant="outline" onClick={handleShare} title="Copy shareable URL">
          <FiShare2 size={14} /> Share
        </Button>
        <Button $variant="outline" onClick={onShowExport} title="Export data">
          <FiDownload size={14} /> Export
        </Button>
      </S.Right>
    </S.Bar>
  );
}

