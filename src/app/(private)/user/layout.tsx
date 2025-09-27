"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/ui/Logo";
import UserSidebar from "@/components/sidebar/user-sidebar";
import NavSearchBox from "@/components/header/nav-search-box";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-3 sm:px-10 py-3 border-b border-gray-100 bg-gray-50">
        <Menu
          size={30}
          className="text-popover-foreground cursor-pointer"
          onClick={() => setOpenSidebar(true)}
        />
        <NavSearchBox />
        <Logo />
      </header>
      <main>
        {openSidebar && <UserSidebar {...{ openSidebar, setOpenSidebar }} />}
        {children}
      </main>
    </>
  );
}
