import {
  FooterWrapper,
  StyledRefLink
} from '../../styled-components/Login/FooterStyles';
import { FaGithub } from 'react-icons/fa';

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
