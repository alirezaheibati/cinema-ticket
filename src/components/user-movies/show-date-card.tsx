import { persianMonths } from "@/constants";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { toJalaali } from "jalaali-js";

interface ShowDateCardProps {
  day: Date;
  onActivateDay: (day: Date) => void;
  isActive: boolean;
}
export default function ShowDateCard({
  day,
  onActivateDay,
  isActive,
}: ShowDateCardProps) {
  const date = new Date(day);
  const { jy, jm, jd } = toJalaali(date);
  return (
    <button
      onClick={() => onActivateDay(day)}
      className={`${
        isActive
          ? "bg-popover-foreground text-popover"
          : "bg-gray-50 text-popover-foreground"
      }  border border-gray-200 rounded-sm p-3 cursor-pointer hover:scale-105 transition-transform`}
    >
      <span>{convertToPersianDigits(jd)}</span>
      <p>{`${persianMonths[jm - 1]} ${convertToPersianDigits(jy)}`}</p>
    </button>
  );
}
