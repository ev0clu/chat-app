import styled from 'styled-components';
import { ThemeProps } from '../../types/styled-components-types';

const StyledImg = styled.img`
  height: 50px;
  width: 50px;
  background-color: #fff;
  border: 1px solid #2f80ed;
`;

const StyledNormalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #2f80ed;
  border-style: none;
  color: #fff;
  cursor: pointer;
  font-size: 26px;
  font-weight: 700;
  height: 50px;
  outline: none;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s;
  padding-right: 20px;

  &:hover {
    background-color: #1366d6;
    box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px,
      rgba(0, 0, 0, 0.05) 0 1px 4px;
    transform: translateY(0);
    opacity: 0.95;
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

const StyledIconSidebarButton = styled.button<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 50%;
  border-style: none;
  color: ${(props) =>
    props.$themeColor === 'dark' ? '#78716c' : '#fff'};
  cursor: pointer;
  font-size: 2.2rem;
  font-weight: 700;
  height: 4rem;
  width: 4rem;
  outline: none;
  text-decoration: none;

  &:hover {
    background-color: ${(props) =>
      props.$themeColor === 'dark' ? '#e7e5e4' : '#a8a29e'};
    cursor: pointer;
  }

  &:active {
    opacity: 0.7;
  }
`;

export {
  StyledImg,
  StyledNormalButton,
  StyledIconMsgButton,
  StyledIconSidebarButton
};
