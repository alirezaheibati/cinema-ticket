import { convertTimeToPersian } from "@/helpers/convert-time-to-persian";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { IShow } from "@/interfaces";
import Link from "next/link";
interface BookShowCardProps {
  show: IShow;
}
export default function BookShowCard({ show }: BookShowCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-4 w-full md:w-1/2 last:md:w-[calc(50%-12px)]">
      <p className="mb-2">
        <span className="ml-2 font-semibold">شروع سانس:</span>
        <span className="text-muted-foreground">
          {convertTimeToPersian(show.time)}
        </span>
      </p>
      <p>
        <span className="ml-2 font-semibold">قیمت بلیط:</span>
        <span className="text-muted-foreground">
          {convertToPersianDigits(show.ticket_price)}
          <span className="text-xs text-muted-foreground pr-1">تومان</span>
        </span>
      </p>
      <Link
        href={`/user/show/${show.id}`}
        className="block text-center mt-4 w-full py-2 bg-destructive/90 cursor-pointer rounded-sm hover:bg-destructive text-popover"
      >
        انتخاب صندلی
      </Link>
    </div>
  );
}
