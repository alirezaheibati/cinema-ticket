import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function TopNav() {
  return (
    <header className="px-10 py-5 flex justify-between items-center w-full">
      <Button variant={"secondary"}>ثبت نام</Button>
      <Image src={"/assets/logo.png"} alt="site logo" width={60} height={60} />
    </header>
  );
}
