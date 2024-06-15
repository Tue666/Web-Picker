import React from "react";
import { ConstantConfig } from "../../../config";
import { useTheme } from "../../../hooks";
import { IPicker } from "../../../interfaces";
import { TimeUtil } from "../../../utils";
import Number from "../../Number.component";

const { MODAL } = ConstantConfig;
const { DATE_PICKER } = MODAL;

interface DaySelectProps {
  numberSize: number;
  height: number;
  date: IPicker.DatePicker;
  dateRef: IPicker.DatePicker;
  onSelectDay: (value: IPicker.DatePicker["day"]) => void;
}

const DaySelect = (props: DaySelectProps): React.JSX.Element => {
  const { numberSize, height, date, dateRef, onSelectDay } = props;
  const { outline } = useTheme();
  const isPreview = date.month !== dateRef.month || date.year !== dateRef.year;
  const headerStyle = {
    bgColor: "transparent",
    textColor: outline,
  };

  return (
    <div
      className="row row-wrap"
      style={{ minHeight: height, padding: DATE_PICKER.PADDING }}
    >
      {DATE_PICKER.DAYS_OF_WEEK.map((day, index) => {
        return (
          <Number
            key={index}
            size={numberSize}
            value={day}
            style={{
              cursor: "text",
              backgroundColor: headerStyle.bgColor,
              color: headerStyle.textColor,
            }}
          />
        );
      })}
      {TimeUtil.generateCalendar(date).map((day, index) => {
        return (
          <Number
            key={index}
            size={numberSize}
            isSelected={!isPreview && day === date.day}
            transparent={day === 0}
            value={day}
            onClick={() => onSelectDay(day)}
          />
        );
      })}
    </div>
  );
};

export default DaySelect;
