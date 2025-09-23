import PageTitle from "@/components/ui/page-title";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteMovie, getAllMovies } from "@/actions/movies";
import { MessageCircleWarning, SquarePen } from "lucide-react";
import { toJalaali } from "jalaali-js";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import mapGenre from "@/helpers/map-genre";
import RemoveBtn from "@/components/ui/remove-btn";
import Image from "next/image";
import { persianMonths } from "@/constants";

export default async function AdminMoviesPage() {
  const moviesResponse = await getAllMovies();
  if (!moviesResponse.success) {
    return (
      <div className="absolute flex gap-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-destructive">
        <MessageCircleWarning />
        <p className="text-lg">
          اطلاعات فیلم ها یافت نشد. لطفا لحظاتی بعد دوباره تلاش کنید.
        </p>
      </div>
    );
  }
  const movies = moviesResponse.movies;
  return (
    <>
      <div className="flex py-4 mx-auto max-w-7xl justify-between items-center">
        <PageTitle title="فیلم ها" />
        <Link
          href={"/admin/movies/add"}
          className="bg-primary text-white/90 rounded-sm px-6 py-2 active:scale-95"
        >
          افزودن فیلم
        </Link>
      </div>
      <div className="w-full max-w-7xl mx-auto p-4 lg:p-0 overflow-x-scroll no-scroll-bar">
        <Table className="w-full min-w-2xl border" dir="rtl" align="center">
          <TableHeader>
            <TableRow className="bg-primary/20 " dir="rtl">
              <TableHead className="border font-bold w-[5%]">#</TableHead>
              <TableHead className="border font-bold w-[15%]">پوستر</TableHead>
              <TableHead className="border font-bold w-[30%]">نام</TableHead>
              <TableHead className="border font-bold w-[15%]">
                تاریخ انتشار
              </TableHead>
              <TableHead className="border font-bold w-[15%]">ژانر</TableHead>
              <TableHead className="border font-bold w-[10%]">تایم</TableHead>
              <TableHead className="border font-bold w-[10%]">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie, idx) => {
              const date = new Date(movie.release_date);
              const { jy, jm, jd } = toJalaali(date);
              return (
                <TableRow
                  key={movie.id}
                  className="nth-of-type-[even]:bg-gray-100"
                >
                  <TableCell className="font-medium border" align="center">
                    {convertToPersianDigits(idx + 1)}
                  </TableCell>
                  <TableCell className="font-medium border" align="center">
                    <Image
                      className="rounded-sm "
                      src={movie.poster_url}
                      alt={movie.title}
                      width={80}
                      height={80}
                    />
                  </TableCell>
                  <TableCell className="font-medium border">
                    {movie.title}
                  </TableCell>
                  <TableCell className="border" align="center">
                    {`${convertToPersianDigits(jd)} ${
                      persianMonths[jm - 1]
                    } ${convertToPersianDigits(jy)}`}
                  </TableCell>
                  <TableCell className="border" align="center">
                    {mapGenre(movie.genre)}
                  </TableCell>
                  <TableCell className="border" align="center">
                    <span className="text-base">
                      {convertToPersianDigits(movie.duration)}
                    </span>
                    <span className="mr-1 text-[10px]">دقیقه</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={`/admin/movies/edit/${movie.id}`}
                        title="ویرایش"
                      >
                        <SquarePen size={18} />
                      </Link>
                      <RemoveBtn id={movie.id} removeFn={deleteMovie} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
