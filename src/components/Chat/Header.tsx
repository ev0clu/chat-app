import styled from 'styled-components';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const Wrapper = styled.header`
  grid-column: 2/3;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: auto 1fr;
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
  display: flex;
  align-items: center;
`;

const Paragraph = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #a3a3a3;
`;

interface Props {
  selectedChat: string;
  message: {
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
}

const Header = ({ selectedChat, message }: Props) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (message[0].timestamp !== null) {
      setTime(
        format(
          new Date(message[0].timestamp.seconds * 1000),
          'dd/MM HH:mm'
        )
      );
    }
  }, [message]);

  return (
    <Wrapper>
      <StyledChatLogo>{selectedChat[0]}</StyledChatLogo>
      <Title>{selectedChat}</Title>
      <Paragraph>Last message at {time}</Paragraph>
    </Wrapper>
  );
};

export default Header;