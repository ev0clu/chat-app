import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';
import ThemeContext from '../components/ThemeContext';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import {
  getMessaging,
  getToken,
  onMessage
} from 'firebase/messaging';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MessageWrapper from '../components/MessageWrapper';
import InputWrapper from '../components/InputWrapper';

const LoadingWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface DotProps {
  $delay: string;
}

const Dot = styled.div<DotProps>`
  width: 16px;
  height: 16px;
  margin: 3px 6px;
  border-radius: 50%;
  background-color: #2f80ed;
  opacity: 1;
  animation: bouncing-loader 0.6s infinite alternate;
  animation-delay: ${(props) => props.$delay};

  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translateY(-16px);
    }
  }
`;

interface WrapperProps {
  $themeColor: string;
}

const Wrapper = styled.div<WrapperProps>`
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  color: ${(props) =>
    props.$themeColor === 'light'
      ? lightTheme.color
      : darkTheme.color};
  background-color: ${(props) =>
    props.$themeColor === 'light'
      ? lightTheme.background
      : darkTheme.background};
  max-height: 100vh;
`;

const lightTheme = {
  background: '#fff',
  color: '#222'
};

const darkTheme = {
  background: '#27272a',
  color: '#fff'
};

interface MessagesProps {
  id: string;
  name: string;
  text: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  uid: string;
}

const Chat = () => {
  const [userName, setUserName] = useState('');
  const [theme, setTheme] = useState('light');
  const [message, setMessage] = useState<MessagesProps[]>([]);
  const scroll = useRef(null);

  useEffect(() => {
    restoreTheme();
  }, []);

  useEffect(() => {
    // Loads chat messages history and listens for upcoming ones.
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(
      collection(getFirestore(), 'messages'),
      orderBy('timestamp', 'desc'),
      limit(12)
    );

    // Start listening to the query.
    const unsubscribe = onSnapshot(
      recentMessagesQuery,
      (snapshot) => {
        const messages: MessagesProps[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as MessagesProps; // Assert the data type to MessageData
          messages.push({ ...data, id: doc.id });
        });
        setMessage(messages);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const saveTheme = (data: string) => {
    localStorage.setItem('data-theme', JSON.stringify(data));
  };

  const restoreTheme = () => {
    const themeData = localStorage.getItem('data-theme');
    let data: string = '';

    if (themeData === null) {
      data = 'light';
    } else {
      data = JSON.parse(themeData);
    }
    setTheme(data);
    saveTheme(data);
  };

  const handleThemeClick = () => {
    const data: string = theme === 'light' ? 'dark' : 'light';
    setTheme(data);
    saveTheme(data);
  };

  return (
    <>
      {message.length === 0 ? (
        <LoadingWrapper>
          <Dot $delay="0"></Dot>
          <Dot $delay="0.2s"></Dot>
          <Dot $delay="0.4s"></Dot>
        </LoadingWrapper>
      ) : (
        <ThemeContext.Provider value={theme}>
          <Wrapper $themeColor={theme}>
            <Sidebar handleThemeClick={handleThemeClick} />
            <Header message={message} />
            <MessageWrapper message={message} scroll={scroll} />
            <InputWrapper scroll={scroll} />
          </Wrapper>
        </ThemeContext.Provider>
      )}
    </>
  );
};

export default Chat;
