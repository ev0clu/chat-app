import { RefObject } from 'react';

interface SelectedChatProps {
  chatId: string;
  chatName: string;
  uidA: string;
  uidB: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

interface FilteredMessagesProps {
  id: string;
  name: string;
  text: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
  uid: string;
  chatId: string;
}

interface ChatsProps {
  chatId: string;
  chatName: string;
  uidA: string;
  uidB: string;
  timestamp: { seconds: number; nanoseconds: number };
  id: string;
}

interface MessagesProps {
  name: string;
  text: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  uid: string;
  chatId: string;
  id: string;
}

interface HeaderProps {
  selectedChat: SelectedChatProps;
  filteredMessages: FilteredMessagesProps[];
  handleDeleteChatClick: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

interface InputWrapperComponentProps {
  selectedChat: SelectedChatProps;
  scroll: RefObject<HTMLDivElement>;
  userId: string;
  userName: string;
}

interface MessagesWrapperComponentProps {
  selectedChat: SelectedChatProps;
  filteredMessages: FilteredMessagesProps[];
  scroll: RefObject<HTMLDivElement>;
  userId: string;
}

interface SidebarProps {
  userId: string;
  chats: ChatsProps[];
  handleThemeClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChatClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

interface UsersProps {
  id: string;
  name: string;
  docId: string;
}

interface ButtonProps {
  buttonType: string;
  icon?: string;
  themeColor?: string;
  text?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type {
  ChatsProps,
  MessagesProps,
  HeaderProps,
  InputWrapperComponentProps,
  MessagesWrapperComponentProps,
  SidebarProps,
  UsersProps,
  ButtonProps
};
