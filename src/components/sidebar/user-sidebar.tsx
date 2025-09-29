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
  LayoutDashboard,
  TicketCheck,
  UserRoundPen,
} from "lucide-react";
import LogoutBtn from "./logout-btn";
import SidebarRow from "./sidebar-row";
export default function UserSidebar({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userMenuItems = [
    { title: "داشبورد", icon: <LayoutDashboard />, path: "/user/dashboard" },
    { title: "فیلم ها", icon: <Clapperboard />, path: "/user/movies" },
    { title: "بلیت های من", icon: <TicketCheck />, path: "/user/bookings" },
    { title: "کیف پول", icon: <UserRoundPen />, path: "/user/wallet" },
  ];
  return (
    <>
      <Sheet open={openSidebar} onOpenChange={(open) => setOpenSidebar(open)}>
        <SheetContent>
          <SheetTitle />
          <SheetHeader />
          <SheetDescription />
          <ul className="flex px-4 flex-col justify-start items-start gap-2 w-full">
            {userMenuItems.map((item) => (
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
