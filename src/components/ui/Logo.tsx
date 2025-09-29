"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Logo() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/user-role=([^;]+)/);
    setRole(match?.[1] ?? null);
  }, []);

  const href =
    role === "user"
      ? "/user/dashboard"
      : role === "admin"
      ? "/admin/dashboard"
      : "/?form=login";

  return (
    <Link href={href}>
      <Image
        src="/assets/logo.png"
        alt="cinema ticket logo"
        width={60}
        height={60}
        title="cinema ticket logo"
      />
    </Link>
  );
}
