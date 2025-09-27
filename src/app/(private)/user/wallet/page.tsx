import { retriveLogedInUser } from "@/actions/users";
import Wallet from "./Wallet";
import cookies from "js-cookie";
import { redirect } from "next/navigation";
export default async function UserWalletPage() {
  const response = await retriveLogedInUser();
  if (!response.success) {
    cookies.remove("jwt-token");
    cookies.remove("user-role");
    redirect("/?form=login");
  }

  return <Wallet userBalance={response.user.wallet} />;
}
