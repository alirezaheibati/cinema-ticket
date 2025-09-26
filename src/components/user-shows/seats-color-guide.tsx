import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
interface SeatsColorGuideProps {
  capacity: number;
}
export default function SeatsColorGuide({
  capacity = 0,
}: SeatsColorGuideProps) {
  return (
    <div className="bg-gray-100 border-y border-y-gray-200">
      <div className=" max-w-7xl mx-auto py-4 px-2 text-sm text-popover-foreground flex justify-between items-center">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 md:gap-6">
          <div className="flex justify-start md:items-center gap-2">
            <div className="rounded-full w-5 h-5 bg-gray-400"></div>
            <span>قابل خرید</span>
          </div>
          <div className="flex justify-start md:items-center gap-2">
            <div className="rounded-full w-5 h-5 bg-chart-1"></div>
            <span>فروخته شده</span>
          </div>
          <div className="flex justify-start md:items-center gap-2">
            <div className="rounded-full w-5 h-5 bg-chart-2"></div>
            <span>انتخاب شده</span>
          </div>
        </div>
        <p>
          <span className="font-semibold ml-2">ظرفیت سالن:</span>
          <span>{convertToPersianDigits(capacity)}</span>
          <span className="text-sm mr-1">نفر</span>
        </p>
      </div>
    </div>
  );
}
