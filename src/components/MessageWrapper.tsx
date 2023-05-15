import styled from 'styled-components';

interface WrapperProps {
  themeColor: string;
}

const Wrapper = styled.div<WrapperProps>`
  grid-column: 2/3;
  grid-row: 2/3;
  border-top: 1px solid
    ${(props) =>
      props.themeColor === 'dark' ? '#d4d4d4' : '#78716c'};
  border-bottom: 1px solid
    ${(props) =>
      props.themeColor === 'dark' ? '#d4d4d4' : '#78716c'};
  padding: 1rem;
`;

interface Props {
  themeIcon: string;
}

const Messages = ({ themeIcon }: Props) => {
  return (
    <>
      <Wrapper themeColor={themeIcon === 'dark' ? 'dark' : 'light'}>
        Messages
      </Wrapper>
    </>
  );
};

export default Messages;
