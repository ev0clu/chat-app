import styled from 'styled-components';

import { useEffect, useState } from 'react';
import ThemeContext from '../components/ThemeContext';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  onSnapshot,
  setDoc,
  updateDoc,
  doc
} from 'firebase/firestore';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MessageWrapper from '../components/MessageWrapper';
import InputWrapper from '../components/InputWrapper';

interface WrapperProps {
  color: string;
}

const Wrapper = styled.div<WrapperProps>`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr auto;
  color: ${(props) =>
    props.color === 'light' ? lightTheme.color : darkTheme.color};
  background-color: ${(props) =>
    props.color === 'light'
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

  useEffect(() => {
    initFirebaseAuth();
    restoreTheme();
  }, []);

  const saveTheme = (data: string) => {
    localStorage.setItem('data-theme', JSON.stringify(data));
  };

  const restoreTheme = () => {
    const themeData = localStorage.getItem('data-theme');
    console.log(themeData);
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

  return (
    <ThemeContext.Provider value={theme}>
      <Wrapper color={theme}>
        <Sidebar
          userPic={userPic}
          handleThemeClick={handleThemeClick}
          signOutUser={signOutUser}
        />
        <Header />
        <MessageWrapper />
        <InputWrapper />
      </Wrapper>
    </ThemeContext.Provider>
  );
};

export default Chat;
