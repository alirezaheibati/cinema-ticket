"use client";
import SidebarMenu from "@/components/sidebar/sidebar-menu";
import Logo from "@/components/ui/Logo";
import { useUserStore } from "@/store/user-store";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function PrivateHeader() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useUserStore();
  const role = user?.role ?? "user";
  return (
    <>
      <div className="flex justify-between items-center px-10 py-3 bg-primary">
        <div className="flex justify-start items-center gap-5">
          <Menu
            size={24}
            className="text-white/90 cursor-pointer"
            onClick={() => setOpenSidebar(true)}
          />
          <h2 className="text-lg text-white/90">{user?.name}</h2>
        </div>
        <Logo />
      </div>
      {openSidebar && (
        <SidebarMenu {...{ openSidebar, setOpenSidebar, role }} />
      )}
    </>
  );
}
