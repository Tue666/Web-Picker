class NumberUtil {
  static toZeroPrefix(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}

export default NumberUtil;
