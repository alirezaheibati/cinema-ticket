"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AdminLayout from "./admin-layout";
import UserLayout from "./user-layout";
import PrivateHeader from "@/layouts/private-header";
import { retriveLogedInUser } from "@/actions/users";
import { useUserStore } from "@/store/user-store";
import cookies from "js-cookie";
import { toast } from "sonner";
export default function MainLayout({ children }: { children: ReactNode }) {
  const { setUser, user } = useUserStore();
  const router = useRouter();
  async function retriveUser() {
    try {
      if (!user) {
        const data = await retriveLogedInUser();
        if (!data.success) {
          throw new Error("اطلاعات حساب یافت نشد. دوباره لاگین کنید.");
        }
        setUser(data.user);
      }
    } catch (err: any) {
      toast.error(err.message);
      cookies.remove("jwt-token");
      cookies.remove("user-role");
      setTimeout(() => {
        router.push("/?form=login");
      }, 3000);
    }
  }
  useEffect(() => {
    retriveUser();
  }, [user]);
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
