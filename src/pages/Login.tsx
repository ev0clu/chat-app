import {
  Main,
  LoginWrapper
} from '../styled-components/Login/LoginStyles';
import '../helper/firebase-config';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Login/Footer';
import Button from '../elements/Button';

const Login = () => {
  const navigate = useNavigate();

  // Firebase Auth.
  const signIn = async () => {
    // Add a new entry to the Firebase database.
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(getAuth(), provider);
      if (!user) return;
      navigate('/chat', {
        state: { userId: user.uid, userName: user.displayName }
      });
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
        <LoginWrapper>
          <h1>Welcome to the Chat App!</h1>
          <h2>Let's talk with your friends</h2>
          <Button
            buttonType="login"
            text="Sign in with Google"
            handleClick={handleLoginClick}
          />
        </LoginWrapper>
      </Main>
      <Footer />
    </>
  );
};

export default Login;
