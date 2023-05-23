import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: #f5f5f4;
`;

const StyledRefLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 1.3rem;

  &:hover {
    color: #cbd5e1;
  }
`;

export { FooterWrapper, StyledRefLink };
