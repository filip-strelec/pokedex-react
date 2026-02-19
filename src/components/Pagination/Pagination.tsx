import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { usePokemon } from '../../context/PokemonContext';
import { Button } from '../../styles/shared';
import { ActionType } from '../../types';
import * as S from './Pagination.styles';

interface PaginationProps {
  totalPages: number;
}

function getPageNumbers(current: number, total: number): (number | string)[] {
  const pages: (number | string)[] = [];
  const delta = 2;
  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  pages.push(1);
  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('...');
  if (total > 1) pages.push(total);

  return pages;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const { state, dispatch } = usePokemon();
  const { page } = state;

  if (totalPages <= 1) return null;

  const setPage = (p: number) => dispatch({ type: ActionType.SET_PAGE, payload: p });
  const pages = getPageNumbers(page, totalPages);

  return (
    <S.Wrapper>
      <Button onClick={() => setPage(1)} disabled={page === 1} $variant="outline">
        <FiChevronsLeft size={16} />
      </Button>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1} $variant="outline">
        <FiChevronLeft size={16} />
      </Button>

      {pages.map((p, i) =>
        p === '...' ? (
          <S.Info key={`dots-${i}`}>…</S.Info>
        ) : (
          <S.PageNum
            key={p}
            $active={p === page}
            $variant={p === page ? 'secondary' : 'outline'}
            onClick={() => setPage(p as number)}
          >
            {p}
          </S.PageNum>
        )
      )}

      <Button onClick={() => setPage(page + 1)} disabled={page === totalPages} $variant="outline">
        <FiChevronRight size={16} />
      </Button>
      <Button onClick={() => setPage(totalPages)} disabled={page === totalPages} $variant="outline">
        <FiChevronsRight size={16} />
      </Button>
    </S.Wrapper>
  );
}

