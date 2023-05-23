import {
  HeaderWrapper,
  StyledChatLogo,
  Title,
  Paragraph,
  ButtonWrapper
} from '../../styled-components/Chat/HeaderStyles';

import { HeaderProps } from '../../types/functional-components-types';

import { format } from 'date-fns';
import { useEffect, useState, useContext } from 'react';
import ThemeContext from '../../helper/ThemeContext';
import Button from '../../elements/Button';

const Header = ({
  selectedChat,
  filteredMessages,
  handleDeleteChatClick
}: HeaderProps) => {
  const theme = useContext(ThemeContext);
  const [time, setTime] = useState('');

  useEffect(() => {
    if (
      filteredMessages.length > 0 &&
      filteredMessages[0].timestamp !== null
    ) {
      console.log(filteredMessages);
      setTime(
        format(
          new Date(filteredMessages[0].timestamp.seconds * 1000),
          'dd/MM HH:mm'
        )
      );
    } else if (selectedChat.timestamp !== null) {
      setTime(
        format(
          new Date(selectedChat.timestamp.seconds * 1000),
          'dd/MM HH:mm'
        )
      );
    }
  }, [filteredMessages]);

  return (
    <HeaderWrapper>
      <StyledChatLogo>{selectedChat.chatName[0]}</StyledChatLogo>
      <Title>{selectedChat.chatName}</Title>
      <Paragraph>Last message at {time}</Paragraph>
      {selectedChat.chatId !==
        import.meta.env.VITE_PUBLIC_CHAT_VARIABLE && (
        <ButtonWrapper>
          <Button
            buttonType="icon"
            icon="delete"
            themeColor={theme === 'light' ? 'dark' : 'light'}
            handleClick={handleDeleteChatClick}
          />
        </ButtonWrapper>
      )}
    </HeaderWrapper>
  );
};

export default Header;
