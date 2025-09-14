"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AdminLayout from "./admin-layout";
import UserLayout from "./user-layout";
import PrivateHeader from "@/layouts/private-header";
import { retriveLogedInUser } from "@/actions/users";
import { useUserStore } from "@/store/user-store";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { setUser } = useUserStore();
  async function retriveUser() {
    const data = await retriveLogedInUser();
    setUser(data.user);
  }
  useEffect(() => {
    retriveUser();
  }, []);
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return (
      <>
        <AdminLayout>
          <PrivateHeader />
          {children}
        </AdminLayout>
      </>
    );
  }
  if (pathname.startsWith("/user")) {
    return (
      <>
        <UserLayout>
          <PrivateHeader />
          {children}
        </UserLayout>
      </>
    );
  }
  return <>{children}</>;
}
