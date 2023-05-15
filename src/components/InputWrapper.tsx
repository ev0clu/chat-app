import styled from 'styled-components';
import { useState } from 'react';
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

interface Props {
  inputValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InputWrapper = ({
  inputValue,
  handleChange,
  handleSend
}: Props) => {
  return (
    <Wrapper>
      <Button isIcon={true} icon="emoji" />
      <Input value={inputValue} handleChange={handleChange} />
      <Button isIcon={true} icon="send" handleClick={handleSend} />
    </Wrapper>
  );
};

export default InputWrapper;
