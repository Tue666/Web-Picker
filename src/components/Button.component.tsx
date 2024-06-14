import React from "react";
import styled from "styled-components";
import { ConstantConfig } from "../config";
import { useTheme } from "../hooks";

const { BOX } = ConstantConfig;

interface RootProps {
  $textColor: string;
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button = (props: ButtonProps): React.JSX.Element => {
  const { title, ...rest } = props;
  const { primary } = useTheme();

  return (
    <Root $textColor={primary.main} title={title} {...rest}>
      {title}
    </Root>
  );
};

const Root = styled("button")<RootProps>`
  background-color: transparent;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  padding: ${BOX.PADDING / 2}px;
  color: ${(props) => props.$textColor};
`;

export default Button;
