import React from "react";
import { IPicker } from "../interfaces";
import { TimeUtil } from "../utils";
import { TimePicker } from "./modals";
import Input, { InputProps } from "./Input.component";

interface TimeInputProps extends Omit<InputProps, "value" | "modal"> {
  value?: IPicker.TimePicker;
}

const TimeInput = (props: TimeInputProps): React.JSX.Element => {
  const { value, ...rest } = props;

  return (
    <Input
      value={TimeUtil.toTimePickerText(value)}
      modal={{
        value,
        Component: TimePicker,
      }}
      {...rest}
    />
  );
};

export default TimeInput;
