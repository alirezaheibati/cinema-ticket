"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import RegisterForm from "../auth/Register";
import LoginFrom from "../auth/Login";
import Logo from "../ui/Logo";

export default function TopNav() {
  let form = null;
  const [sheetVisibility, setSheetVisibility] = useState(false);
  if (typeof window !== "undefined") {
    const queryString = new URLSearchParams(window.location.search);
    form = queryString.get("form");
  }
  function openSheetHandler() {
    setSheetVisibility(true);
  }
  return (
    <header className="px-10 py-5 flex justify-between items-center w-full">
      <Button variant={"secondary"} onClick={openSheetHandler}>
        ثبت نام
      </Button>
      <Logo />
      <Sheet
        open={sheetVisibility}
        onOpenChange={(open) => setSheetVisibility(open)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <div className="flex justify-center items-center h-screen flex-col">
              {form === "register" ? <RegisterForm /> : <LoginFrom />}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
