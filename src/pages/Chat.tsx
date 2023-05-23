import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeContext from '../helper/ThemeContext';

import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
  doc
} from 'firebase/firestore';

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
    chatId: import.meta.env.VITE_PUBLIC_CHAT_VARIABLE,
    chatName: 'Public Chat',
    uidA: '',
    uidB: '',
    timestamp: { seconds: 1684569600, nanoseconds: 31000000 }
  });
  const [prevSelectedChatDOM, setPrevSelectedChatDOM] =
    useState<HTMLElement>();
  const [currentSelectedChatDOM, setCurrentSelectedChatDOM] =
    useState<HTMLElement>();
  const [chats, setChats] = useState<ChatsProps[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<
    MessagesProps[]
  >([]);
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const scroll = useRef(null);
  const location = useLocation();
  const { userId, userName } = location.state;

  useEffect(() => {
    restoreTheme();
    saveUserId();
  }, []);

  useEffect(() => {
    if (
      prevSelectedChatDOM &&
      currentSelectedChatDOM &&
      prevSelectedChatDOM !== currentSelectedChatDOM
    ) {
      prevSelectedChatDOM.style.backgroundColor = '';
      currentSelectedChatDOM.style.backgroundColor =
        theme === 'light' ? '#d4d4d4' : '#78716c';
    } else if (currentSelectedChatDOM) {
      currentSelectedChatDOM.style.backgroundColor =
        theme === 'light' ? '#d4d4d4' : '#78716c';
    }
  }, [currentSelectedChatDOM, theme]);

  useEffect(() => {
    if (chats.length > 0) {
      setSelectedChat(chats[0]);
    }
  }, [chats]);

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
      orderBy('timestamp', 'asc')
    );

    // Start listening to the query.
    const unsubscribeChats = onSnapshot(
      recentChatsQuery,
      (snapshot) => {
        const chatData: ChatsProps[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as ChatsProps; // Assert the data type to MessageData
          chatData.push({ ...data, id: doc.id });
        });
        setChats(chatData);
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

  const saveUserId = async () => {
    // Add a new message entry to the Firebase database.
    try {
      await setDoc(doc(getFirestore(), 'users', userId), {
        id: userId,
        name: userName
      });
    } catch (error) {
      console.error(
        'Error writing new message to Firebase Database',
        error
      );
    }
  };

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
    e.preventDefault;
    const id = e.currentTarget.dataset.name;
    const index = chats.findIndex((element) => element.chatId === id);

    setPrevSelectedChatDOM(currentSelectedChatDOM);
    setCurrentSelectedChatDOM(e.currentTarget);

    setSelectedChat({
      chatId: chats[index].chatId,
      chatName: chats[index].chatName,
      uidA: chats[index].uidA,
      uidB: chats[index].uidB,
      timestamp: chats[index].timestamp
    });
  };

  const handleDeleteChatClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault;
    const q = query(
      collection(getFirestore(), 'messages'),
      where('chatId', '==', selectedChat.chatId)
    );
    const querySnapshot = await getDocs(q);

    await deleteDoc(
      doc(getFirestore(), 'chats', selectedChat.chatId)
    );

    setSelectedChat(chats[0]);

    querySnapshot.forEach(async (queryDocumentSnapshot) => {
      await deleteDoc(
        doc(getFirestore(), 'messages', queryDocumentSnapshot.id)
      );
    });
  };

  return (
    <>
      {/* {filteredMessages.length === 0 &&
      selectedChat.chatId ===
     import.meta.env.VITE_PUBLIC_CHAT_VARIABLE ? (*/}
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
            <Header
              selectedChat={selectedChat}
              filteredMessages={filteredMessages}
              handleDeleteChatClick={handleDeleteChatClick}
            />
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
