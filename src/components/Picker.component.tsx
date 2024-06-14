import React from "react";
import styled from "styled-components";
import { ModalType } from "../contexts";
import { ConstantConfig } from "../config";
import { useModal, useTheme } from "../hooks";
import Icon from "./Icon.component";

const { BOX, BREAK_POINTS, INPUT } = ConstantConfig;

interface RootProps {
  $textColor: string;
  $outlineColor: string;
}

interface PlaceHolderProps {
  $isFocus: boolean;
  $hasIcon: boolean;
  $textColor: string;
  $backgroundColor: string;
}

interface PickerProps {
  title: string;
  placeholder?: string;
  icon?: string;
  clearText?: boolean;
  onClearText?: () => void;
  modalType: ModalType;
  [key: string]: any;
}

const Picker = (props: PickerProps): React.JSX.Element => {
  const {
    title,
    placeholder,
    icon,
    clearText,
    onClearText,
    modalType,
    ...rest
  } = props;
  const { show } = useModal();
  const { background, text, outline } = useTheme();

  const onClickShowModal = () => {
    show(modalType, rest);
  };
  return (
    <Root $textColor={text} $outlineColor={outline} className="row center">
      <div className="fw row opposite">
        <div className="fw row opposite">
          <Input
            readOnly
            value={title}
            className="fw text text-ellipsis"
            onClick={onClickShowModal}
          />
          {placeholder && (
            <PlaceHolder
              $isFocus={!!title}
              $hasIcon={!!icon}
              $textColor={outline}
              $backgroundColor={background}
              className={`${title ? "text-small" : "text"} text-ellipsis`}
            >
              {placeholder}
            </PlaceHolder>
          )}
          {title && clearText && (
            <Icon icon="bi bi-x-circle" onClick={onClearText} />
          )}
        </div>
        {icon && (
          <Icon
            icon={icon}
            isPointer={false}
            style={{ fontSize: INPUT.ICON_SIZE }}
          />
        )}
      </div>
    </Root>
  );
};

const Root = styled("div")<RootProps>`
  width: 100%;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-radius: ${BOX.BORDER_RADIUS}px;
  border-color: ${(props) => props.$outlineColor};
  transition: 0.3s;
  margin: ${BOX.MARGIN / 2}px;
  padding: ${BOX.PADDING / 1.5}px;

  &:hover {
    border-color: ${(props) => props.$textColor};
  }

  @media screen and (min-width: ${BREAK_POINTS.TABLET}) {
    width: 40%;
  }
`;

const Input = styled("input")`
  border: none;
  outline: none;
  background-color: transparent;
  padding-block: ${BOX.PADDING / 3}px;
`;

const PlaceHolder = styled("span")<PlaceHolderProps>`
  position: absolute;
  max-width: calc(
    100% - ${(BOX.PADDING / 1.5) * 2}px -
      ${(props) => (props.$hasIcon ? INPUT.ICON_SIZE + BOX.PADDING / 1.5 : 0)}px
  );
  transition: 0.3s;
  color: ${(props) => props.$textColor};
  left: ${BOX.PADDING / 1.5}px;
  top: ${(props) =>
    props.$isFocus
      ? Math.floor(BOX.PADDING / 3) * -1
      : BOX.PADDING / 1.5 + BOX.PADDING / 3}px;
  background-color: ${(props) =>
    props.$isFocus ? props.$backgroundColor : "transparent"};
  padding-inline: ${(props) => (props.$isFocus ? BOX.PADDING / 4 : 0)}px;
`;

export default Picker;
