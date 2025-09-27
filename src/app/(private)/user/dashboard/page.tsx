import { BadgeDollarSign, Clapperboard, TicketCheck } from "lucide-react";
import PageTitle from "@/components/ui/page-title";
import { getAllBookingsOfUser } from "@/actions/bookings";
import NotFoundWarning from "@/components/ui/not-found-warning";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import StatisticsCard from "@/components/user-dashboard/stats-card";
import BookingsTable from "@/components/user-dashboard/bookings-table";
import { retriveLogedInUser } from "@/actions/users";

export default async function userDashboardPage() {
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
  const moviesCount = new Set(bookings.map((booking) => booking.movie_id)).size;
  const totalPayed = bookings.reduce(
    (total, booking) => booking.total_payed + total,
    0
  );

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-0 pb-8 sm:pb-16">
      <div className="flex flex-col py-8 sm:flex-row flex-wrap justify-center items-center gap-4">
        <StatisticsCard
          title="بلیت های خریداری شده"
          stats={bookings.length}
          description="تعداد کل بلیت های خریداری شده شما"
          unit="عدد"
        >
          <TicketCheck />
        </StatisticsCard>
        <StatisticsCard
          title="فیلم های دیده شده"
          stats={moviesCount}
          description="تعداد کل فیلم های دیده شده شما"
          unit="فیلم"
        >
          <Clapperboard />
        </StatisticsCard>
        <StatisticsCard
          title="مبلغ پرداخت شده"
          stats={totalPayed}
          description="جمع کل مبلغ بلیت های خریداری شده"
          unit="تومان"
        >
          <BadgeDollarSign />
        </StatisticsCard>
      </div>
      <div>
        <div className="flex py-4 mx-auto max-w-7xl justify-between items-center">
          <PageTitle title="آخرین بلیت های من" />
        </div>
        {bookings.length < 1 ? (
          <NotFoundWarning message="شما تا کنون بلیت رزرو نکرده اید." />
        ) : (
          <div className="w-full max-w-7xl mx-auto p-4 lg:p-0 overflow-x-scroll no-scroll-bar">
            <BookingsTable bookings={bookings.slice(0, 10)} />
          </div>
        )}
      </div>
    </section>
  );
}
