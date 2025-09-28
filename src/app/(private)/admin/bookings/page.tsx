import PageTitle from "@/components/ui/page-title";
import { getAllBookings } from "@/actions/bookings";
import AdminBookingsTable from "@/components/admin-dashboard/admin-bookings-table";

export default async function AdminBookingsPage() {
  const bookingsResponse = await getAllBookings();

  const { bookings } = bookingsResponse;
  return (
    <>
      <div className="flex py-4 mx-auto max-w-7xl justify-between items-center">
        <PageTitle title="بلیت های رزرو شده" />
      </div>
      <div className="w-full max-w-7xl mx-auto p-4 lg:p-0 overflow-x-scroll no-scroll-bar">
        <AdminBookingsTable bookings={bookings} />
      </div>
    </>
  );
}
