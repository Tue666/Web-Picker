import React from "react";
import { IPicker } from "../interfaces";
import { TimeUtil } from "../utils";
import { DatePicker } from "./modals";
import Input, { InputProps } from "./Input.component";

interface DateInputProps extends Omit<InputProps, "value" | "modal"> {
  value?: IPicker.DatePicker;
}

const DateInput = (props: DateInputProps): React.JSX.Element => {
  const { value, ...rest } = props;

  return (
    <Input
      value={TimeUtil.toDatePickerText(value)}
      modal={{
        value,
        Component: DatePicker,
      }}
      {...rest}
    />
  );
};

export default DateInput;
