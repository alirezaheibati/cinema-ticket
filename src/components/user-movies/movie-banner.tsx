import { persianMonths } from "@/constants";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import mapGenre from "@/helpers/map-genre";
import { IMovie } from "@/interfaces";
import { toJalaali } from "jalaali-js";
import Image from "next/image";
interface MovieBannerProps {
  movie: IMovie;
}
export default async function MovieBanner({ movie }: MovieBannerProps) {
  const date = new Date(movie.release_date!);
  const { jy, jm, jd } = toJalaali(date);
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-sm p-4 sm:p-8 flex flex-col sm:flex-row justify-start items-stretch gap-8 text-white">
      <div className="relative w-full max-w-xs mx-auto aspect-square overflow-hidden rounded-sm">
        <Image src={movie.poster_url!} alt={movie.title!} fill />
      </div>
      <div className="w-full py-4">
        <h1 className="text-xl font-semibold mb-4 text-chart-4">
          فیلم {movie.title}
        </h1>
        <p className="text-sm text-p line-clamp-3 leading-8">
          {movie.description}
        </p>
        <p className="text-sm mt-4">
          <span className="font-semibold ml-2 text-chart-4">تاریخ انتشار:</span>
          <span>{`${convertToPersianDigits(jd)} ${
            persianMonths[jm - 1]
          } ${convertToPersianDigits(jy)}`}</span>
        </p>
        <p className="text-sm mt-3">
          <span className="font-semibold ml-2 text-chart-4">ژانر:</span>
          <span>{mapGenre(movie.genre!)}</span>
        </p>
        <p className="text-sm mt-3">
          <span className="font-semibold ml-2 text-chart-4">زمان:</span>
          <span>{convertToPersianDigits(movie.duration!)}</span>
          <span className="text-xs mr-1">دقیقه</span>
        </p>
      </div>
    </div>
  );
}
