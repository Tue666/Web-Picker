import React from "react";
import styled from "styled-components";
import { ConstantConfig } from "../config";
import { useTheme } from "../hooks";

const { BOX, ICON } = ConstantConfig;

interface RootProps {
  $disabled?: boolean;
  $isPointer?: boolean;
  $outlineColor?: string;
}

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  icon: string;
  disabled?: boolean;
  isPointer?: boolean;
  onClick?: () => void;
}

const Icon = (props: IconProps): React.JSX.Element => {
  const {
    icon,
    disabled = false,
    isPointer = true,
    className,
    onClick,
    ...rest
  } = props;
  const { outline } = useTheme();

  const onOverrideClick = () => {
    if (disabled) return;

    onClick && onClick();
  };
  return (
    <Root
      $disabled={disabled}
      $isPointer={!disabled && isPointer}
      $outlineColor={outline}
      className={`${icon} ${className}`}
      onClick={onOverrideClick}
      {...rest}
    />
  );
};

const Root = styled("i")<RootProps>`
  font-size: ${ICON.SIZE}px;
  padding-left: ${BOX.PADDING / 1.5}px;
  transition: 0.3s;
  cursor: ${(props) => (props.$isPointer ? "pointer" : "initial")};
  ${(props) => props.$disabled && `color: ${props.$outlineColor}`}
  ${(props) =>
    props.$isPointer &&
    props.$outlineColor &&
    `&: hover { color: ${props.$outlineColor}; }`}
`;

export default Icon;
