import React from "react";
import { ConstantConfig } from "../../../config";
import { IPicker } from "../../../interfaces";
import TimeClock from "../../TimeClock.component";

const { MODAL } = ConstantConfig;
const { TIME_PICKER } = MODAL;

interface MinuteSelectProps {
  minute: IPicker.TimePicker["minute"];
  onSelectTime: (time: Partial<IPicker.TimePicker>) => void;
}

const MinuteSelect = (props: MinuteSelectProps): React.JSX.Element => {
  const { minute, onSelectTime } = props;
  const minutesWheel = [];
  for (let i = 0; i < 60; i++) {
    minutesWheel.push({
      value: i,
      visible: i % TIME_PICKER.VISIBLE_DIVISOR === 0,
    });
  }

  const onSelectValue = (value: IPicker.TimePicker["minute"]) => {
    onSelectTime({ minute: value });
  };
  return (
    <TimeClock
      selected={minute}
      wheel={minutesWheel}
      callback={onSelectValue}
    />
  );
};

export default MinuteSelect;
