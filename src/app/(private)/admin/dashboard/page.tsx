import { getAllBookings } from "@/actions/bookings";
import { getAdminStats } from "@/actions/stats";
import AdminBookingsTable from "@/components/admin-dashboard/admin-bookings-table";
import AdminStatsCard from "@/components/admin-dashboard/admin-stats-card";
import NotFoundWarning from "@/components/ui/not-found-warning";
import PageTitle from "@/components/ui/page-title";
import { Clapperboard, Drama, Ticket, UserCheck } from "lucide-react";

export default async function adminDashboardPage() {
  const stats = await getAdminStats();
  const bookings = await getAllBookings();

  return (
    <>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 py-8">
        <AdminStatsCard
          title="کل کاربران عضو"
          stats={stats.usersCount ?? 0}
          description="تمامی کاربرانی که در سایت ثبت نام کرده اند."
          unit="نفر"
          bgColor="bg-chart-2"
        >
          <UserCheck />
        </AdminStatsCard>
        <AdminStatsCard
          title="کل فیلم های موجود"
          stats={stats.moviesCount ?? 0}
          description="تمامی فیلم های ثبت شده در دیتابیس"
          unit="عدد"
          bgColor="bg-[#50589C]"
        >
          <Clapperboard />
        </AdminStatsCard>
        <AdminStatsCard
          title="کل سانس های موجود"
          stats={stats.showsCount ?? 0}
          description="تمامی سانس های تعریف شده در دیتابیس"
          unit="عدد"
          bgColor="bg-[#F75270]"
        >
          <Ticket />
        </AdminStatsCard>
        <AdminStatsCard
          title="کل سالن های نمایش"
          stats={stats.theatersCount ?? 0}
          description="تعداد کل سالن های تعریف شده در دیتابیس"
          unit="عدد"
          bgColor="bg-[#FF9B00]"
        >
          <Drama />
        </AdminStatsCard>
      </div>
      <div className="pb-8">
        <div className="flex py-4 mx-auto max-w-7xl justify-between items-center">
          <PageTitle title="آخرین بلیت های رزرو شده" />
        </div>
        {bookings.bookings.length < 1 ? (
          <NotFoundWarning message="هنوز بلیتی رزرو نشده است." />
        ) : (
          <div className="w-full max-w-7xl mx-auto p-4 lg:p-0 overflow-x-scroll no-scroll-bar">
            <AdminBookingsTable bookings={bookings.bookings.slice(0, 10)} />
          </div>
        )}
      </div>
    </>
  );
}
