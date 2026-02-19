import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
    max-height: 95vh;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  h2 {
    font-size: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    h2 {
      font-size: 1rem;
    }
  }
`;

export const CompareGrid = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: 120px ${({ $count }) => `repeat(${$count}, 1fr)`};
  gap: 2px;
  font-size: 0.85rem;
  overflow-x: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 80px ${({ $count }) => `repeat(${$count}, 1fr)`};
    font-size: 0.75rem;
  }
`;

export const Cell = styled.div<{ $header?: boolean; $best?: boolean }>`
  padding: 8px 12px;
  background: ${({ $header, theme }) => ($header ? theme.colors.bg : 'transparent')};
  border-radius: ${({ theme }) => theme.radii.sm};
  display: flex;
  align-items: center;
  justify-content: ${({ $header }) => ($header ? 'flex-start' : 'center')};
  font-weight: ${({ $header, $best }) => ($header || $best ? '700' : '400')};
  color: ${({ $best, theme }) => ($best ? theme.colors.success : theme.colors.text)};
  flex-direction: column;
  gap: 4px;
`;

export const PokemonImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

export const Types = styled.div`
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
  justify-content: center;
`;

