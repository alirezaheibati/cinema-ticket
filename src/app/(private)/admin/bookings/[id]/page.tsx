import { getBookingById } from "@/actions/bookings";
import InvoiceDetails from "@/components/admin-bookings/invoice-details";
import ShowInfo from "@/components/admin-bookings/show-info";
import TicketInfo from "@/components/admin-bookings/ticket-info";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import CancelBookingBtn from "@/components/admin-bookings/cancel-booking-btn";
import NotFoundWarning from "@/components/ui/not-found-warning";

interface SingleBookingPageProps {
  params: Promise<{ id: number }>;
}

export default async function SingleBookingPage({
  params,
}: SingleBookingPageProps) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking.booking) {
    return (
      <div className="mx-auto max-w-7xl py-8 px-4">
        <NotFoundWarning message="اطلاعات یافت نشد. لطفا دقایقی بعد مجددا تلاش نمایید." />
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-7xl py-8">
      <header className="flex justify-between items-center">
        <p className="pb-4 font-semibold">
          <span className="ml-1">شماره فاکتور:</span>
          <span>{convertToPersianDigits(id)}</span>
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8 ">
        <div className="p-4 lg:col-span-2 border border-gray-200 rounded-sm">
          {/* purchased info section */}
          <div>
            {/* show info */}
            <ShowInfo booking={booking.booking!} />
            {/* tickets info */}
            <TicketInfo booking={booking.booking!} />
          </div>
        </div>

        {/* invoice summary */}
        <div>
          <div className="p-4 border border-gray-200 rounded-sm">
            {/* factor */}
            <InvoiceDetails booking={booking.booking!} />
            {/* refun btn */}
            <CancelBookingBtn
              status={booking.booking?.status!}
              id={booking.booking?.id!}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
