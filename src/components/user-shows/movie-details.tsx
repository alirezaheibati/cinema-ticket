import { persianMonths } from "@/constants";
import { convertTimeToPersian } from "@/helpers/convert-time-to-persian";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { IShow } from "@/interfaces";
import { toJalaali } from "jalaali-js";
import Image from "next/image";
interface MovieDetailsProps {
  show: IShow;
}
export default function MovieDetails({ show }: MovieDetailsProps) {
  const date = new Date(show?.date!);
  const { jy, jm, jd } = toJalaali(date);
  return (
    <div className="flex justify-start items-stretch gap-4 w-full lg:w-1/3 border-b md:border-b-0 sm:border-l border-dashed border-gray-500 px-2 pb-4">
      <div className="w-32 h-32 rounded-md overflow-hidden relative shrink-0">
        <Image src={show?.movie?.poster_url!} alt={show?.movie?.title!} fill />
      </div>
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-2 text-popover-foreground">
          {show?.movie?.title!}
        </h2>
        <p className="text-sm mb-2">
          <span className="font-semibold ml-2 text-popover-foreground">
            سالن:
          </span>
          <span>{show?.theater.address}</span>
        </p>
        <p className="text-sm">
          <span className="font-semibold ml-2 text-popover-foreground">
            زمان:
          </span>
          <span>{`${convertToPersianDigits(jd)} ${
            persianMonths[jm - 1]
          } ${convertToPersianDigits(jy)}`}</span>
          {" - "}
          <span>{convertTimeToPersian(show?.time!)}</span>
        </p>
      </div>
    </div>
  );
}
