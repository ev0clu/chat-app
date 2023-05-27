# **Chat app**

A general chat app has built.

### Demo: [Link](https://ev0clu.github.io/chat-app/)

## Features

- Log in with Google authentication
- Firebase uses for backend to store users, chat rooms and messages data
- React routes uses to handle pages
- Loading screen uses until data are loaded for Chat page
- Light and Dark theme can choose
- Different viewport size are handled with media query
- Sidebar:
  - Porfile picture from google authentication
  - Buttons for theme changes, logout and to add private chat
  - Public chat can be used by every users for general chating
  - Private chat can be added and 2 users can talk
  - Red border notification if chat room's name or user selection is missing
- Header:
  - Shows selected chat room logo, room name and last message date
  - Delete button to remove chats with messages, except the Public Chat data
- Messages:
  - Message bubbles oriented based on the message has written by the logged user or by other users
- Message sending:
  - Send button and Enter key can be used
  - Emoji characters can use beside normal characters

### Developement dependencies

- [React](https://react.dev/)
- [React Router DOM](https://www.npmjs.com/package/react-router-dom)
- [React Icons](https://www.npmjs.com/package/react-icons)
- [React Emoji Picker](https://www.npmjs.com/package/emoji-picker-react)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/)
- [Styled components](https://styled-components.com/)
- [date-fns](https://github.com/date-fns/date-fns)

### Layout

![layout picture](https://github.com/ev0clu/chat-app/blob/main/layout1.png?raw=true)

![layout picture](https://github.com/ev0clu/chat-app/blob/main/layout2.png?raw=true)
