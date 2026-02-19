import styled from 'styled-components';
import { TYPE_COLORS } from '../../constants';

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
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-height: 95vh;
    border-radius: ${({ theme }) => `${theme.radii.lg} ${theme.radii.lg} 0 0`};
    margin-top: auto;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  transition: transform ${({ theme }) => theme.transitions.fast};
  &:hover { transform: scale(1.1); }
`;

export const ImageSection = styled.div<{ $type?: string }>`
  background: ${({ $type }) =>
    `linear-gradient(135deg, ${TYPE_COLORS[$type || ''] || '#aaa'}33, ${TYPE_COLORS[$type || ''] || '#aaa'}11)`};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: center;
  border-radius: ${({ theme }) => `${theme.radii.lg} ${theme.radii.lg} 0 0`};
`;

export const PokemonImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

export const Body = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const PokeName = styled.h2`
  font-size: 1.5rem;
  text-transform: capitalize;
`;

export const IdText = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
`;

export const Types = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`;

export const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const MetaItem = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  strong { color: ${({ theme }) => theme.colors.text}; margin-right: 4px; }
`;

export const SectionTitle = styled.h4`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: 6px;
  font-size: 0.85rem;
`;

export const StatLabel = styled.span`
  width: 65px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const StatValue = styled.span`
  width: 35px;
  font-weight: 700;
  text-align: right;
`;

export const StatBar = styled.div`
  flex: 1;
  height: 8px;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
`;

export const StatFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => Math.min($pct, 100)}%;
  background: ${({ $pct }) =>
    $pct > 75 ? '#38a169' : $pct > 50 ? '#ecc94b' : $pct > 25 ? '#ed8936' : '#e53e3e'};
  border-radius: ${({ theme }) => theme.radii.full};
  transition: width 0.5s ease;
`;

export const AbilityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const AbilityBadge = styled.span`
  padding: 4px 10px;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

