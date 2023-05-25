import {
  SidebarProps,
  UsersProps
} from '../../types/functional-components-types';

import {
  SidebarWrapper,
  StyledLink,
  TopWrapper,
  BottomWrapper,
  StyledChatBox,
  StyledChatLogo,
  Title,
  UserListWrapper,
  StyledUserList,
  StyledUserPic,
  ButtonWrapper,
  AddChatWrapper,
  StyledAddChatTitle
} from '../../styled-components/Chat/SidebarStyles';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  query,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

import ThemeContext from '../../helper/ThemeContext';
import { useContext, useState, useEffect, useRef } from 'react';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import generateID from '../../helper/GenerateID';

const Sidebar = ({
  userId,
  chats,
  handleThemeClick,
  handleChatClick
}: SidebarProps) => {
  const theme = useContext(ThemeContext);
  const [userPic, setUserPic] = useState('');
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [missingChatInfo, setMissingChatInfo] = useState(false);
  const [missingUserInfo, setMissingUserInfo] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        // Clicked outside the popup, close it
        setAddModal(false);
        setSelectedUserId('');
        setInputValue('');
        setMissingChatInfo(false);
        setMissingUserInfo(false);
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
    const recentUsersQuery = query(
      collection(getFirestore(), 'users')
    );

    // Start listening to the query.
    const unsubscribeUsers = onSnapshot(
      recentUsersQuery,
      (snapshot) => {
        const usersData: UsersProps[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as UsersProps; // Assert the data type to MessageData
          usersData.push({ ...data, docId: doc.id });
        });

        const resetedUsersSelection = resetUsersSelection(usersData);
        setUsers(resetedUsersSelection);
      }
    );

    return () => {
      unsubscribeUsers();
    };
  }, []);

  const saveChatBox = async (name: string) => {
    let isChat = true;
    let id = '';
    while (isChat) {
      id = generateID(15);
      isChat = chats.some((chat) => chat.chatId === id);
    }

    // Add a new message entry to the Firebase database.
    try {
      await setDoc(doc(getFirestore(), 'chats', `${id}`), {
        chatId: id,
        chatName: name,
        uidA: `${userId}`,
        uidB: `${selectedUserId}`,
        timestamp: serverTimestamp(),
        isSelected: false
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
    setSelectedUserId('');
    setMissingChatInfo(false);
    setMissingUserInfo(false);
    const resetedUsersSelection = resetUsersSelection(users);
    setUsers(resetedUsersSelection);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
    setMissingChatInfo(false);
  };

  const handleCreateChatClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault;
    if (inputValue !== '' && selectedUserId !== '') {
      saveChatBox(inputValue);
      setAddModal(false);
      setInputValue('');
    }

    if (inputValue === '') {
      setMissingChatInfo(true);
    }
    if (selectedUserId === '') {
      setMissingUserInfo(true);
    }
  };

  const resetUsersSelection = (userArray: UsersProps[]) => {
    const resetedUsersStatus = userArray.map((user) => ({ ...user }));
    resetedUsersStatus.forEach((user) => {
      user.isSelected = false;
    });

    return resetedUsersStatus;
  };

  const setUserSelection = (
    initArray: UsersProps[],
    index: number
  ) => {
    initArray[index].isSelected = true;

    return initArray;
  };

  const handleUserSelectClick = (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault;
    const id = e.currentTarget.dataset.id;

    const index = users.findIndex((element) => element.id === id);

    const resetedUsersSelection = resetUsersSelection(users);
    const setUsersStatus = setUserSelection(
      resetedUsersSelection,
      index
    );
    setMissingUserInfo(false);
    setUsers(setUsersStatus);

    setSelectedUserId(setUsersStatus[index].id);
  };

  return (
    <SidebarWrapper
      $themeColor={theme === 'light' ? 'dark' : 'light'}
    >
      <TopWrapper $themeColor={theme === 'light' ? 'dark' : 'light'}>
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
        {chats.map((chatData) =>
          chatData.uidA === userId ||
          chatData.uidB === userId ||
          chatData.chatId ===
            import.meta.env.VITE_PUBLIC_CHAT_VARIABLE ? (
            <StyledChatBox
              data-name={chatData.chatId}
              $themeColor={theme === 'light' ? 'dark' : 'light'}
              $backgroundColor={chatData.isSelected}
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
            $boxShadow={missingChatInfo ? '#dc2626' : 'none'}
            handleChange={handleInputChange}
          />
          <UserListWrapper
            $themeColor={theme === 'light' ? 'dark' : 'light'}
            $boxShadow={missingUserInfo ? '#dc2626' : 'none'}
          >
            {users.map(
              (user) =>
                user.id !== userId && (
                  <StyledUserList
                    data-id={user.id}
                    $themeColor={theme === 'light' ? 'dark' : 'light'}
                    $backgroundColor={user.isSelected}
                    onClick={handleUserSelectClick}
                    key={user.id}
                  >
                    <Title>{user.name}</Title>
                  </StyledUserList>
                )
            )}
          </UserListWrapper>
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
    </SidebarWrapper>
  );
};

export default Sidebar;
