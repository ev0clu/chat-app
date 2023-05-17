import styled from 'styled-components';
import ThemeContext from './ThemeContext';
import { useContext } from 'react';

interface WrapperProps {
  $themeColor: string;
}

const Wrapper = styled.div<WrapperProps>`
  grid-column: 2/3;
  grid-row: 2/3;
  display: flex;
  flex-direction: row;
  border-top: 1px solid
    ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  border-bottom: 1px solid
    ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  padding: 1rem;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
`;

const StyledMessageBubble = styled.div`
  background: linear-gradient(-13deg, #106cce 49%, #2a4ab5 100%);
  color: #ffffff;
  border-radius: 8px;
  width: max-content;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
`;

const StyledName = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
`;

interface Props {
  message: {
    id: string;
    name: string;
    text: string;
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
    uid: string;
  }[];
}

const Messages = ({ message }: Props) => {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper $themeColor={theme === 'light' ? 'dark' : 'light'}>
      <MessageWrapper>
        {message.map((messageData) => (
          <StyledMessageBubble key={messageData.id}>
            <StyledName>{messageData.name}</StyledName>
            <p>{messageData.text}</p>
          </StyledMessageBubble>
        ))}
      </MessageWrapper>
    </Wrapper>
  );
};

export default Messages;
