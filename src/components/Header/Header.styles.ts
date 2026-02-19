import styled from 'styled-components';
import { Container, Button } from '../../styles/shared';

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Logo = styled.h1`
  font-size: 1.4rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    gap: 6px;
  }
`;

export const PokeBallIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 24px;
    height: 24px;
  }
`;

export const LogoText = styled.span`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const LogoTextShort = styled.span`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: inline;
  }
`;

export const Actions = styled.div<{ $mobileOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ $mobileOpen }) => ($mobileOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.surface};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing.md};
    flex-direction: column;
    align-items: stretch;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};

    button {
      width: 100%;
      justify-content: center;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

export const HamburgerButton = styled(Button)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

export const Badge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: ${({ theme }) => theme.radii.full};
  margin-left: -2px;
`;

