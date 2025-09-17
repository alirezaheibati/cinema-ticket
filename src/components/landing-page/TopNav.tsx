"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import RegisterForm from "../auth/Register";
import LoginFrom from "../auth/Login";
import Logo from "../ui/Logo";
import { useSearchParams } from "next/navigation";

export default function TopNav() {
  const [activeFrom, setActiveForm] = useState<"login" | "register">();
  const [sheetVisibility, setSheetVisibility] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const searchParam =
      searchParams.get("form") === "login"
        ? "login"
        : searchParams.get("form") === "register"
        ? "register"
        : "login";

    setActiveForm(searchParam);
  }, [searchParams]);
  function openSheetHandler() {
    setSheetVisibility(true);
  }
  return (
    <header className="px-10 py-5 flex justify-between items-center w-full">
      <Button variant={"secondary"} onClick={openSheetHandler}>
        ثبت نام / ورود
      </Button>
      <Logo />
      <Sheet
        open={sheetVisibility}
        onOpenChange={(open) => setSheetVisibility(open)}
      >
        <SheetContent className="">
          <SheetHeader>
            <SheetDescription />
            <SheetTitle></SheetTitle>
            <div className="flex justify-center items-center h-screen flex-col">
              {activeFrom === "register" ? <RegisterForm /> : <LoginFrom />}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
