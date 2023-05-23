import styled from 'styled-components';
import type {
  ThemeProps,
  DotProps
} from '../../types/styled-components-types';

const LoadingWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDot = styled.div<DotProps>`
  width: 16px;
  height: 16px;
  margin: 3px 6px;
  border-radius: 50%;
  background-color: #2f80ed;
  opacity: 1;
  animation: bouncing-loader 0.6s infinite alternate;
  animation-delay: ${(props) => props.$delay};

  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translateY(-16px);
    }
  }
`;

const ChatWrapper = styled.div<ThemeProps>`
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  color: ${(props) =>
    props.$themeColor === 'light'
      ? lightTheme.color
      : darkTheme.color};
  background-color: ${(props) =>
    props.$themeColor === 'light'
      ? lightTheme.background
      : darkTheme.background};
  max-height: 100vh;
`;

const lightTheme = {
  background: '#fff',
  color: '#222'
};

const darkTheme = {
  background: '#27272a',
  color: '#fff'
};

export { LoadingWrapper, StyledDot, ChatWrapper };
