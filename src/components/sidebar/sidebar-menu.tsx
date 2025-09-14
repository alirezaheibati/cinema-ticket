import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Clapperboard,
  Drama,
  Icon,
  LayoutDashboard,
  MonitorPlay,
  TicketCheck,
  UserRoundPen,
} from "lucide-react";
import LogoutBtn from "./logout-btn";
import SidebarRow from "./sidebar-row";
export default function SidebarMenu({
  openSidebar,
  setOpenSidebar,
  role,
}: {
  openSidebar: boolean;
  role: "user" | "admin";
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const isAdmin = role === "admin";
  const userMenuItems = [
    { title: "داشبورد", icon: <LayoutDashboard />, path: "/user/dashboard" },
    { title: "فیلم ها", icon: <Clapperboard />, path: "/user/movies" },
    { title: "رزروها", icon: <TicketCheck />, path: "/user/reserves" },
    { title: "پروفایل", icon: <UserRoundPen />, path: "/user/profile" },
  ];
  const adminMenuItems = [
    { title: "داشبورد", icon: <LayoutDashboard />, path: "/admin/dashboard" },
    { title: "فیلم", icon: <Clapperboard />, path: "/admin/movies" },
    { title: "تئاتر", icon: <Drama />, path: "/admin/theater" },
    { title: "سریال", icon: <MonitorPlay />, path: "/admin/shows" },
    { title: "رزروها", icon: <TicketCheck />, path: "/admin/reserves" },
    { title: "کاربران", icon: <UserRoundPen />, path: "/admin/users" },
  ];
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;
  return (
    <>
      <Sheet open={openSidebar} onOpenChange={(open) => setOpenSidebar(open)}>
        <SheetContent>
          <SheetTitle />
          <SheetHeader />

          <ul className="flex px-4 flex-col justify-start items-start gap-2 w-full">
            {menuItems.map((item) => (
              <SidebarRow
                key={item.path}
                title={item.title}
                path={item.path}
                icon={item.icon}
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
