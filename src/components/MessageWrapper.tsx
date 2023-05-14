import styled from 'styled-components';

const StyledSidebar = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  padding: 1rem;
`;

const Messages = () => {
  return (
    <>
      <StyledSidebar>Messages</StyledSidebar>
    </>
  );
};

export default Messages;
