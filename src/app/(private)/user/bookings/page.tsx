import PageTitle from "@/components/ui/page-title";
import { getAllBookingsOfUser } from "@/actions/bookings";
import { headers } from "next/headers";
import { toast } from "sonner";
import { retriveLogedInUser } from "@/actions/users";
import { redirect } from "next/navigation";
import BookingsTable from "@/components/user-dashboard/bookings-table";

export default async function UserBookingsPage() {
  const headersList = await headers();
  let userId = headersList.get("user-id");

  if (!userId || userId.trim() === "") {
    const user = await retriveLogedInUser();
    if (!user) {
      toast.error("اطلاعات کاربر یافت نشد. مجدد وارد شوید.");
      redirect("/?form=login");
    }
    userId = user.user.id;
  }

  const bookingsResponse = await getAllBookingsOfUser(+userId!);

  const { bookings } = bookingsResponse;
  return (
    <>
      <div className="flex py-4 mx-auto max-w-7xl justify-between items-center">
        <PageTitle title="بلیت های من" />
      </div>
      <div className="w-full max-w-7xl mx-auto p-4 lg:p-0 overflow-x-scroll no-scroll-bar">
        <BookingsTable bookings={bookings} />
      </div>
    </>
  );
}
