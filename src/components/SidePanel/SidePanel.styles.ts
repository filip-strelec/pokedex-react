import styled from 'styled-components';
import { TYPE_COLORS } from '../../constants';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  z-index: 200;
  display: flex;
  justify-content: flex-end;
`;

export const Panel = styled.div`
  width: 380px;
  max-width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  height: 100%;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  h2 {
    font-size: 1.2rem;
  }
`;

export const PokemonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bg};
  }
`;

export const MiniImg = styled.img<{ $type?: string }>`
  width: 50px;
  height: 50px;
  object-fit: contain;
  background: ${({ $type }) => `${TYPE_COLORS[$type || ''] || '#aaa'}15`};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 4px;
`;

export const PokemonInfo = styled.div`
  flex: 1;
  h4 {
    font-size: 0.9rem;
    text-transform: capitalize;
  }
`;

export const Types = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 2px;
`;

export const RemoveBtn = styled.button`
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 6px;
  border-radius: 50%;
  display: flex;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.bg};
  }
`;

export const Empty = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: 0.9rem;
`;

