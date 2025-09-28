import { persianMonths } from "@/constants";
import { convertTimeToPersian } from "@/helpers/convert-time-to-persian";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { IBooking } from "@/interfaces";
import { toJalaali } from "jalaali-js";
import Image from "next/image";
interface ShowInfoProps {
  booking: IBooking;
}
export default function ShowInfo({ booking }: ShowInfoProps) {
  let date = new Date();
  if (booking?.show?.date!) {
    date = new Date(booking?.show?.date);
  }
  const { jy, jm, jd } = toJalaali(date);
  return (
    <>
      <p className="font-semibold">
        <span>اطلاعات بلیت:</span>
      </p>
      <div className="flex flex-col sm:flex-row justify-start items-stretch gap-4 relative border-b border-dashed border-gray-300 py-4">
        <div className="w-32 h-32 rounded-md overflow-hidden relative shrink-0 mx-auto sm:mx-0">
          <Image
            src={booking?.movie?.poster_url!}
            alt={booking?.movie?.title!}
            fill
          />
        </div>
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2 text-popover-foreground">
            {booking?.movie?.title}
          </h2>
          <p className="text-sm mb-2">
            <span className="font-semibold ml-2 text-popover-foreground">
              سالن:
            </span>
            <span>{booking?.theater?.address!}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold ml-2 text-popover-foreground">
              شروع سانس:
            </span>
            <span>{`${convertToPersianDigits(jd)} ${
              persianMonths[jm - 1]
            } ${convertToPersianDigits(jy)}`}</span>
            {" - "}
            <span>{convertTimeToPersian(booking?.show?.time ?? "00:00")}</span>
          </p>
        </div>
      </div>
    </>
  );
}
