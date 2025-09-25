import { persianMonths } from "@/constants";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import mapGenre from "@/helpers/map-genre";
import { IMovie } from "@/interfaces";
import { toJalaali } from "jalaali-js";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  movie: IMovie;
}
export default function MovieCard({ movie }: MovieCardProps) {
  const date = new Date(movie.release_date);
  const { jy, jm, jd } = toJalaali(date);
  return (
    <Link
      href={`/user/movies/${movie.id}`}
      className="border border-gray-200 rounded-sm p-3"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-sm">
        <Image
          src={movie.poster_url}
          alt={movie.title}
          className="w-full aspect-square"
          fill
        />
      </div>
      <div>
        <h2 className="py-2 font-semibold text-chart-3">{movie.title}</h2>
        <p className="text-sm line-clamp-3 mb-3 text-muted-foreground">
          {movie.description}
        </p>
        <hr />
        <p className="mt-3 text-sm">
          <span className="font-semibold text-chart-3 ml-1">ژانر:</span>
          <span className="text-gray-700">{mapGenre(movie.genre)}</span>
        </p>
        <p className="mt-2 text-sm ">
          <span className="font-semibold text-chart-3 ml-1">تاریخ انتشار:</span>
          <span className="text-gray-700">{`${convertToPersianDigits(jd)} ${
            persianMonths[jm - 1]
          } ${convertToPersianDigits(jy)}`}</span>
        </p>
      </div>
    </Link>
  );
}
