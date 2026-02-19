import styled from 'styled-components';
import { Card } from '../../styles/shared';
import { TYPE_COLORS } from '../../constants';

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

export const ImageWrap = styled.div<{ $type?: string }>`
  position: relative;
  background: ${({ $type }) =>
    `linear-gradient(135deg, ${TYPE_COLORS[$type || ''] || '#a8a8a8'}22, ${TYPE_COLORS[$type || ''] || '#a8a8a8'}11)`};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 140px;
`;

export const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  transition: transform ${({ theme }) => theme.transitions.normal};
  image-rendering: -webkit-optimize-contrast;

  ${StyledCard}:hover & {
    transform: scale(1.08);
  }
`;

export const IdBadge = styled.span`
  position: absolute;
  top: 8px;
  left: 10px;
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ActionButtons = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  gap: 4px;
`;

export const IconBtn = styled.button<{ $active?: boolean; $hoverColor?: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  z-index: 99;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1px 4px ${({ theme }) => theme.colors.shadow};
  transition: all ${({ theme }) => theme.transitions.fast};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};

  &:hover {
    transform: scale(1.15);
    color: ${({ $hoverColor, theme }) => $hoverColor || theme.colors.primary};
  }
`;

export const Info = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.md}`};
`;

export const Name = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 6px;
  text-transform: capitalize;
`;

export const Types = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4px;
`;

export const StatItem = styled.div`
  text-align: center;
  font-size: 0.7rem;

  strong {
    display: block;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }
`;

export const Placeholder = styled.div`
  width: 120px;
  height: 120px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 50%;
`;

