import { convertToPersianDigits } from "./convertToPersianDigits";

export const convertTimeToPersian = (time: string): string => {
  const timeArr = time.split("");
  return timeArr
    .map((item) => {
      if (item === ":") return ":";
      return convertToPersianDigits(+item);
    })
    .join("");
};
