import styled from 'styled-components';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import ThemeContext from '../../helper/ThemeContext';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../elements/Button';

interface WrapperProps {
  $themeColor: string;
}

const Wrapper = styled.div<WrapperProps>`
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

const StyledSectionTop = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
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

interface Props {
  handleThemeClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Sidebar = ({ handleThemeClick }: Props) => {
  const theme = useContext(ThemeContext);
  const [userPic, setUserPic] = useState('');

  useEffect(() => {
    initFirebaseAuth();
  }, []);

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

  return (
    <Wrapper $themeColor={theme === 'light' ? 'dark' : 'light'}>
      <StyledSectionTop>
        <StyledUserPic $backgroundImage={userPic}></StyledUserPic>
        <ButtonWrapper>
          <Button
            isIcon={true}
            icon="add"
            themeColor={theme === 'light' ? 'dark' : 'light'}
          />
          <StyledLink to="/">
            <Button
              isIcon={true}
              icon="log-out"
              themeColor={theme === 'light' ? 'dark' : 'light'}
              handleClick={signOutUser}
            />
          </StyledLink>
          <Button
            isIcon={true}
            icon={theme === 'light' ? 'dark' : 'light'}
            themeColor={theme === 'light' ? 'dark' : 'light'}
            handleClick={handleThemeClick}
          />
        </ButtonWrapper>
      </StyledSectionTop>
    </Wrapper>
  );
};

export default Sidebar;
