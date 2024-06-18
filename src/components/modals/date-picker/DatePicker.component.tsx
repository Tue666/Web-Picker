import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ConstantConfig } from "../../../config";
import { useTheme } from "../../../hooks";
import { IPicker } from "../../../interfaces";
import { NumberUtil, TimeUtil } from "../../../utils";
import DaySelect from "./DaySelect.component";
import YearSelect from "./YearSelect.component";
import Icon from "../../Icon.component";
import Button from "../../Button.component";
import { ModalComponentType } from "../../Input.component";

const { BOX, DAYS_IN_WEEK, MODAL, NUMBER } = ConstantConfig;
const { DATE_PICKER } = MODAL;

const CONTENT_WIDTH =
  DATE_PICKER.WIDTH - (BOX.PADDING * 2 + DATE_PICKER.PADDING * 2);
const CONTENT_ROWS = 7; // Includes 1 row for day and 6 lines for date

interface RootProps {
  $backgroundColor: string;
}

interface DatePickerProps extends ModalComponentType<IPicker.DatePicker> {}

const DatePicker = (props: DatePickerProps): React.JSX.Element => {
  const { value, onCloseModal, onConfirmValue } = props;
  const now = new Date();
  const [yearVisible, setYearVisible] = useState(false);
  const [selectingDate, setSelectingDate] = useState({
    day: value?.day ?? now.getDate(),
    month: value?.month ?? now.getMonth() + 1, // Function returns 0-11 corresponding to 12 months
    year: value?.year ?? now.getFullYear(),
  });
  const dateRef = useRef(selectingDate); // Keep track the selected day
  const { outline, paper } = useTheme();
  const numberSize = NumberUtil.calculateNumberSize(
    CONTENT_WIDTH,
    DAYS_IN_WEEK
  );
  const contentHeight =
    DATE_PICKER.PADDING * 2 + (numberSize + NUMBER.MARGIN * 2) * CONTENT_ROWS;
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
    onConfirmValue && onConfirmValue({ ...selectingDate, day });
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
          <span className="bold" style={{ paddingRight: BOX.PADDING / 1.5 }}>
            {TimeUtil.toMonthText(selectingDate.month)} {selectingDate.year}
          </span>
          <Icon
            icon="bi bi-caret-down-fill"
            style={{
              padding: 0,
              transform: `rotate(${yearVisible ? 180 : 0}deg)`,
            }}
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
          numberSize={numberSize}
          height={contentHeight}
          date={selectingDate}
          dateRef={dateRef.current}
          onSelectDay={onSelectDay}
        />
      )}
      {yearVisible && (
        <YearSelect
          height={contentHeight}
          year={selectingDate.year}
          onToggleVisibleYear={onPressChangeYearVisible}
          onSelectDate={onSelectDate}
        />
      )}
      <div className="row opposite">
        <div></div>
        <Button
          title="cancel"
          onClick={onCloseModal}
          style={{ color: outline }}
        />
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
