import React from "react";
import styled from "styled-components";
import { ConstantConfig } from "../config";
import { useTheme } from "../hooks";
import { NumberUtil } from "../utils";

const { NUMBER } = ConstantConfig;

interface RootProps {
  $transparent: boolean;
  $size: number;
  $backgroundColor: string;
  $textColor: string;
  $outlineColor: string;
}

interface DotProps {
  $backgroundColor: string;
}

interface NumberProps extends React.HTMLAttributes<HTMLDivElement> {
  intend?: {
    containerWidth: number;
    rowSize: number;
  };
  size?: number;
  isSelected?: boolean;
  transparent?: boolean;
  value?: string | number;
  [key: string]: any;
}

const Number = (props: NumberProps): React.JSX.Element => {
  const { intend, size, isSelected, transparent, value, ...rest } = props;
  const { background, text, outline, primary } = useTheme();
  // Size of number will depend on whether or not you intend to take up some space when render UI
  // If "intend" is provided, the size will be calculated to display in the correct number on a horizontal row
  // Otherwise, it will be its default value or customize value
  const defaultSize =
    size ||
    (!intend
      ? NUMBER.SIZE
      : NumberUtil.calculateNumberSize(intend.containerWidth, intend.rowSize));
  const bgColor = isSelected ? primary.main : background;
  const textColor = isSelected ? primary.contrastText : text;

  return (
    <Root
      $transparent={!!transparent}
      $size={defaultSize}
      $backgroundColor={transparent ? "transparent" : bgColor}
      $textColor={textColor}
      $outlineColor={isSelected ? bgColor : outline}
      className="row center"
      {...rest}
    >
      {!transparent &&
        value !== undefined && // <label style={{ color: textColor, ...textStyle }}>{value}</label>
        value}
      {!transparent && value === undefined && isSelected && (
        <Dot $backgroundColor={text} />
      )}
    </Root>
  );
};

const Root = styled("div")<RootProps>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  margin: ${NUMBER.MARGIN}px;
  cursor: pointer;
  visibility: ${(props) => (props.$transparent ? "hidden" : "visible")};
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
  transition: 0.3s;
  &:hover {
    background-color: ${(props) => props.$outlineColor};
  }
`;

const Dot = styled("div")<DotProps>`
  width: ${NUMBER.DOT_SIZE}px;
  height: ${NUMBER.DOT_SIZE}px;
  border-radius: 50%;
  background-color: ${(props) => props.$backgroundColor};
`;

export default Number;
