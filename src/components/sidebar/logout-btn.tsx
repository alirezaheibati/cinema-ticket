import { LogOut } from "lucide-react";
import cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function LogoutBtn() {
  const router = useRouter();
  function logoutHandler() {
    cookies.remove("jwt-token");
    cookies.remove("user-role");
    toast.success("با موفقیت از اکانت خود خارج شدید.");
    router.push("/?form=login");
  }
  return (
    <button
      className="w-full border cursor-pointer border-gray-500 bg-primary rounded-sm p-3 flex items-center gap-3 justify-center text-white/90 mt-4"
      onClick={logoutHandler}
    >
      <LogOut />
      {"خروج"}
    </button>
  );
}
