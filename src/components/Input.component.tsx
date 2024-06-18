import React, { useState } from "react";
import styled from "styled-components";
import { ConstantConfig } from "../config";
import { useTheme } from "../hooks";
import Icon from "./Icon.component";
import Modal from "./Modal.component";

const { BOX, BREAK_POINTS, INPUT } = ConstantConfig;

interface RootProps {
  $textColor: string;
  $outlineColor: string;
}

interface PlaceHolderProps {
  $hasValue: boolean;
  $hasIcon: boolean;
  $textColor: string;
  $backgroundColor: string;
}

export interface ModalComponentType<T> {
  value: T;
  onCloseModal: () => void;
  onConfirmValue: (value: T) => void;
}

export interface InputProps {
  value?: string;
  modal?: {
    value: unknown;
    Component: React.ComponentType<ModalComponentType<any>>;
  };
  placeholder?: string;
  icon?: string;
  allowClear?: boolean;
  onValueChange?: (value?: any) => void;
}

const Input = (props: InputProps): React.JSX.Element => {
  const { value, modal, placeholder, icon, allowClear, onValueChange } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const { background, text, outline } = useTheme();

  const onClickToggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const onClickClearInput = () => {
    onValueChange && onValueChange(undefined);
  };
  const onClickConfirmModalValue = (value: unknown) => {
    onValueChange && onValueChange(value);
  };
  return (
    <Root $textColor={text} $outlineColor={outline} className="row center">
      {modal && modalVisible && (
        <Modal>
          <modal.Component
            value={modal.value}
            onCloseModal={onClickToggleModal}
            onConfirmValue={onClickConfirmModalValue}
          />
        </Modal>
      )}
      <div className="fw row opposite">
        <div className="fw row opposite">
          <Label
            readOnly
            value={value}
            className="fw text text-ellipsis"
            onClick={onClickToggleModal}
          />
          {placeholder && (
            <PlaceHolder
              $hasValue={!!value}
              $hasIcon={!!icon}
              $textColor={outline}
              $backgroundColor={background}
              className={`${value ? "text-small" : "text"} text-ellipsis`}
            >
              {placeholder}
            </PlaceHolder>
          )}
          {value && allowClear && (
            <Icon icon="bi bi-x-circle" onClick={onClickClearInput} />
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

const Label = styled("input")`
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
    props.$hasValue
      ? Math.floor(BOX.PADDING / 3) * -1
      : BOX.PADDING / 1.5 + BOX.PADDING / 3}px;
  background-color: ${(props) =>
    props.$hasValue ? props.$backgroundColor : "transparent"};
  padding-inline: ${(props) => (props.$hasValue ? BOX.PADDING / 4 : 0)}px;
`;

export default Input;
