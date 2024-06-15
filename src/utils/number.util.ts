import { ConstantConfig } from "../config";

const { NUMBER } = ConstantConfig;

class NumberUtil {
  static toZeroPrefix(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  static calculateNumberSize(containerWidth: number, row: number): number {
    return Math.floor((containerWidth - row * NUMBER.MARGIN * 2) / row);
  }
}

export default NumberUtil;
