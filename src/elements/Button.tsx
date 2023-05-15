import React from 'react';

import styled from 'styled-components';
import { MdSend, MdLogout, MdDarkMode } from 'react-icons/md';
import { BsEmojiSmileFill, BsSun, BsPlusLg } from 'react-icons/bs';

const StyledNormalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f80ed;
  border-radius: 5px;
  border-style: none;
  color: #fff;
  cursor: pointer;
  font-size: 26px;
  font-weight: 700;
  height: 50px;
  outline: none;
  overflow: hidden;
  padding: 30px 50px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: #1366d6;
    box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px,
      rgba(0, 0, 0, 0.05) 0 1px 4px;
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.35s;
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.1) 0 3px 6px 0,
      rgba(0, 0, 0, 0.1) 0 0 10px 0, rgba(0, 0, 0, 0.1) 0 1px 4px -1px;
    transform: translateY(4px);
    transition-duration: 0.35s;
  }
`;

const StyledIconMsgButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 50%;
  border-style: none;
  color: #0ea5e9;
  cursor: pointer;
  font-size: 2.2rem;
  font-weight: 700;
  height: 2.2rem;
  width: 2.2rem;
  outline: none;
  text-decoration: none;

  &:hover {
    color: #0284c7;
  }

  &:active {
    opacity: 0.7;
  }
`;

interface StyledIconSidebarButton {
  themeColor: string;
}

const StyledIconSidebarButton = styled.button<StyledIconSidebarButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 50%;
  border-style: none;
  color: ${(props) =>
    props.themeColor === 'dark' ? '#78716c' : '#fff'};
  cursor: pointer;
  font-size: 2.2rem;
  font-weight: 700;
  height: 4rem;
  width: 4rem;
  outline: none;
  text-decoration: none;

  &:hover {
    background-color: ${(props) =>
      props.themeColor === 'dark' ? '#e7e5e4' : '#a8a29e'};
    cursor: pointer;
  }

  &:active {
    opacity: 0.7;
  }
`;

interface Props {
  isIcon: boolean;
  icon?: string;
  themeColor?: string;
  text?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  isIcon,
  icon,
  themeColor,
  text,
  handleClick
}: Props) => {
  const renderButton = () => {
    if (isIcon) {
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
            themeColor={themeColor || '#78716c'}
            onClick={handleClick}
          >
            <MdLogout />
          </StyledIconSidebarButton>
        );
      } else if (icon === 'add') {
        return (
          <StyledIconSidebarButton
            themeColor={themeColor || '#78716c'}
            onClick={handleClick}
          >
            <BsPlusLg />
          </StyledIconSidebarButton>
        );
      } else if (icon === 'dark') {
        return (
          <StyledIconSidebarButton
            themeColor={themeColor || '#78716c'}
            onClick={handleClick}
          >
            <MdDarkMode />
          </StyledIconSidebarButton>
        );
      } else if (icon === 'light') {
        return (
          <StyledIconSidebarButton
            themeColor={themeColor || '#78716c'}
            onClick={handleClick}
          >
            <BsSun />
          </StyledIconSidebarButton>
        );
      }
    } else {
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
