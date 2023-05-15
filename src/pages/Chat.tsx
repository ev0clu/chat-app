import styled from 'styled-components';

import { useEffect, useState } from 'react';
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
import { getPerformance } from 'firebase/performance';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MessageWrapper from '../components/MessageWrapper';
import InputWrapper from '../components/InputWrapper';

interface WrapperProps {
  $themeColor: string;
}

const Wrapper = styled.div<WrapperProps>`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr auto;
  color: ${(props) =>
    props.$themeColor === 'light'
      ? lightTheme.color
      : darkTheme.color};
  background-color: ${(props) =>
    props.$themeColor === 'light'
      ? lightTheme.background
      : darkTheme.background};
`;

const lightTheme = {
  background: '#fff',
  color: '#222'
};
const darkTheme = {
  background: '#27272a',
  color: '#fff'
};

const Chat = () => {
  const [userPic, setUserPic] = useState('');
  const [userName, setUserName] = useState('');
  const [theme, setTheme] = useState('light');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState({
    id: '',
    timestamp: '',
    name: '',
    text: ''
  });

  useEffect(() => {
    initFirebaseAuth();
    restoreTheme();
  }, []);

  useEffect(() => {
    loadMessages();
  }, [message]);

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

  const signOutUser = () => {
    signOut(getAuth());
  };

  const isUserSignedIn = () => {
    return !!getAuth().currentUser;
  };

  const getUserId = () => {
    return getAuth().currentUser?.uid;
  };

  const getProfilePicUrl = () => {
    return (
      getAuth().currentUser?.photoURL || 'profile_placeholder.png'
    );
  };

  const getUserName = () => {
    return getAuth().currentUser?.displayName;
  };

  const addSizeToGoogleProfilePic = (url: string) => {
    if (
      url.indexOf('googleusercontent.com') !== -1 &&
      url.indexOf('?') === -1
    ) {
      return url + '?sz=150';
    }
    return url;
  };

  // Triggers when the auth state change for instance when the user signs-in or signs-out.
  const authStateObserver = () => {
    //restoreFirebase();
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName() || '';

    // Set the user's profile pic and name.
    setUserPic(
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')'
    );
    setUserName(userName);
  };

  const initFirebaseAuth = () => {
    onAuthStateChanged(getAuth(), authStateObserver);
  };

  const handleThemeClick = () => {
    const data: string = theme === 'light' ? 'dark' : 'light';
    setTheme(data);
    saveTheme(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    saveMessage(inputValue);
  };

  const saveMessage = async (messageText: string) => {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), 'messages'), {
        name: getUserName(),
        text: messageText,
        timestamp: serverTimestamp()
      });
      setInputValue('');
    } catch (error) {
      console.error(
        'Error writing new message to Firebase Database',
        error
      );
    }
  };

  // Loads chat messages history and listens for upcoming ones.
  const loadMessages = () => {
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(
      collection(getFirestore(), 'messages'),
      orderBy('timestamp', 'desc'),
      limit(12)
    );

    // Start listening to the query.
    onSnapshot(recentMessagesQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const messageData = change.doc.data();
        setMessage({
          id: change.doc.id,
          timestamp: messageData.timestamp,
          name: messageData.name,
          text: messageData.text
        });
      });
    });
  };

  return (
    <ThemeContext.Provider value={theme}>
      <Wrapper $themeColor={theme}>
        <Sidebar
          userPic={userPic}
          handleThemeClick={handleThemeClick}
          signOutUser={signOutUser}
        />
        <Header />
        <MessageWrapper message={message} />
        <InputWrapper
          inputValue={inputValue}
          handleChange={handleChange}
          handleSend={handleSend}
        />
      </Wrapper>
    </ThemeContext.Provider>
  );
};

export default Chat;
