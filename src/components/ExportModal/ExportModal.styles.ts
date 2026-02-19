import styled from 'styled-components';
import { Input } from '../../styles/shared';

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

export const Modal = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  max-width: 480px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
    max-height: 90vh;
    overflow-y: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  h2 {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RadioOption = styled.label<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1.5px solid
    ${({ theme, $selected }) => ($selected ? theme.colors.secondary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  background: ${({ theme, $selected }) =>
    $selected ? `${theme.colors.secondary}11` : 'transparent'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
  }

  input {
    cursor: pointer;
  }

  span {
    font-size: 0.85rem;
  }
`;

export const RangeInputs = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
`;

export const SmallInput = styled(Input)`
  width: 80px;
  padding: 8px 10px;
  font-size: 0.85rem;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const Info = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 8px;
`;

