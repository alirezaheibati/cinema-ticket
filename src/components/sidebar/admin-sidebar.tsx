import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Clapperboard,
  Drama,
  LayoutDashboard,
  MonitorPlay,
  TicketCheck,
  UserRoundPen,
} from "lucide-react";
import LogoutBtn from "./logout-btn";
import SidebarRow from "./sidebar-row";
export default function AdminSidebar({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const adminMenuItems = [
    { title: "داشبورد", icon: <LayoutDashboard />, path: "/admin/dashboard" },
    { title: "فیلم ها", icon: <Clapperboard />, path: "/admin/movies" },
    { title: "سالن های سینما", icon: <Drama />, path: "/admin/theaters" },
    { title: "سانس های نمایش", icon: <MonitorPlay />, path: "/admin/shows" },
    { title: "بلیت ها", icon: <TicketCheck />, path: "/admin/bookings" },
    { title: "کاربران", icon: <UserRoundPen />, path: "#" },
  ];
  return (
    <>
      <Sheet open={openSidebar} onOpenChange={(open) => setOpenSidebar(open)}>
        <SheetContent>
          <SheetTitle />
          <SheetHeader />
          <SheetDescription />
          <ul className="flex px-4 flex-col justify-start items-start gap-2 w-full">
            {adminMenuItems.map((item) => (
              <SidebarRow
                key={item.path}
                title={item.title}
                path={item.path}
                icon={item.icon}
                onclickNavItem={setOpenSidebar}
              />
            ))}
          </ul>
          <SheetFooter>
            <LogoutBtn />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
