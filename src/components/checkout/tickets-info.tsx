"use client";

import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { useCartStore } from "@/store/cart-store";
import { useSeatsStore } from "@/store/seats-store";
import { useRouter } from "next/navigation";

export default function TicketsInfo() {
  const { cart } = useCartStore();
  const ticketRowsSet = new Set(cart.map((item) => item.seat.row));
  const ticketRows = Array.from(ticketRowsSet);
  const router = useRouter();
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold ">
          {convertToPersianDigits(cart.length)} صندلی برای شما
        </h3>
        <button
          className="text-sm font-semibold text-destructive cursor-pointer hover:opacity-100 opacity-90"
          onClick={() => router.back()}
        >
          تغییر صندلی
        </button>
      </div>
      <div className="bg-gray-100 p-4  rounded-sm">
        {ticketRows.map((row) => (
          <div
            key={`row-${row}`}
            className="flex justify-start items-center gap-4 mb-4 last:mb-0"
          >
            <p>
              <span className="ml-2">ردیف:</span>
              <span className="font-semibold">
                {convertToPersianDigits(row)}
              </span>
            </p>
            <p>
              <span className="ml-2">صندلی:</span>
              <span className="font-semibold">
                {cart
                  .filter((ticket) => ticket.seat.row === row)
                  .sort((a, b) => a.seat.number - b.seat.number)
                  .map((ticket) => convertToPersianDigits(ticket.seat.number))
                  .join(" , ")}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
