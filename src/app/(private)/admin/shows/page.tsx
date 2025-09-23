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
import { MessageCircleWarning, SquarePen } from "lucide-react";
import { toJalaali } from "jalaali-js";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import RemoveBtn from "@/components/ui/remove-btn";
import { deleteShow, getAllShows } from "@/actions/shows";
import { persianMonths } from "@/constants";
export default async function AdminShowsPage() {
  const showsResponse = await getAllShows();
  if (!showsResponse.success) {
    return (
      <div className="absolute flex gap-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-destructive">
        <MessageCircleWarning />
        <p className="text-lg">
          اطلاعات سانس ها یافت نشد. لطفا لحظاتی بعد دوباره تلاش کنید.
        </p>
      </div>
    );
  }
  const shows = showsResponse.shows;
  return (
    <>
      <div className="flex py-4 mx-auto max-w-7xl justify-between items-center">
        <PageTitle title="سانس ها" />
        <Link
          href={"/admin/shows/add"}
          className="bg-primary text-white/90 rounded-sm px-6 py-2 active:scale-95"
        >
          افزودن سانس نمایش
        </Link>
      </div>
      <div className="w-full max-w-7xl mx-auto p-4 lg:p-0 overflow-x-scroll no-scroll-bar">
        <Table className="w-full min-w-2xl border" dir="rtl" align="center">
          <TableHeader>
            <TableRow className="bg-primary/20 " dir="rtl">
              <TableHead className="border font-bold w-[5%]">#</TableHead>
              <TableHead className="border font-bold w-[20%]">فیلم</TableHead>
              <TableHead className="border font-bold w-[15%]">
                سالن نمایش
              </TableHead>
              <TableHead className="border font-bold w-[15%]">تاریخ</TableHead>
              <TableHead className="border font-bold w-[15%]">ساعت</TableHead>
              <TableHead className="border font-bold w-[10%]">قیمت</TableHead>
              <TableHead className="border font-bold w-[10%]">
                ظرفیت موجود
              </TableHead>
              <TableHead className="border font-bold w-[10%]">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shows.map((show, idx) => {
              const date = new Date(show.date);
              const { jy, jm, jd } = toJalaali(date);
              return (
                <TableRow
                  key={show.id}
                  className="nth-of-type-[even]:bg-gray-100"
                >
                  <TableCell className="font-medium border" align="center">
                    {convertToPersianDigits(idx + 1)}
                  </TableCell>
                  <TableCell className="font-medium border" align="center">
                    {show.movie?.title}
                  </TableCell>
                  <TableCell className="font-medium border" align="center">
                    {show.theater?.name}
                  </TableCell>
                  <TableCell className="border" align="center">
                    {`${convertToPersianDigits(jd)} ${
                      persianMonths[jm - 1]
                    } ${convertToPersianDigits(jy)}`}
                  </TableCell>
                  <TableCell className="font-medium border" align="center">
                    {show.time}
                  </TableCell>
                  <TableCell className="border" align="center">
                    <span className="text-base">
                      {convertToPersianDigits(show.ticket_price)}
                    </span>
                    <span className="mr-1 text-[10px]">تومان</span>
                  </TableCell>
                  <TableCell className="border" align="center">
                    <span className="text-base">
                      {convertToPersianDigits(show.available_seats_count)}
                    </span>
                    <span className="mr-1 text-[10px]">نفر</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={`/admin/shows/edit/${show.id}`}
                        title="ویرایش"
                      >
                        <SquarePen size={18} />
                      </Link>
                      <RemoveBtn id={show.id} removeFn={deleteShow} />
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
