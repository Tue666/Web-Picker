import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ConstantConfig } from "../../../config";
import { useTheme } from "../../../hooks";
import { IPicker } from "../../../interfaces";
import { TimeUtil } from "../../../utils";
import DaySelect from "./DaySelect.component";
import YearSelect from "./YearSelect.component";
import Icon from "../../Icon.component";
import Button from "../../Button.component";

const { BOX, MODAL } = ConstantConfig;
const { DATE_PICKER } = MODAL;

interface RootProps {
  $backgroundColor: string;
}

interface DatePickerProps {
  onCloseModal: () => void;
  date?: IPicker.DatePicker;
  onChangeDatePicker?: (time: IPicker.DatePicker) => void;
}

const DatePicker = (props: DatePickerProps): React.JSX.Element => {
  const { onCloseModal, date, onChangeDatePicker } = props;
  const now = new Date();
  const [yearVisible, setYearVisible] = useState(false);
  const [selectingDate, setSelectingDate] = useState({
    day: date?.day ?? now.getDate(),
    month: date?.month ?? now.getMonth() + 1, // Function returns 0-11 corresponding to 12 months
    year: date?.year ?? now.getFullYear(),
  });
  const dateRef = useRef(selectingDate); // Keep track the selected day
  const { paper } = useTheme();
  const disablePrev = TimeUtil.isMinAvailableYear(
    selectingDate.month,
    selectingDate.year
  );
  const disableNext = TimeUtil.isMaxAvailableYear(
    selectingDate.month,
    selectingDate.year
  );

  const onPressChangeYearVisible = () => {
    setYearVisible(!yearVisible);
  };
  const onSelectDate = (date: Partial<IPicker.DatePicker>) => {
    setSelectingDate({ ...selectingDate, ...date });
  };
  const onSelectDay = (day: IPicker.DatePicker["day"]) => {
    onChangeDatePicker && onChangeDatePicker({ ...selectingDate, day });
    onCloseModal();
  };
  return (
    <Root $backgroundColor={paper}>
      <div className="row opposite">
        <div
          className="row opposite"
          style={{ cursor: "pointer" }}
          onClick={onPressChangeYearVisible}
        >
          <span className="bold">
            {TimeUtil.toMonthText(selectingDate.month)} {selectingDate.year}
          </span>
          <Icon
            icon={
              !yearVisible ? "bi bi-caret-down-fill" : "bi bi-caret-up-fill"
            }
          />
        </div>
        {!yearVisible && (
          <div className="row">
            <Icon
              disabled={disablePrev}
              icon="bi bi-chevron-left"
              onClick={() =>
                onSelectDate(
                  TimeUtil.jumpMonth(
                    selectingDate.month,
                    selectingDate.year,
                    -1
                  )
                )
              }
            />
            <Icon
              disabled={disableNext}
              icon="bi bi-chevron-right"
              onClick={() =>
                onSelectDate(
                  TimeUtil.jumpMonth(selectingDate.month, selectingDate.year, 1)
                )
              }
            />
          </div>
        )}
      </div>
      {!yearVisible && (
        <DaySelect
          date={selectingDate}
          dateRef={dateRef.current}
          onSelectDay={onSelectDay}
        />
      )}
      {yearVisible && (
        <YearSelect
          year={selectingDate.year}
          onToggleVisibleYear={onPressChangeYearVisible}
          onSelectDate={onSelectDate}
        />
      )}
      <div className="row opposite">
        <div></div>
        <Button title="cancel" onClick={onCloseModal} />
      </div>
    </Root>
  );
};

const Root = styled("div")<RootProps>`
  width: ${DATE_PICKER.WIDTH}px;
  padding: ${BOX.PADDING}px;
  border-radius: ${BOX.BORDER_RADIUS}px;
  background-color: ${(props) => props.$backgroundColor};
`;

export default DatePicker;
