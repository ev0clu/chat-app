import styled from 'styled-components';
import { MissingChatNameProps } from '../../types/styled-components-types';

const StyledInput = styled.input<MissingChatNameProps>`
  font-size: 1.5rem;
  border-radius: 2rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
  border: none;
  box-shadow: 0 0 0 2px ${(props) => props.$borderColor};
  background-color: #f0f2f5;

  &::placeholder {
    color: #a3a3a3;
  }

  &:focus {
    outline: none;
  }
`;

export default StyledInput;
