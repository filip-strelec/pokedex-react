import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateY(100px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const ToastWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  animation: ${slideIn} 0.3s ease;
`;

export const ToastBody = styled.div<{ $type?: string }>`
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: ${({ $type }) =>
    $type === 'warning' ? '#ed8936' :
    $type === 'error' ? '#e53e3e' :
    $type === 'success' ? '#38a169' : '#4a5568'};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
`;

