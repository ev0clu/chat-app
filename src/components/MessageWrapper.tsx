import styled from 'styled-components';
import ThemeContext from './ThemeContext';
import { useContext } from 'react';

interface WrapperProps {
  $themeColor: string;
}

const Wrapper = styled.div<WrapperProps>`
  grid-column: 2/3;
  grid-row: 2/3;
  border-top: 1px solid
    ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  border-bottom: 1px solid
    ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  padding: 1rem;
`;

interface Props {
  message: {
    id: string;
    timestamp: string;
    name: string;
    text: string;
  };
}

const Messages = ({ message }: Props) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <Wrapper $themeColor={theme === 'light' ? 'dark' : 'light'}>
        <div>{message.id}</div>
      </Wrapper>
    </>
  );
};

export default Messages;
