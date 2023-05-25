import { InputProps } from '../types/functional-components-types';
import StyledInput from '../styled-components/Elements/InputStyles';

const Input = ({
  value,
  placeholder,
  missingChatName,
  handleChange,
  handleInputKeyDown
}: InputProps) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      $borderColor={missingChatName ? 'red' : ''}
      value={value}
      onChange={handleChange}
      onKeyDown={handleInputKeyDown}
    />
  );
};

export default Input;
