import styled from 'styled-components';
import type {
  ThemeProps,
  MessagesWrapperProps
} from '../../types/styled-components-types';

const Wrapper = styled.div<ThemeProps>`
  grid-column: 2/3;
  grid-row: 2/3;
  display: flex;
  flex-direction: column-reverse;
  border-top: 1px solid
    ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  border-bottom: 1px solid
    ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  padding: 1rem;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const MessagesWrapper = styled.div<MessagesWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
  align-items: ${(props) =>
    props.$orientation === 'left' ? 'flex-start' : 'flex-end'};
`;

const StyledMessageBubble = styled.div`
  background: linear-gradient(-13deg, #106cce 49%, #2a4ab5 100%);
  color: #ffffff;
  border-radius: 1.3rem;
  max-width: 20rem;
  padding: 0.5rem 1.5rem;
  font-size: 1.1rem;

  @media (max-width: 450px) {
    max-width: 10rem;
  }
`;

const StyledName = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const StyledText = styled.p`
  word-break: break-all;
`;

export {
  Wrapper,
  MessagesWrapper,
  StyledMessageBubble,
  StyledName,
  StyledText
};
