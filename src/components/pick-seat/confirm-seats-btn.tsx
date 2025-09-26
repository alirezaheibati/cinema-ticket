"use client";

import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";

export default function ConfirmSeatsBtn() {
  const router = useRouter();
  function btnClickHandler() {
    router.push("/user/checkout");
  }
  const { cart } = useCartStore();
  return (
    <div className="max-w-7xl mx-auto flex justify-end items-center px-2">
      <button
        onClick={btnClickHandler}
        disabled={cart.length < 1}
        className="bg-destructive cursor-pointer disabled:cursor-not-allowed text-popover rounded-sm px-6 py-3 text-sm disabled:bg-gray-300 disabled:text-popover-foreground"
      >
        ثبت صندلی و نمایش جزئیات
      </button>
    </div>
  );
}
