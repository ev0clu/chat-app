import React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f80ed;
  border-radius: 5px;
  border-style: none;
  color: #fff;
  cursor: pointer;
  font-size: 26px;
  font-weight: 700;
  height: 50px;
  outline: none;
  overflow: hidden;
  padding: 30px 50px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: #1366d6;
    box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px, rgba(0, 0, 0, 0.05) 0 1px 4px;
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.35s;
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.1) 0 3px 6px 0, rgba(0, 0, 0, 0.1) 0 0 10px 0,
      rgba(0, 0, 0, 0.1) 0 1px 4px -1px;
    transform: translateY(4px);
    transition-duration: 0.35s;
  }
`;

interface Props {
  isSpan?: boolean;
  text: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ isSpan, text, handleClick }: Props) => {
  return (
    <>
      <StyledButton onClick={handleClick}>
        {isSpan ? <span>{text}</span> : text}
      </StyledButton>
    </>
  );
};

export default Button;
