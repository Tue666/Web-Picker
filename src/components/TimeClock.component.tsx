import React, { useState } from "react";
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
  callback?: (value: number, ok?: boolean) => any;
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
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { text, outline, secondary } = useTheme();
  const defaultNumberSize = numberSize || NUMBER.SIZE;
  const defaultSubNumberSize = defaultNumberSize;
  const rotateDeg = CIRCLE_DEGREE / wheel.length;

  const onPressValue = (value: number, ok: boolean = false) => {
    callback && callback(value, ok);
  };
  const onMouseDownValue = (value: number) => {
    setIsMouseDown(true);
    onPressValue(value);
  };
  const onMouseEnterValue = (value: number) => {
    if (!isMouseDown) return;
    onPressValue(value);
  };
  const onMouseUpValue = (value: number) => {
    setIsMouseDown(false);
    onPressValue(value, true);
  };
  const renderMove = (value: number, render: () => React.JSX.Element) => {
    return (
      <div
        onMouseDown={() => onMouseDownValue(value)}
        onMouseEnter={() => onMouseEnterValue(value)}
        onMouseUp={() => onMouseUpValue(value)}
      >
        {render()}
      </div>
    );
  };
  const renderNumber = (
    size: number,
    value: number,
    isSelected: boolean,
    isSub: boolean,
    display?: string
  ) => {
    return (
      <Number
        size={size}
        value={display}
        isSelected={isSelected}
        style={{
          margin: 0,
          cursor: isMouseDown ? "move" : "pointer",
          userSelect: isMouseDown ? "none" : "initial",
          backgroundColor: isSelected ? secondary.main : "transparent",
          transform: `rotate(-${value * rotateDeg}deg)`,
          color: isSelected ? secondary.contrastText : isSub ? outline : text,
        }}
        onClick={() => onPressValue(value, true)}
      />
    );
  };
  const renderLine = (size: number, isSub: boolean = false) => {
    return (
      <SectorLine
        style={{
          backgroundColor: secondary.main,
          height:
            TIME_PICKER.CLOCK_SIZE / 2 -
            (isSub ? size + defaultNumberSize : size),
          transform: `translateX(${
            size / 2 - TIME_PICKER.LINE_SIZE / 2
          }px) translateY(${size}px)`,
        }}
      />
    );
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
              zIndex:
                isMouseDown || !(isSubValueSelected || isValueSelected) ? 2 : 1,
            }}
          >
            <div className="col center">
              {renderMove(value, () => (
                <>
                  {isValueSelected && renderLine(defaultNumberSize)}
                  {renderNumber(
                    defaultNumberSize,
                    value,
                    isValueSelected,
                    false,
                    visible
                      ? zeroPrefix
                        ? NumberUtil.toZeroPrefix(value)
                        : value.toString()
                      : undefined
                  )}
                </>
              ))}
              {visible &&
                subValue !== undefined &&
                renderMove(subValue, () => (
                  <>
                    {isSubValueSelected && renderLine(defaultNumberSize, true)}
                    {renderNumber(
                      defaultSubNumberSize,
                      subValue,
                      isSubValueSelected,
                      true,
                      subZeroPrefix
                        ? NumberUtil.toZeroPrefix(subValue)
                        : subValue.toString()
                    )}
                  </>
                ))}
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
