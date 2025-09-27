import Link from "next/link";
import { ReactNode } from "react";
interface SuccessLinkProps {
  children: ReactNode;
  href: string;
}
export default function SuccessLink({ children, href }: SuccessLinkProps) {
  return (
    <Link
      href={href}
      className="w-full py-2 cursor-pointer flex justify-center items-center gap-2 rounded-full text-white text-sm font-medium bg-[#00798c]/90 hover:bg-[#00798c]"
    >
      {children}
    </Link>
  );
}
