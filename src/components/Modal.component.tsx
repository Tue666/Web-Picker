import React from "react";
import styled, { keyframes } from "styled-components";
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

const slideAnim = keyframes`
  from {
    transform: translateY(50px)
  }

  to {
    transform: translateY(0px)
  }
`;

const Root = styled("div")<RootProps>`
  position: absolute;
  background-color: transparent;
  z-index: 9999;
  animation: ${slideAnim} 0.3s ease-in-out;
  & * {
    color: ${(props) => props.$textColor};
  }
`;

export default Modal;
