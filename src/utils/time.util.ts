import { ConstantConfig } from "../config";
import { IPicker } from "../interfaces";
import NumberUtil from "./number.util";

const { MONTHS_IN_YEAR, MODAL } = ConstantConfig;
const { DATE_PICKER } = MODAL;

class TimeUtil {
  static isOutRangeOfYear(year: IPicker.DatePicker["year"]) {
    return (
      year < DATE_PICKER.YEARS[0] ||
      year > DATE_PICKER.YEARS[DATE_PICKER.YEARS.length - 1]
    );
  }

  static isMaxAvailableYear(
    month: IPicker.DatePicker["month"],
    year: IPicker.DatePicker["year"]
  ) {
    return (
      month >= MONTHS_IN_YEAR &&
      year >= DATE_PICKER.YEARS[DATE_PICKER.YEARS.length - 1]
    );
  }

  static isMinAvailableYear(
    month: IPicker.DatePicker["month"],
    year: IPicker.DatePicker["year"]
  ) {
    return month <= 1 && year <= DATE_PICKER.YEARS[0];
  }

  static toMonthText(month: IPicker.DatePicker["month"]): string {
    const monthIndex = month - 1;
    const monthText = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (monthIndex <= 0) return monthText[0];
    return monthText[monthIndex];
  }

  static jumpMonth(
    month: IPicker.DatePicker["month"],
    year: IPicker.DatePicker["year"],
    step: number = 1
  ): Partial<IPicker.DatePicker> {
    const date: Partial<IPicker.DatePicker> = {};
    const intendMonth = month + step;

    // Case next year
    if (intendMonth > MONTHS_IN_YEAR) {
      date.month = intendMonth % MONTHS_IN_YEAR; // Number of months remaining after dividing by MONTHS_IN_YEAR
      date.year = year + Math.floor(intendMonth / MONTHS_IN_YEAR); // The number of years increases in multiples of MONTHS_IN_YEAR
      return date;
    }

    // Case previous year
    if (intendMonth < 1) {
      let diffYear = Math.floor(Math.abs(step) / MONTHS_IN_YEAR); // Number of years to go back
      let newMonth = month - (Math.abs(step) % MONTHS_IN_YEAR); // New month

      if (newMonth <= 0) {
        diffYear += 1;
        newMonth += MONTHS_IN_YEAR;
      }

      date.month = newMonth;
      date.year = year - diffYear;
      return date;
    }

    // New month exceeds available year, return nothing
    if (date.year && TimeUtil.isOutRangeOfYear(date.year)) return {};

    // Otherwise, jump month only
    date.month = intendMonth;
    return date;
  }

  static daysInMonth(
    month: IPicker.DatePicker["month"],
    year: IPicker.DatePicker["year"]
  ): number {
    return new Date(year, month, 0).getDate();
  }

  static firstDayOfMonth(
    month: IPicker.DatePicker["month"],
    year: IPicker.DatePicker["year"]
  ): number {
    // Return value from 0 to 6 corresponding day in week (Sunday - Saturday)
    return new Date(year, month - 1, 1).getDay();
  }

  static generateCalendar(
    date: IPicker.DatePicker
  ): IPicker.DatePicker["day"][] {
    const { month, year } = date;
    const daysInMonth = TimeUtil.daysInMonth(month, year);
    const firstDayOfMonth = TimeUtil.firstDayOfMonth(month, year);

    return [
      ...Array(firstDayOfMonth).fill(0),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
  }

  static toDatePickerText(date?: IPicker.DatePicker): string {
    if (!date) return "";

    const { day, month, year } = date;
    return `${NumberUtil.toZeroPrefix(day)}/${NumberUtil.toZeroPrefix(
      month
    )}/${year}`;
  }

  static toTimePickerText(time?: IPicker.TimePicker): string {
    if (!time) return "";

    let { hour, minute } = time;
    let suffix: IPicker.TimeSuffix = "AM";

    if (hour >= 12) {
      suffix = "PM";
      hour -= 12;
    }

    if (hour === 0) {
      hour = 12;
    }

    return `${NumberUtil.toZeroPrefix(hour)}:${NumberUtil.toZeroPrefix(
      minute
    )} ${suffix}`;
  }
}

export default TimeUtil;
