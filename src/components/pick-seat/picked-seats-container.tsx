"use client";

import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { useCartStore } from "@/store/cart-store";
import { useSeatsStore } from "@/store/seats-store";
import { X } from "lucide-react";

export default function PickedSeatsContainer() {
  const { cart, removeFromCart } = useCartStore();
  const { makeSeatAvailable } = useSeatsStore();
  function ticketRemoveHandler(seatNumber: number) {
    removeFromCart(seatNumber);
    makeSeatAvailable(seatNumber);
  }
  return (
    <div className="w-full md:w-2/3 flex justify-start items-center gap-2 flex-wrap px-2 py-6 md:py-0">
      {cart.length < 1 ? (
        <p className="text-sm">هنوز بلیتی را انتخاب نکرده‌اید!</p>
      ) : (
        cart.map((item) => (
          <div
            key={`seat${item.seat.number}-row${item.seat.row}`}
            className="bg-gray-300 rounded-full py-2 px-3 text-sm flex justify-start items-center gap-2 hover:opacity-90"
          >
            <span>ردیف</span>
            <span>{convertToPersianDigits(item.seat.row)}</span>
            <span>-</span>
            <span>صندلی</span>
            <span>{convertToPersianDigits(item.seat.number)}</span>
            <button
              className="rounded-full border cursor-pointer p-0.5 border-popover-foreground"
              onClick={() => ticketRemoveHandler(item.seat.number)}
            >
              <X size={12} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
