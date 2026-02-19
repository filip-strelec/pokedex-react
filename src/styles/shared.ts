import styled, { css } from 'styled-components';
import { TYPE_COLORS } from '../constants';

export const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const Card = styled.div<{ $clickable?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  transition: transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px ${({ theme }) => theme.colors.shadowMd};
      }
    `}
`;

export const TypeBadge = styled.span<{ $type?: string }>`
  display: inline-block;
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #fff;
  background: ${({ $type }) => TYPE_COLORS[$type || ''] || '#999'};
`;

export const Button = styled.button<{ $variant?: string; $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${theme.colors.primary};
          color: #fff;
          &:hover { opacity: 0.9; }
        `;
      case 'secondary':
        return css`
          background: ${theme.colors.secondary};
          color: #fff;
          &:hover { opacity: 0.9; }
        `;
      case 'outline':
        return css`
          border: 1.5px solid ${theme.colors.border};
          color: ${theme.colors.text};
          &:hover {
            border-color: ${theme.colors.secondary};
            color: ${theme.colors.secondary};
          }
        `;
      default:
        return css`
          background: ${theme.colors.bg};
          color: ${theme.colors.text};
          &:hover { background: ${theme.colors.border}; }
        `;
    }
  }}

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.secondary};
      color: #fff;
      border-color: ${theme.colors.secondary};
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.875rem;
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Select = styled.select`
  padding: 10px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.875rem;
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;

