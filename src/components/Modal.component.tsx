import React from "react";
import styled from "styled-components";
import { MODAL_COMPONENTS } from "../contexts";
import { useModal, useTheme } from "../hooks";

interface RootProps {
  $textColor: string;
}

const Modal = (): React.JSX.Element | null => {
  const { modalType, modalProps, hide } = useModal();
  const { text } = useTheme();
  const Component = modalType && MODAL_COMPONENTS[modalType];

  if (!modalType || !Component) return null;

  return (
    <Root className="fs col center" $textColor={text}>
      <Component {...modalProps} onCloseModal={hide} />
    </Root>
  );
};

const Root = styled("div")<RootProps>`
  position: absolute;
  background-color: transparent;
  z-index: 9999;
  & * {
    color: ${(props) => props.$textColor};
  }
`;

export default Modal;
