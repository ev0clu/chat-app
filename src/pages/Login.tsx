import styled from 'styled-components';
import '../firebase-config';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';
import Button from '../elements/Button';

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f4;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 4rem 5rem 4rem 5rem;
  border-radius: 0.5rem;
`;

const Login = () => {
  const navigate = useNavigate();

  // Firebase Auth.
  const signIn = async () => {
    // Add a new entry to the Firebase database.
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), provider);
      navigate('/chat');
    } catch (error) {
      console.error(
        'Error log in with Google Authentication. Please check you entered the correct email address and password.',
        error
      );
    }
  };

  const handleLoginClick = () => {
    signIn();
  };

  return (
    <>
      <Main>
        <Wrapper>
          <h1>Welcome to the Chat App!</h1>
          <h2>Let's talk with your friends</h2>
          <Button
            isIcon={false}
            text="Sign in with Google"
            handleClick={handleLoginClick}
          />
        </Wrapper>
      </Main>
      <Footer />
    </>
  );
};

export default Login;
