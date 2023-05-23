import { InputProps } from '../types/functional-components-types';
import StyledInput from '../styled-components/Elements/InputStyles';

const Input = ({
  value,
  placeholder,
  handleChange,
  handleInputKeyDown
}: InputProps) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleInputKeyDown}
    />
  );
};

export default Input;
