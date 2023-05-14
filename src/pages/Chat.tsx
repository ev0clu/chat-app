import styled from 'styled-components';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MessageWrapper from '../components/MessageWrapper';
import InputWrapper from '../components/InputWrapper';

const Wrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto 1fr auto;
`;

const Chat = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Header />
      <MessageWrapper />
      <InputWrapper />
    </Wrapper>
  );
};

export default Chat;
