import styled from 'styled-components';

const HeaderWrapper = styled.header`
  grid-column: 2/3;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 1rem;
  padding: 1rem;
`;

const StyledChatLogo = styled.div`
  grid-column: 1/2;
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

  @media (max-width: 900px) {
    height: 3rem;
    width: 3rem;
  }
`;

const Title = styled.h2`
  grid-column: 2/3;
  grid-row: 1/2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Paragraph = styled.p`
  grid-column: 2/3;
  grid-row: 2/3;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #a3a3a3;

  @media (max-width: 900px) {
    font-size: 0.9rem;
  }
`;

const ButtonWrapper = styled.div`
  grid-column: 3/4;
  grid-row: 1/3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  HeaderWrapper,
  StyledChatLogo,
  Title,
  Paragraph,
  ButtonWrapper
};
