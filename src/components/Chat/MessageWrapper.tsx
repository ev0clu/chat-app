import styled from 'styled-components';
import ThemeContext from '../../helper/ThemeContext';
import { useContext, RefObject } from 'react';

interface WrapperProps {
  $themeColor: string;
}

const Wrapper = styled.div<WrapperProps>`
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

interface MessageWrapperProps {
  $orientation: string;
}

const MessageWrapper = styled.div<MessageWrapperProps>`
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
`;

const StyledName = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const StyledText = styled.p`
  word-break: break-all;
`;

interface Props {
  selectedChat: {
    chatId: string;
    chatName: string;
    uidA: string;
    uidB: string;
  };
  filteredMessages: {
    id: string;
    name: string;
    text: string;
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
    uid: string;
    chatId: string;
  }[];
  scroll: RefObject<HTMLDivElement>;
  userId: string;
}

const Messages = ({
  selectedChat,
  filteredMessages,
  scroll,
  userId
}: Props) => {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper $themeColor={theme === 'light' ? 'dark' : 'light'}>
      <span ref={scroll}></span>
      {filteredMessages.map((message) =>
        message.chatId === selectedChat.chatId ? (
          <MessageWrapper
            key={message.id}
            $orientation={message.uid === userId ? 'right' : 'left'}
          >
            <StyledMessageBubble>
              <StyledName>{message.name}</StyledName>
              <StyledText>{message.text}</StyledText>
            </StyledMessageBubble>
          </MessageWrapper>
        ) : (
          ''
        )
      )}
    </Wrapper>
  );
};

export default Messages;
