export type TimeSuffix = "AM" | "PM";

export interface DatePicker {
  day: number;
  month: number;
  year: number;
}

export interface TimePicker {
  hour: number;
  minute: number;
}

export type TimeMode = "hour" | "minute";
