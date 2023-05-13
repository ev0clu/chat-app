import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
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

const Footer = () => {
  return (
    <FooterWrapper>
      <p>Copyright © Laszlo Kis 2023</p>
      <StyledRefLink
        href="https://github.com/ev0clu"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub />
      </StyledRefLink>
    </FooterWrapper>
  );
};

export default Footer;
