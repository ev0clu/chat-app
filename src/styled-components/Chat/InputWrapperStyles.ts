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

  @media (max-width: 900px) {
    grid-column-gap: 0.5rem;
    padding: 0.5rem;
  }
`;

const EmojiWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;

  @media (max-width: 450px) {
    bottom: -3rem;
    left: -3rem;
    transform: scale(0.75);
  }
`;

export { Wrapper, EmojiWrapper };
