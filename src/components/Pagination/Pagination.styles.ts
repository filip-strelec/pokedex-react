import styled from 'styled-components';
import { Button } from '../../styles/shared';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 4px;
    padding: ${({ theme }) => `${theme.spacing.md} 0`};
  }
`;

export const PageNum = styled(Button)`
  min-width: 36px;
  justify-content: center;
  padding: 6px 10px;
  font-size: 0.85rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 32px;
    padding: 4px 8px;
    font-size: 0.75rem;
  }
`;

export const Info = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.75rem;
    margin: 0 4px;
  }
`;

