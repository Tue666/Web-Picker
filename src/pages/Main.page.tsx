import React, { useState } from "react";
import styled from "styled-components";
import { Picker } from "../components";
import { ConstantConfig } from "../config";
import { useTheme } from "../hooks";
import { IPicker } from "../interfaces";
import { TimeUtil } from "../utils";

const { BOX } = ConstantConfig;

interface RootProps {
  $backgroundColor: string;
  $textColor: string;
}

const MainPage = (): React.JSX.Element => {
  const now = new Date();
  const [date, setDate] = useState<IPicker.DatePicker | undefined>({
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });
  const [time, setTime] = useState<IPicker.TimePicker | undefined>({
    hour: now.getHours(),
    minute: now.getMinutes(),
  });
  const { background, text } = useTheme();

  const onChangeDatePicker = (date?: IPicker.DatePicker) => {
    setDate(date);
  };
  const onClearDatePicker = () => {
    if (!date) return;
    setDate(undefined);
  };
  const onChangeTimePicker = (time?: IPicker.TimePicker) => {
    setTime(time);
  };
  const onClearTimePicker = () => {
    if (!time) return;
    setTime(undefined);
  };

  return (
    <Root
      className="fs col center"
      $backgroundColor={background}
      $textColor={text}
    >
      <Picker
        title={TimeUtil.toDatePickerText(date)}
        placeholder="Date mobile"
        clearText
        onClearText={onClearDatePicker}
        modalType="DATE_PICKER_MODAL"
        date={date}
        onChangeDatePicker={onChangeDatePicker}
      />
      <Picker
        title={TimeUtil.toTimePickerText(time)}
        placeholder="Time"
        icon="bi bi-clock"
        clearText
        onClearText={onClearTimePicker}
        modalType="TIME_PICKER_MODAL"
        time={time}
        onChangeTimePicker={onChangeTimePicker}
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
