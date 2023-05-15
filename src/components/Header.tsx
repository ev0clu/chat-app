import styled from 'styled-components';

const Wrapper = styled.header`
  grid-column: 2/3;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 1rem;
  border-bottom: 1px solid #d4d4d4;
  padding: 1rem;
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

const Paragraph = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #a3a3a3;
`;

const Header = () => {
  return (
    <Wrapper>
      <StyledChatLogo>PC</StyledChatLogo>
      <Title>Public Chat</Title>
      <Paragraph>Last message at 14/05 16:27</Paragraph>
    </Wrapper>
  );
};

export default Header;
