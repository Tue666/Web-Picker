import React, { useState } from "react";
import styled from "styled-components";
import { DateInput, TimeInput } from "../components";
import { ConstantConfig } from "../config";
import { useTheme } from "../hooks";
import { IPicker } from "../interfaces";

const { BOX } = ConstantConfig;

interface RootProps {
  $backgroundColor: string;
  $textColor: string;
}

const MainPage = (): React.JSX.Element => {
  const [date, setDate] = useState<IPicker.DatePicker | undefined>(undefined);
  const [time, setTime] = useState<IPicker.TimePicker | undefined>(undefined);
  const { background, text } = useTheme();

  const onValueDatePickerChange = (value?: IPicker.DatePicker) => {
    setDate(value);
  };
  const onValueTimePickerChange = (value?: IPicker.TimePicker) => {
    setTime(value);
  };
  return (
    <Root
      className="fs col center"
      $backgroundColor={background}
      $textColor={text}
    >
      <DateInput
        value={date}
        placeholder="Date mobile"
        allowClear
        onValueChange={onValueDatePickerChange}
      />
      <TimeInput
        value={time}
        placeholder="Time"
        icon="bi bi-clock"
        allowClear
        onValueChange={onValueTimePickerChange}
      />
    </Root>
  );
};

const Root = styled("div")<RootProps>`
  padding: ${BOX.PADDING * 2}px;
  background-color: ${(props) => props.$backgroundColor};
  & * {
    color: ${(props) => props.$textColor};
  }
`;

export default MainPage;
