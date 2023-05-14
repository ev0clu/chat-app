import styled from 'styled-components';

import EmojiPicker from 'emoji-picker-react';
import Input from '../elements/Input';
import Button from '../elements/Button';

const Wrapper = styled.div`
  grid-column: 2/3;
  grid-row: 3/4;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-column-gap: 1rem;
  padding: 1rem;
`;

const Messages = () => {
  return (
    <Wrapper>
      <Button isIcon={true} icon="emoji" />
      <Input />
      <Button isIcon={true} icon="send" />
    </Wrapper>
  );
};

export default Messages;
