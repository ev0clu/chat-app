import styled from 'styled-components';

const StyledSidebar = styled.div`
  grid-column: 1/2;
  grid-row: 1/4;
  border-right: 1px solid #d4d4d4;
  padding: 1rem;
`;

const Sidebar = () => {
  return (
    <>
      <StyledSidebar>Chats</StyledSidebar>
    </>
  );
};

export default Sidebar;
