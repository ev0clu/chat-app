import {
  LoadingWrapper,
  StyledDot,
  ChatWrapper
} from '../styled-components/Chat/ChatStyles';

import {
  ChatsProps,
  MessagesProps
} from '../types/functional-components-types';

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
import MessageWrapper from '../components/Chat/MessagesWrapper';
import InputWrapper from '../components/Chat/InputWrapper';

const Chat = () => {
  const [theme, setTheme] = useState('light');
  const [selectedChat, setSelectedChat] = useState({
    chatId: import.meta.env.VITE_PUBLIC_CHAT_VARIABLE,
    chatName: 'Public Chat',
    uidA: '',
    uidB: '',
    timestamp: { seconds: 1684569600, nanoseconds: 31000000 },
    isSelected: true
  });
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
      limit(20)
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
        name: userName,
        isSelected: false
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

  const resetChatSelection = (chatArray: ChatsProps[]) => {
    const resetedChatsStatus = chatArray.map((chat) => ({ ...chat }));
    resetedChatsStatus.forEach((chat) => {
      chat.isSelected = false;
    });

    return resetedChatsStatus;
  };

  const setChatSelection = (
    initArray: ChatsProps[],
    index: number
  ) => {
    initArray[index].isSelected = true;

    return initArray;
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

    const resetedChatSelection = resetChatSelection(chats);
    const initChatStatus = setChatSelection(
      resetedChatSelection,
      index
    );

    setChats(initChatStatus);

    setSelectedChat({
      chatId: initChatStatus[index].chatId,
      chatName: initChatStatus[index].chatName,
      uidA: initChatStatus[index].uidA,
      uidB: initChatStatus[index].uidB,
      timestamp: initChatStatus[index].timestamp,
      isSelected: initChatStatus[index].isSelected
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
      {messages.length === 0 ? (
        <LoadingWrapper>
          <StyledDot $delay="0"></StyledDot>
          <StyledDot $delay="0.2s"></StyledDot>
          <StyledDot $delay="0.4s"></StyledDot>
        </LoadingWrapper>
      ) : (
        <ThemeContext.Provider value={theme}>
          <ChatWrapper $themeColor={theme}>
            <Sidebar
              userId={userId}
              chats={chats}
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
          </ChatWrapper>
        </ThemeContext.Provider>
      )}
    </>
  );
};

export default Chat;
