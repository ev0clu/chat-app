import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeContext from '../helper/ThemeContext';

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

import Header from '../components/Chat/Header';
import Sidebar from '../components/Chat/Sidebar';
import MessageWrapper from '../components/Chat/MessageWrapper';
import InputWrapper from '../components/Chat/InputWrapper';

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
  chatId: string;
}

interface ChatsProps {
  chatId: string;
  chatName: string;
  uidA: string;
  uidB: string;
  timestamp: { seconds: number; nanoseconds: number };
  id: string;
}

const Chat = () => {
  const [theme, setTheme] = useState('light');
  const [selectedChat, setSelectedChat] = useState({
    chatId: 'W969QPv7gOtsBhvQZEyHK1woZ',
    chatName: 'Public Chat',
    uidA: '',
    uidB: '',
    timestamp: { seconds: 1684569600, nanoseconds: 31000000 }
  });
  const [chat, setChat] = useState<ChatsProps[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<
    MessagesProps[]
  >([]);
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const scroll = useRef(null);
  const location = useLocation();
  const { userId, userName } = location.state;

  useEffect(() => {
    restoreTheme();
  }, []);

  useEffect(() => {
    const filteredData: MessagesProps[] = messages.filter(
      (message) => message.chatId === selectedChat.chatId
    );
    setFilteredMessages(filteredData);
  }, [selectedChat, messages]);

  useEffect(() => {
    // Loads chat messages history and listens for upcoming ones.
    // Create the query to load the last 12 messages and listen for new ones.
    const recentChatsQuery = query(
      collection(getFirestore(), 'chats'),
      orderBy('timestamp', 'desc')
    );

    // Start listening to the query.
    const unsubscribeChats = onSnapshot(
      recentChatsQuery,
      (snapshot) => {
        const chats: ChatsProps[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as ChatsProps; // Assert the data type to MessageData
          chats.push({ ...data, id: doc.id });
        });
        setChat(chats);
      }
    );

    // Loads chat messages history and listens for upcoming ones.
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(
      collection(getFirestore(), 'messages'),
      orderBy('timestamp', 'desc'),
      limit(12)
    );

    // Start listening to the query.
    const unsubscribeMessages = onSnapshot(
      recentMessagesQuery,
      (snapshot) => {
        const messagesData: MessagesProps[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as MessagesProps; // Assert the data type to MessageData
          messagesData.push({ ...data, id: doc.id });
        });
        setMessages(messagesData);
      }
    );

    return () => {
      unsubscribeChats();
      unsubscribeMessages();
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

  const handleChatClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.dataset.name;
    const index = chat.findIndex((element) => element.chatId === id);
    setSelectedChat({
      chatId: chat[index].chatId,
      chatName: chat[index].chatName,
      uidA: chat[index].uidA,
      uidB: chat[index].uidB,
      timestamp: chat[index].timestamp
    });
  };

  return (
    <>
      {messages.length === 0 ? (
        <LoadingWrapper>
          <Dot $delay="0"></Dot>
          <Dot $delay="0.2s"></Dot>
          <Dot $delay="0.4s"></Dot>
        </LoadingWrapper>
      ) : (
        <ThemeContext.Provider value={theme}>
          <Wrapper $themeColor={theme}>
            <Sidebar
              userId={userId}
              handleThemeClick={handleThemeClick}
              handleChatClick={handleChatClick}
            />
            <Header selectedChat={selectedChat} messages={messages} />
            <MessageWrapper
              selectedChat={selectedChat}
              filteredMessages={filteredMessages}
              scroll={scroll}
              userId={userId}
            />
            <InputWrapper
              selectedChat={selectedChat}
              scroll={scroll}
              userId={userId}
              userName={userName}
            />
          </Wrapper>
        </ThemeContext.Provider>
      )}
    </>
  );
};

export default Chat;
