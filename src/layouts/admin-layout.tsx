"use client";
import { ReactNode } from "react";
import Logo from "@/components/ui/Logo";
import { Menu } from "lucide-react";
import { useState } from "react";
import AdminSidebar from "@/components/sidebar/admin-sidebar";
export default function AdminLayout({ children }: { children: ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center px-10 py-3 bg-primary">
        <div className="flex justify-start items-center gap-5">
          <Menu
            size={24}
            className="text-white/90 cursor-pointer"
            onClick={() => setOpenSidebar(true)}
          />
        </div>
        <Logo />
      </div>
      {openSidebar && <AdminSidebar {...{ openSidebar, setOpenSidebar }} />}
      {children}
    </>
  );
}
