import {
  Wrapper,
  EmojiWrapper
} from '../../styled-components/Chat/InputWrapperStyles';
import { InputWrapperComponentProps } from '../../types/functional-components-types';
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle
} from 'emoji-picker-react';
import { useState, useEffect, useRef } from 'react';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import Input from '../../elements/Input';
import Button from '../../elements/Button';

const InputWrapper = ({
  selectedChat,
  scroll,
  userId,
  userName
}: InputWrapperComponentProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isEmoji, setIsEmoji] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        // Clicked outside the popup, close it
        setIsEmoji(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault;
    if (inputValue !== '') {
      saveMessage(inputValue);
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && inputValue !== '') {
      saveMessage(inputValue);
    }
  };

  const handleEmojiButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault;
    setIsEmoji(true);
  };

  const handleEmojiClick = (
    emojiData: EmojiClickData,
    event: MouseEvent
  ) => {
    event.preventDefault;
    setIsEmoji(false);
    setInputValue((prevInput) => prevInput + emojiData.emoji);
  };

  const saveMessage = async (messageText: string) => {
    // Add a new message entry to the Firebase database.
    try {
      setInputValue('');
      await addDoc(collection(getFirestore(), 'messages'), {
        name: userName,
        text: messageText,
        timestamp: serverTimestamp(),
        uid: userId,
        chatId: `${selectedChat.chatId}`
      });
      scroll.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error(
        'Error writing new message to Firebase Database',
        error
      );
    }
  };

  return (
    <Wrapper>
      {isEmoji ? (
        <EmojiWrapper ref={popupRef}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            emojiStyle={EmojiStyle.NATIVE}
          />
        </EmojiWrapper>
      ) : (
        ''
      )}
      <Button
        buttonType="icon"
        icon="emoji"
        handleClick={handleEmojiButton}
      />
      <Input
        value={inputValue}
        placeholder="Aa"
        handleChange={handleInputChange}
        handleInputKeyDown={handleInputKeyDown}
      />
      <Button
        buttonType="icon"
        icon="send"
        handleClick={handleSendClick}
      />
    </Wrapper>
  );
};

export default InputWrapper;
