import styled from 'styled-components';

import { Link } from 'react-router-dom';
import Button from '../elements/Button';

const Wrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/4;
  border-right: 1px solid #d4d4d4;
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledSectionTop = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;

interface StyledUserPicProps {
  backgroundImage: string;
}

const StyledUserPic = styled.div<StyledUserPicProps>`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  background-image: ${(props) => props.backgroundImage};
  background-repeat: no-repeat;
  background-size: 4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

interface Props {
  userPic: string;
  themeIcon: string;
  handleThemeClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Sidebar = ({ userPic, themeIcon, handleThemeClick }: Props) => {
  return (
    <Wrapper>
      <StyledSectionTop>
        <StyledUserPic backgroundImage={userPic}></StyledUserPic>
        <ButtonWrapper>
          <Button
            isIcon={true}
            icon="add"
            themeColor={themeIcon === 'dark' ? 'dark' : 'light'}
          />
          <StyledLink to="/">
            <Button
              isIcon={true}
              icon="log-out"
              themeColor={themeIcon === 'dark' ? 'dark' : 'light'}
            />
          </StyledLink>
          <Button
            isIcon={true}
            icon={themeIcon === 'dark' ? 'light' : 'dark'}
            themeColor={themeIcon === 'dark' ? 'dark' : 'light'}
            handleClick={handleThemeClick}
          />
        </ButtonWrapper>
      </StyledSectionTop>
    </Wrapper>
  );
};

export default Sidebar;
