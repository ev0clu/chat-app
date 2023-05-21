import styled from 'styled-components';
import { format } from 'date-fns';
import { useEffect, useState, useContext } from 'react';
import ThemeContext from '../../helper/ThemeContext';
import Button from '../../elements/Button';

const Wrapper = styled.header`
  grid-column: 2/3;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 1rem;
  padding: 1rem;
`;

const StyledChatLogo = styled.div`
  grid-row: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
  height: 4rem;
  width: 4rem;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: #059669;
  color: #fff;
`;

const Title = styled.h2`
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  align-items: center;
`;

const Paragraph = styled.p`
  grid-column: 2/3;
  grid-row: 2/3;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #a3a3a3;
`;

interface Props {
  selectedChat: {
    chatId: string;
    chatName: string;
    uidA: string;
    uidB: string;
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
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
  handleDeleteChatClick: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const Header = ({
  selectedChat,
  filteredMessages,
  handleDeleteChatClick
}: Props) => {
  const theme = useContext(ThemeContext);
  const [time, setTime] = useState('');

  useEffect(() => {
    if (filteredMessages[0].timestamp !== null) {
      setTime(
        format(
          new Date(filteredMessages[0].timestamp.seconds * 1000),
          'dd/MM HH:mm'
        )
      );
    }
  }, [filteredMessages]);

  return (
    <Wrapper>
      <StyledChatLogo>{selectedChat.chatName[0]}</StyledChatLogo>
      <Title>{selectedChat.chatName}</Title>
      <Paragraph>Last message at {time}</Paragraph>
      {selectedChat.chatId !== 'W969QPv7gOtsBhvQZEyHK1woZ' && (
        <Button
          buttonType="icon"
          icon="delete"
          themeColor={theme === 'light' ? 'dark' : 'light'}
          handleClick={handleDeleteChatClick}
        />
      )}
    </Wrapper>
  );
};

export default Header;
