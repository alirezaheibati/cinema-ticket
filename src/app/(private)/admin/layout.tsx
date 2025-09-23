"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import AdminSidebar from "@/components/sidebar/admin-sidebar";
import Logo from "@/components/ui/Logo";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-10 py-3 border-b border-gray-100 bg-gray-50">
        <Menu
          size={30}
          className="text-popover-foreground cursor-pointer"
          onClick={() => setOpenSidebar(true)}
        />
        <Logo />
      </header>
      <main>
        {openSidebar && <AdminSidebar {...{ openSidebar, setOpenSidebar }} />}
        {children}
      </main>
    </>
  );
}
