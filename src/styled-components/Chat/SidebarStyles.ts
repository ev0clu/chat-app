import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type {
  ThemeProps,
  BackgroundImageProps
} from '../../types/styled-components-types';

const SidebarWrapper = styled.div<ThemeProps>`
  grid-column: 1/2;
  grid-row: 1/4;
  border-right: 1px solid
    ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  min-width: 22rem;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const TopWrapper = styled.div<ThemeProps>`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  background-color: ${(props) =>
    props.$themeColor === 'light' ? '#27272a' : '#fff'};
`;

const BottomWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1rem;
`;

const StyledChatBox = styled.li<ThemeProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
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

const UserListWrapper = styled.ul<ThemeProps>`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  list-style-type: none;
  height: 6rem;
  border: 1px solid
    ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const StyledUserList = styled.li<ThemeProps>`
  padding: 0.3rem 6rem;
  font-size: 0.8rem;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.$themeColor === 'light' ? '#78716c' : '#d4d4d4'};
  }
`;

const StyledUserPic = styled.div<BackgroundImageProps>`
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

const AddChatWrapper = styled.div<ThemeProps>`
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

export {
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
};
