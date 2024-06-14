import React from "react";
import { IPicker } from "../../../interfaces";
import TimeClock from "../../TimeClock.component";

interface HourSelectProps {
  hour: IPicker.TimePicker["hour"];
  onSelectMode: (mode: IPicker.TimeMode) => void;
  onSelectTime: (time: Partial<IPicker.TimePicker>) => void;
}

const HourSelect = (props: HourSelectProps): React.JSX.Element => {
  const { hour, onSelectMode, onSelectTime } = props;
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const hoursWheel = hours.map((hour) => ({
    value: hour,
    subValue: hour === 12 ? 0 : hour + 12,
  }));

  const onSelectValue = (value: IPicker.TimePicker["hour"]) => {
    onSelectTime({ hour: value });
    onSelectMode("minute");
  };
  return (
    <TimeClock
      selected={hour}
      wheel={hoursWheel}
      zeroPrefix={false}
      callback={onSelectValue}
    />
  );
};

export default HourSelect;
