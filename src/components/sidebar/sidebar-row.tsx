"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, JSX, SetStateAction } from "react";
interface sidebarRowProps {
  title: string;
  path: string;
  icon: JSX.Element;
  onclickNavItem: Dispatch<SetStateAction<boolean>>;
}
export default function SidebarRow({
  title,
  path,
  icon,
  onclickNavItem,
}: sidebarRowProps) {
  const pathname = usePathname();
  return (
    <li
      onClick={() => onclickNavItem(false)}
      className={` ${
        pathname.startsWith(path)
          ? "border border-primary bg-primary/10"
          : "border-0"
      } w-full  overflow-hidden rounded-sm p-3 `}
    >
      <Link href={path} className="flex items-center gap-3 justify-start">
        <p>{icon}</p>
        <p>{title}</p>
      </Link>
    </li>
  );
}
