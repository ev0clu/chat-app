import styled from 'styled-components';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

import ThemeContext from '../../helper/ThemeContext';
import { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import generateID from '../../helper/GenerateID';

interface ThemeProps {
  $themeColor: string;
}

const Wrapper = styled.div<ThemeProps>`
  grid-column: 1/2;
  grid-row: 1/4;
  // eslint-disable-next-line react/prop-types
  border-right: 1px solid
    ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;

const BottomWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 3rem;
`;

const StyledChatBox = styled.li<ThemeProps>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  }
`;

const StyledChatLogo = styled.div`
  grid-row: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
  height: 4rem;
  width: 4rem;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: #059669;
  color: #fff;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
`;

interface StyledUserPicProps {
  $backgroundImage: string;
}

const StyledUserPic = styled.div<StyledUserPicProps>`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  background-image: ${(props) => props.$backgroundImage};
  background-repeat: no-repeat;
  background-size: 4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

interface AddChatWrapperProps {
  $themeColor: string;
}

const AddChatWrapper = styled.div<AddChatWrapperProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: ${(props) =>
    props.$themeColor === 'light' ? '#222' : '#fff'};
  border: 1px solid
    ${(props) =>
      props.$themeColor === 'dark' ? '#a8a29e' : '#e7e5e4'};
`;

const StyledAddChatTitle = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

interface Props {
  userId: string;
  handleThemeClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChatClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

interface ChatProps {
  chatId: string;
  chatName: string;
  uidA: string;
  uidB: string;
  timestamp: string;
  id: string;
}

const Sidebar = ({
  userId,
  handleThemeClick,
  handleChatClick
}: Props) => {
  const theme = useContext(ThemeContext);
  const [userPic, setUserPic] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chat, setChat] = useState<ChatProps[]>([]);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        // Clicked outside the popup, close it
        setAddModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    initFirebaseAuth();
  }, []);

  useEffect(() => {
    // Loads chat messages history and listens for upcoming ones.
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(
      collection(getFirestore(), 'chats')
    );

    // Start listening to the query.
    const unsubscribe = onSnapshot(
      recentMessagesQuery,
      (snapshot) => {
        const chats: ChatProps[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as ChatProps; // Assert the data type to MessageData
          chats.push({ ...data, id: doc.id });
        });
        setChat(chats);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const saveChatBox = async (name: string) => {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), 'chats'), {
        chatId: generateID(15),
        chatName: name,
        uidA: `${userId}`,
        uidB: ``,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error(
        'Error writing new message to Firebase Database',
        error
      );
    }
  };

  const signOutUser = () => {
    signOut(getAuth());
  };

  const getProfilePicUrl = () => {
    return (
      getAuth().currentUser?.photoURL || 'profile_placeholder.png'
    );
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
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const profilePicUrl = getProfilePicUrl();

    // Set the user's profile pic and name.
    setUserPic(
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')'
    );
  };

  const initFirebaseAuth = () => {
    onAuthStateChanged(getAuth(), authStateObserver);
  };

  const handleAddModalClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault;
    setAddModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleCreateChatClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault;
    if (inputValue !== '') {
      saveChatBox(inputValue);
      setAddModal(false);
    }
  };

  return (
    <Wrapper $themeColor={theme === 'light' ? 'dark' : 'light'}>
      <TopWrapper>
        <StyledUserPic $backgroundImage={userPic}></StyledUserPic>
        <ButtonWrapper>
          <Button
            buttonType="icon"
            icon="add"
            themeColor={theme === 'light' ? 'dark' : 'light'}
            handleClick={handleAddModalClick}
          />
          <StyledLink to="/">
            <Button
              buttonType="icon"
              icon="log-out"
              themeColor={theme === 'light' ? 'dark' : 'light'}
              handleClick={signOutUser}
            />
          </StyledLink>
          <Button
            buttonType="icon"
            icon={theme === 'light' ? 'dark' : 'light'}
            themeColor={theme === 'light' ? 'dark' : 'light'}
            handleClick={handleThemeClick}
          />
        </ButtonWrapper>
      </TopWrapper>
      <BottomWrapper>
        {chat.map((chatData) =>
          chatData.uidA === userId ||
          chatData.uidB === userId ||
          chatData.chatId === 'W969QPv7gOtsBhvQZEyHK1woZ' ? (
            <StyledChatBox
              data-name={chatData.chatId}
              $themeColor={theme === 'light' ? 'dark' : 'light'}
              onClick={handleChatClick}
              key={chatData.chatId}
            >
              <StyledChatLogo>{chatData.chatName[0]}</StyledChatLogo>
              <Title>{chatData.chatName}</Title>
            </StyledChatBox>
          ) : (
            ''
          )
        )}
      </BottomWrapper>
      {addModal ? (
        <AddChatWrapper
          $themeColor={theme === 'light' ? 'dark' : 'light'}
          ref={popupRef}
        >
          <StyledAddChatTitle>Private chat</StyledAddChatTitle>
          <Input
            value={inputValue}
            placeholder="Chat name"
            handleChange={handleInputChange}
          />
          <Button
            buttonType="new-chat"
            icon={theme === 'light' ? 'dark' : 'light'}
            themeColor={theme === 'light' ? 'dark' : 'light'}
            text="Create"
            handleClick={handleCreateChatClick}
          />
        </AddChatWrapper>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default Sidebar;
