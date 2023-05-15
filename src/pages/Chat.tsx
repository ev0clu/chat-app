import styled, { ThemeProvider } from 'styled-components';

import { useEffect, useState } from 'react';

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
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

const Wrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr auto;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.background};
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
  const [themeIcon, setThemeIcon] = useState('dark');
  const [themeColor, setThemeColor] = useState(lightTheme);

  useEffect(() => {
    initFirebaseAuth();
  }, []);

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
    setThemeColor((currentThemeColor) =>
      currentThemeColor === lightTheme ? darkTheme : lightTheme
    );
    setThemeIcon((currentThemeIcon) =>
      currentThemeIcon === 'dark' ? 'light' : 'dark'
    );
  };

  return (
    <ThemeProvider theme={themeColor}>
      <Wrapper>
        <Sidebar
          userPic={userPic}
          themeIcon={themeIcon}
          handleThemeClick={handleThemeClick}
        />
        <Header />
        <MessageWrapper themeIcon={themeIcon} />
        <InputWrapper />
      </Wrapper>
    </ThemeProvider>
  );
};

export default Chat;
