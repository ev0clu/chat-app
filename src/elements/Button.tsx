import { ButtonProps } from '../types/functional-components-types';
import {
  StyledImg,
  StyledNormalButton,
  StyledIconMsgButton,
  StyledIconSidebarButton
} from '../styled-components/Button/ButtonStyles';

import gLogo from '../assets/google_logo.svg';

import {
  MdSend,
  MdLogout,
  MdDarkMode,
  MdOutlineDelete
} from 'react-icons/md';
import { BsEmojiSmileFill, BsSun, BsPlusLg } from 'react-icons/bs';

const Button = ({
  buttonType,
  icon,
  themeColor,
  text,
  handleClick
}: ButtonProps) => {
  const renderButton = () => {
    if (buttonType === 'icon') {
      if (icon === 'send') {
        return (
          <StyledIconMsgButton onClick={handleClick}>
            <MdSend />
          </StyledIconMsgButton>
        );
      } else if (icon === 'emoji') {
        return (
          <StyledIconMsgButton onClick={handleClick}>
            <BsEmojiSmileFill />
          </StyledIconMsgButton>
        );
      } else if (icon === 'log-out') {
        return (
          <StyledIconSidebarButton
            $themeColor={themeColor || '#78716c'}
            onClick={handleClick}
          >
            <MdLogout />
          </StyledIconSidebarButton>
        );
      } else if (icon === 'add') {
        return (
          <StyledIconSidebarButton
            $themeColor={themeColor || '#78716c'}
            onClick={handleClick}
          >
            <BsPlusLg />
          </StyledIconSidebarButton>
        );
      } else if (icon === 'dark') {
        return (
          <StyledIconSidebarButton
            $themeColor={themeColor || '#78716c'}
            onClick={handleClick}
          >
            <MdDarkMode />
          </StyledIconSidebarButton>
        );
      } else if (icon === 'light') {
        return (
          <StyledIconSidebarButton
            $themeColor={themeColor || '#78716c'}
            onClick={handleClick}
          >
            <BsSun />
          </StyledIconSidebarButton>
        );
      } else if (icon === 'delete') {
        return (
          <StyledIconSidebarButton
            $themeColor={themeColor || '#78716c'}
            onClick={handleClick}
          >
            <MdOutlineDelete />
          </StyledIconSidebarButton>
        );
      }
    } else if (buttonType === 'login') {
      return (
        <StyledNormalButton onClick={handleClick}>
          <StyledImg src={gLogo} alt="google-logo" />
          {text}
        </StyledNormalButton>
      );
    } else if (buttonType === 'new-chat') {
      return (
        <StyledNormalButton onClick={handleClick}>
          {text}
        </StyledNormalButton>
      );
    }
  };

  return <>{renderButton()}</>;
};

export default Button;
