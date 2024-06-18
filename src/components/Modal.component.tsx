import React, { PropsWithChildren } from "react";
import styled, { keyframes } from "styled-components";
import { useTheme } from "../hooks";

interface RootProps {
  $textColor: string;
}

interface ModalProps extends PropsWithChildren {}

const Modal = (props: ModalProps): React.JSX.Element => {
  const { children } = props;
  const { text } = useTheme();

  return (
    <Root className="full col center" $textColor={text}>
      {children}
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
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 9999;
  animation: ${slideAnim} 0.3s ease-in-out;
  & * {
    color: ${(props) => props.$textColor};
  }
`;

export default Modal;
