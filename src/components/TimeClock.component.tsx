import React from "react";
import styled from "styled-components";
import { ConstantConfig } from "../config";
import { useTheme } from "../hooks";
import { NumberUtil } from "../utils";
import Number from "./Number.component";

const { BOX, MODAL, NUMBER } = ConstantConfig;
const { TIME_PICKER } = MODAL;

const CIRCLE_DEGREE = 360;

interface WheelValue {
  value: number;
  subValue?: number;
  visible?: boolean;
}

interface TimeClockProps {
  selected?: number;
  wheel: WheelValue[];
  numberSize?: number;
  zeroPrefix?: boolean;
  subZeroPrefix?: boolean;
  callback?: (value: number) => any;
}

const TimeClock = (props: TimeClockProps): React.JSX.Element => {
  const {
    selected,
    wheel,
    numberSize,
    zeroPrefix = true,
    subZeroPrefix = true,
    callback,
  } = props;
  const { text, outline, secondary } = useTheme();
  const defaultNumberSize = numberSize || NUMBER.SIZE;
  const defaultSubNumberSize = defaultNumberSize;
  const rotateDeg = CIRCLE_DEGREE / wheel.length;

  const onPressValue = (value: number) => {
    callback && callback(value);
  };
  return (
    <Root>
      <Dot style={{ backgroundColor: secondary.main }} />
      {wheel.map((item, index) => {
        const { value, subValue, visible = true } = item;
        const isValueSelected = value === selected;
        const isSubValueSelected =
          subValue !== undefined && subValue === selected;

        return (
          <Sector
            key={index}
            style={{
              transform: `translateX(${
                (defaultNumberSize / 2) * -1
              }px) rotate(${value * rotateDeg}deg)`,
              zIndex: visible ? value + 2 : 1,
            }}
          >
            <div className="col center">
              <div>
                {isValueSelected && (
                  <SectorLine
                    style={{
                      backgroundColor: secondary.main,
                      height: TIME_PICKER.CLOCK_SIZE / 2 - defaultNumberSize,
                      transform: `translateX(${
                        defaultNumberSize / 2 - TIME_PICKER.LINE_SIZE / 2
                      }px) translateY(${defaultNumberSize}px)`,
                    }}
                  />
                )}
                <Number
                  size={defaultNumberSize}
                  value={
                    visible
                      ? zeroPrefix
                        ? NumberUtil.toZeroPrefix(value)
                        : value
                      : undefined
                  }
                  isSelected={isValueSelected}
                  style={{
                    margin: 0,
                    backgroundColor: isValueSelected
                      ? secondary.main
                      : "transparent",
                    transform: `rotate(-${value * rotateDeg}deg)`,
                    color: isValueSelected ? secondary.contrastText : text,
                  }}
                  onClick={() => onPressValue(value)}
                />
              </div>
              {visible && subValue !== undefined && (
                <div>
                  {isSubValueSelected && (
                    <SectorLine
                      style={{
                        backgroundColor: secondary.main,
                        height:
                          TIME_PICKER.CLOCK_SIZE / 2 -
                          (defaultNumberSize + defaultSubNumberSize),
                        transform: `translateX(${
                          defaultSubNumberSize / 2 - TIME_PICKER.LINE_SIZE / 2
                        }px) translateY(${defaultSubNumberSize}px)`,
                      }}
                    />
                  )}
                  <Number
                    size={defaultSubNumberSize}
                    value={
                      subZeroPrefix
                        ? NumberUtil.toZeroPrefix(subValue)
                        : subValue
                    }
                    style={{
                      margin: 0,
                      backgroundColor: isSubValueSelected
                        ? secondary.main
                        : "transparent",
                      transform: `rotate(-${value * rotateDeg}deg)`,
                      color: isSubValueSelected
                        ? secondary.contrastText
                        : outline,
                    }}
                    onClick={() => onPressValue(subValue)}
                  />
                </div>
              )}
            </div>
          </Sector>
        );
      })}
    </Root>
  );
};

const Root = styled("div")`
  position: relative;
  width: ${TIME_PICKER.CLOCK_SIZE}px;
  height: ${TIME_PICKER.CLOCK_SIZE}px;
  border-radius: 50%;
  margin-block: ${BOX.MARGIN}px;
`;

const Dot = styled("div")`
  position: absolute;
  width: ${TIME_PICKER.DOT_SIZE}px;
  height: ${TIME_PICKER.DOT_SIZE}px;
  border-radius: 50%;
  top: ${TIME_PICKER.CLOCK_SIZE / 2}px;
  left: ${TIME_PICKER.CLOCK_SIZE / 2}px;
  transform: translateX(${(TIME_PICKER.DOT_SIZE / 2) * -1}px)
    translateY(${(TIME_PICKER.DOT_SIZE / 2) * -1}px);
`;

const Sector = styled("div")`
  position: absolute;
  height: ${TIME_PICKER.CLOCK_SIZE / 2}px;
  left: ${TIME_PICKER.CLOCK_SIZE / 2}px;
  transform-origin: bottom center;
`;

const SectorLine = styled("div")`
  position: absolute;
  width: ${TIME_PICKER.LINE_SIZE}px;
`;

export default TimeClock;
