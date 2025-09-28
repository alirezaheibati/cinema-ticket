import addCommasToString from "@/helpers/addCommasToPrice";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { BookAlert } from "lucide-react";
import { ReactNode } from "react";

interface AdminStatsCardProps {
  children: ReactNode;
  title: string;
  stats: number;
  description: string;
  unit: string;
  bgColor: string;
}
export default function AdminStatsCard({
  children,
  title,
  stats,
  description,
  unit,
  bgColor,
}: AdminStatsCardProps) {
  return (
    <div
      className={`${bgColor} w-full rounded-sm shadow pt-8 pb-4 px-4 max-w-xs text-popover`}
    >
      <div className="flex justify-center gap-2 items-center">
        {children}
        <h2>{title}</h2>
      </div>
      <h3 className="text-center py-4">
        <span className="font-semibold text-lg ml-1">
          {unit === "تومان"
            ? addCommasToString(convertToPersianDigits(stats))
            : convertToPersianDigits(stats)}
        </span>
        <span>{unit}</span>
      </h3>
      <p className="flex justify-start items-center gap-1">
        <BookAlert size={14} />
        <span className="text-xs">{description}</span>
      </p>
    </div>
  );
}
