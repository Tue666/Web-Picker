import React from "react";
import { ConstantConfig } from "../../../config";
import { useTheme } from "../../../hooks";
import { IPicker } from "../../../interfaces";
import { TimeUtil } from "../../../utils";
import Number from "../../Number.component";

const { BOX, DAYS_IN_WEEK, MODAL } = ConstantConfig;
const { DATE_PICKER } = MODAL;

interface DaySelectProps {
  date: IPicker.DatePicker;
  dateRef: IPicker.DatePicker;
  onSelectDay: (value: IPicker.DatePicker["day"]) => void;
}

const DaySelect = (props: DaySelectProps): React.JSX.Element => {
  const { date, dateRef, onSelectDay } = props;
  const { outline } = useTheme();
  const isPreview = date.month !== dateRef.month || date.year !== dateRef.year;
  const intendNumber = {
    containerWidth:
      DATE_PICKER.WIDTH - (BOX.PADDING * 2 + DATE_PICKER.PADDING * 2),
    rowSize: DAYS_IN_WEEK,
  };
  const headerStyle = {
    bgColor: "transparent",
    textColor: outline,
  };

  return (
    <div className="row row-wrap" style={{ padding: DATE_PICKER.PADDING }}>
      {DATE_PICKER.DAYS_OF_WEEK.map((day, index) => {
        return (
          <Number
            key={index}
            intend={intendNumber}
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
            intend={intendNumber}
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
