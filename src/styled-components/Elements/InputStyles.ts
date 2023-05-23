import styled from 'styled-components';

const StyledInput = styled.input`
  font-size: 1.5rem;
  border-radius: 2rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
  border: none;
  background-color: #f0f2f5;

  &::placeholder {
    color: #a3a3a3;
  }

  &:focus {
    outline: none;
  }
`;

export default StyledInput;
