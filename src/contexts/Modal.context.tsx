import { PropsWithChildren, createContext, useState } from "react";
import { DatePicker, TimePicker } from "../components/modals";

export type ModalType = "DATE_PICKER_MODAL" | "TIME_PICKER_MODAL";

export const MODAL_TYPES = {
  DATE_PICKER_MODAL: "DATE_PICKER_MODAL",
  TIME_PICKER_MODAL: "TIME_PICKER_MODAL",
};

export const MODAL_COMPONENTS = {
  DATE_PICKER_MODAL: DatePicker,
  TIME_PICKER_MODAL: TimePicker,
};

interface ModalState {
  modalType?: ModalType;
  modalProps?: any;
}

interface ModalMethod {
  show: (modalType: ModalType, modalProps?: any) => void;
  hide: () => void;
}

const initialState: ModalState & ModalMethod = {
  show: () => {},
  hide: () => {},
};

const ModalContext = createContext(initialState);

const ModalProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [modal, setModal] = useState<ModalState>({});

  const show = (modalType: ModalType, modalProps?: any) => {
    setModal({
      ...modal,
      modalType,
      modalProps,
    });
  };
  const hide = () => {
    setModal({
      ...modal,
      modalType: undefined,
      modalProps: {},
    });
  };
  return (
    <ModalContext.Provider value={{ ...modal, show, hide }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext };
