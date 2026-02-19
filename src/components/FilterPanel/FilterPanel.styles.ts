import styled from 'styled-components';
import { TypeBadge } from '../../styles/shared';

export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  h3 {
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const Sections = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const Section = styled.div``;

export const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 6px;
`;

export const SearchWrap = styled.div`
  position: relative;
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  input {
    padding-left: 36px;
  }
`;

export const TypeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const TypeBtn = styled(TypeBadge).attrs({ as: 'button' })<{ $active?: boolean }>`
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;
  font-size: 0.65rem;

  &:hover {
    opacity: ${({ $active }) => ($active ? 1 : 0.7)};
    filter: ${({ $active }) => ($active ? 'brightness(1.15)' : 'none')};
    transform: translateY(-1px);
  }
`;

export const SmallSelect = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.85rem;
  background: ${({ theme }) => theme.colors.surface};
  outline: none;
  cursor: pointer;
  &:focus { border-color: ${({ theme }) => theme.colors.borderFocus}; }
`;

export const RangeRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 6px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SmallInput = styled.input`
  width: 60px;
  padding: 6px 8px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.8rem;
  outline: none;
  &:focus { border-color: ${({ theme }) => theme.colors.borderFocus}; }
`;

export const AbilitySelect = styled(SmallSelect)``;

