import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toJalaali } from "jalaali-js";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { persianMonths } from "@/constants";
import { refundBooking } from "@/actions/bookings";
import RefundBtn from "@/components/ui/refund-btn";
import addCommasToString from "@/helpers/addCommasToPrice";
import { IBooking } from "@/interfaces";
interface BookingsTableProps {
  bookings: IBooking[];
}
export default function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <Table className="w-full min-w-2xl border" dir="rtl" align="center">
      <TableHeader>
        <TableRow className="bg-primary/20 " dir="rtl">
          <TableHead className="border font-bold w-[5%]">#</TableHead>
          <TableHead className="border font-bold w-[15%]">فیلم</TableHead>
          <TableHead className="border font-bold w-[15%]">سالن</TableHead>
          <TableHead className="border font-bold w-[15%]">سانس</TableHead>
          <TableHead className="border font-bold w-[15%]">صندلی ها</TableHead>
          <TableHead className="border font-bold w-[15%]">پرداخت شده</TableHead>
          <TableHead className="border font-bold w-[15%]">وضعیت</TableHead>
          <TableHead className="border font-bold w-[5%]">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking, idx) => {
          const date = new Date(booking.show?.date!);
          const { jy, jm, jd } = toJalaali(date);
          return (
            <TableRow
              key={booking.id}
              className="nth-of-type-[even]:bg-gray-100"
            >
              <TableCell className="font-medium border" align="center">
                {convertToPersianDigits(idx + 1)}
              </TableCell>
              <TableCell className="font-medium border" align="center">
                {booking.movie?.title}
              </TableCell>
              <TableCell className="font-medium border" align="center">
                {booking.theater?.name}
              </TableCell>
              <TableCell className="border" align="center">
                {`${convertToPersianDigits(jd)} ${
                  persianMonths[jm - 1]
                } ${convertToPersianDigits(jy)}`}
              </TableCell>
              <TableCell className="border" align="center">
                {String(
                  booking.seat_numbers.map((seat) =>
                    convertToPersianDigits(seat)
                  )
                )}
              </TableCell>
              <TableCell className="border" align="center">
                <span>
                  {addCommasToString(
                    convertToPersianDigits(booking.total_payed)
                  )}
                </span>
                <span className="text-xs mr-1">تومان</span>
              </TableCell>
              <TableCell className="border" align="center">
                <p
                  className={`${
                    booking.status === "booked"
                      ? "bg-chart-2"
                      : "bg-destructive"
                  } text-popover w-max px-4 py-1 rounded-sm text-xs`}
                >
                  {booking.status === "booked" ? "رزرو شده" : "عودت شده"}
                </p>
              </TableCell>
              <TableCell align="center">
                <RefundBtn refundFn={refundBooking} id={booking.id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
