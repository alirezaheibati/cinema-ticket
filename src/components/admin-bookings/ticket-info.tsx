import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { IBooking } from "@/interfaces";
interface TicketInfoProps {
  booking: IBooking;
}
export default function TicketInfo({ booking }: TicketInfoProps) {
  return (
    <div className="mt-4">
      <p className="mb-4">
        <span className="font-semibold ml-2 text-popover-foreground">
          رزرو کننده بلیت:
        </span>
        <span>{booking?.user?.name!}</span>
      </p>
      <p className="mb-4">
        <span className="font-semibold ml-1">
          {convertToPersianDigits(booking?.seat_numbers?.length!)}
        </span>
        صندلی رزرو شده است.
      </p>
      <div className="bg-gray-100 p-4  rounded-sm">
        <p>
          <span className="ml-2">صندلی:</span>
          <span className="font-semibold">
            {booking?.seat_numbers
              .sort((a, b) => a - b)
              .map((ticket) => convertToPersianDigits(ticket))
              .join(" , ")}
          </span>
        </p>
      </div>
    </div>
  );
}
