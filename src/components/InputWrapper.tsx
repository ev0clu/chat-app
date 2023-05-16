import styled from 'styled-components';
import { useState } from 'react';

import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

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

const InputWrapper = () => {
  const [inputValue, setInputValue] = useState('');

  const getUserName = () => {
    return getAuth().currentUser?.displayName;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleSendButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e.currentTarget.value !== '') {
      saveMessage(inputValue);
    }
  };

  const handleInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && e.currentTarget.value !== '') {
      saveMessage(inputValue);
    }
  };

  const saveMessage = async (messageText: string) => {
    // Add a new message entry to the Firebase database.
    try {
      setInputValue('');
      await addDoc(collection(getFirestore(), 'messages'), {
        name: getUserName(),
        text: messageText,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error(
        'Error writing new message to Firebase Database',
        error
      );
    }
  };

  return (
    <Wrapper>
      <Button isIcon={true} icon="emoji" />
      <Input
        value={inputValue}
        handleChange={handleInputChange}
        handleKeyPress={handleInputKeyPress}
      />
      <Button
        isIcon={true}
        icon="send"
        handleClick={handleSendButton}
      />
    </Wrapper>
  );
};

export default InputWrapper;
