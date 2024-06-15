import React from "react";
import styled from "styled-components";
import { ConstantConfig } from "../../../config";
import { IPicker } from "../../../interfaces";
import Number from "../../Number.component";

const { BOX, MODAL, SCROLLBAR_WIDTH } = ConstantConfig;
const { DATE_PICKER } = MODAL;

interface YearSelectProps {
  height: number;
  year: IPicker.DatePicker["year"];
  onToggleVisibleYear: () => void;
  onSelectDate: (date: Partial<IPicker.DatePicker>) => void;
}

const YearSelect = (props: YearSelectProps): React.JSX.Element => {
  const { height, year, onToggleVisibleYear, onSelectDate } = props;
  const intendNumber = {
    containerWidth: DATE_PICKER.WIDTH - BOX.PADDING * 2 - SCROLLBAR_WIDTH,
    rowSize: DATE_PICKER.YEARS_IN_ROW,
  };

  const onPressSelectYear = (year: IPicker.DatePicker["year"]) => {
    onSelectDate({ year });
    onToggleVisibleYear();
  };
  return (
    <Root
      className="row row-wrap"
      style={{ maxHeight: height - DATE_PICKER.MARGIN * 2 }}
    >
      {DATE_PICKER.YEARS.map((value) => {
        return (
          <Number
            key={value}
            intend={intendNumber}
            isSelected={value === year}
            value={value}
            style={{
              borderRadius: BOX.BORDER_RADIUS * 2,
              height: "auto",
              padding: BOX.PADDING / 2,
            }}
            onClick={() => onPressSelectYear(value)}
          />
        );
      })}
    </Root>
  );
};

const Root = styled("div")`
  overflow: scroll;
  margin-block: ${DATE_PICKER.MARGIN}px;
`;

export default YearSelect;
