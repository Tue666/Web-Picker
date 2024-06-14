import React, { useState } from "react";
import styled from "styled-components";
import { ConstantConfig } from "../../../config";
import { useTheme } from "../../../hooks";
import { IPicker } from "../../../interfaces";
import { NumberUtil } from "../../../utils";
import Button from "../../Button.component";
import HourSelect from "./HourSelect.component";
import MinuteSelect from "./MinuteSelect.component";

const { BOX, MODAL } = ConstantConfig;
const { TIME_PICKER } = MODAL;

interface RootProps {
  $backgroundColor: string;
}

interface TimePickerProps {
  onCloseModal: () => void;
  time?: IPicker.TimePicker;
  onChangeTimePicker?: (time: IPicker.TimePicker) => void;
}

const TimePicker = (props: TimePickerProps): React.JSX.Element => {
  const { onCloseModal, time, onChangeTimePicker } = props;
  const now = new Date();
  const [selectingMode, setSelectingMode] = useState<IPicker.TimeMode>("hour");
  const [selectingTime, setSelectingTime] = useState({
    hour: time?.hour ?? now.getHours(),
    minute: time?.minute ?? now.getMinutes(),
  });
  const { paper, text, outline, secondary } = useTheme();

  const onSelectMode = (mode: IPicker.TimeMode) => {
    setSelectingMode(mode);
  };
  const onSelectTime = (time: Partial<IPicker.TimePicker>) => {
    setSelectingTime({ ...selectingTime, ...time });
  };
  const onPressConfirm = () => {
    onChangeTimePicker && onChangeTimePicker(selectingTime);
    onCloseModal();
  };
  return (
    <Root className="col center" $backgroundColor={paper}>
      <div className="row">
        <span
          className="text-large bold"
          style={{
            color: selectingMode === "hour" ? text : outline,
            cursor: "pointer",
          }}
          onClick={() => onSelectMode("hour")}
        >
          {NumberUtil.toZeroPrefix(selectingTime.hour)}
        </span>
        <span className="text-large bold" style={{ color: outline }}>
          :
        </span>
        <span
          className="text-large bold"
          style={{
            color: selectingMode === "minute" ? text : outline,
            cursor: "pointer",
          }}
          onClick={() => onSelectMode("minute")}
        >
          {NumberUtil.toZeroPrefix(selectingTime.minute)}
        </span>
      </div>
      {selectingMode === "hour" && (
        <HourSelect
          hour={selectingTime.hour}
          onSelectMode={onSelectMode}
          onSelectTime={onSelectTime}
        />
      )}
      {selectingMode === "minute" && (
        <MinuteSelect
          minute={selectingTime.minute}
          onSelectTime={onSelectTime}
        />
      )}
      <div className="fw row opposite">
        <div></div>
        <div className="row opposite">
          <Button
            title="cancel"
            onClick={onCloseModal}
            style={{ color: outline }}
          />
          <Button
            title="ok"
            onClick={onPressConfirm}
            style={{ color: secondary.main }}
          />
        </div>
      </div>
    </Root>
  );
};

const Root = styled("div")<RootProps>`
  width: ${TIME_PICKER.WIDTH}px;
  padding: ${BOX.PADDING}px;
  border-radius: ${BOX.BORDER_RADIUS}px;
  background-color: ${(props) => props.$backgroundColor};
`;

export default TimePicker;
