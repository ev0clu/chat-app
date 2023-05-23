import {
  Wrapper,
  MessagesWrapper,
  StyledMessageBubble,
  StyledName,
  StyledText
} from '../../styled-components/Chat/MessagesWrapperStyles';
import { MessagesWrapperComponentProps } from '../../types/functional-components-types';
import ThemeContext from '../../helper/ThemeContext';
import { useContext } from 'react';

const Messages = ({
  selectedChat,
  filteredMessages,
  scroll,
  userId
}: MessagesWrapperComponentProps) => {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper $themeColor={theme === 'light' ? 'dark' : 'light'}>
      <span ref={scroll}></span>
      {filteredMessages.map((message) =>
        message.chatId === selectedChat.chatId ? (
          <MessagesWrapper
            key={message.id}
            $orientation={message.uid === userId ? 'right' : 'left'}
          >
            <StyledMessageBubble>
              <StyledName>{message.name}</StyledName>
              <StyledText>{message.text}</StyledText>
            </StyledMessageBubble>
          </MessagesWrapper>
        ) : (
          ''
        )
      )}
    </Wrapper>
  );
};

export default Messages;
