import styled from 'styled-components';

const Wrapper = styled.div`
  grid-column: 2/3;
  grid-row: 3/4;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-column-gap: 1rem;
  padding: 1rem;
  position: relative;
`;

const EmojiWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;

  @media (max-width: 450px) {
    bottom: -1.8rem;
    left: -1.2rem;
    transform: scale(0.8);
  }
`;

export { Wrapper, EmojiWrapper };
