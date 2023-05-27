import styled from 'styled-components';
import { MissingChatInfoProps } from '../../types/styled-components-types';

const StyledInput = styled.input<MissingChatInfoProps>`
  font-size: 1.5rem;
  border-radius: 2rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
  border: none;
  box-shadow: 0 0 0 2px ${(props) => props.$boxShadow};
  background-color: #f0f2f5;
  min-width: 200px;

  &::placeholder {
    color: #a3a3a3;
  }

  &:focus {
    outline: none;
  }
`;

export default StyledInput;
