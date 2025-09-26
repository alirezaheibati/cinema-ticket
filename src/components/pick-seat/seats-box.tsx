"use client";

import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSeatsStore } from "@/store/seats-store";
import { seat } from "@/interfaces";
import { useCartStore } from "@/store/cart-store";

interface SeatsBoxProps {
  bookedSeats: number[];
  seatsCount: number;
  price: number;
  showId: string;
}
export default function SeatsBox({
  bookedSeats,
  seatsCount,
  price,
  showId,
}: SeatsBoxProps) {
  const { seats, setSeats } = useSeatsStore();
  const { addToCart, removeFromCart, cart, setShowId } = useCartStore();

  function bookSeatHandler(id: number) {
    const updatedSeats = [...seats];
    if (updatedSeats[id].status === "sold") return;

    updatedSeats[id].status =
      updatedSeats[id].status === "available" ? "selected" : "available";

    const cartItemIndex = cart.findIndex((item) => item.seat.number === id + 1);
    if (cartItemIndex < 0) {
      addToCart({ seat: updatedSeats[id] });
      updatedSeats[id].status = "selected";
    } else {
      removeFromCart(updatedSeats[id].number);
      updatedSeats[id].status = "available";
    }

    setSeats(updatedSeats);
  }

  useEffect(() => {
    let initiateSeats: seat[] = [];
    for (let item = 0; item < seatsCount; item++) {
      if (bookedSeats.includes(item + 1)) {
        initiateSeats.push({
          status: "sold",
          number: item + 1,
          row: item < 10 ? 1 : Math.trunc((item - 10) / 16) + 2,
          price: price,
          showId: showId,
        });
      } else if (cart.map((seat) => seat.seat.number).includes(item + 1)) {
        initiateSeats.push({
          status: "selected",
          number: item + 1,
          row: item < 10 ? 1 : Math.trunc((item - 10) / 16) + 2,
          price: price,
          showId: showId,
        });
      } else {
        initiateSeats.push({
          status: "available",
          number: item + 1,
          row: item < 10 ? 1 : Math.trunc((item - 10) / 16) + 2,
          price: price,
          showId: showId,
        });
      }
    }
    setSeats(initiateSeats);
  }, []);
  return (
    <>
      <div className="w-[896px] mx-auto">
        <div className="flex flex-wrap gap-4 justify-center w-full items-start mx-auto">
          {seats.slice(0, 10).map((seat, idx) => {
            return (
              <Tooltip key={`seat-${seat.number}`}>
                <TooltipTrigger
                  className={`h-10 w-10 ${
                    seat.status === "available"
                      ? "bg-gray-400 hover:opacity-90 cursor-pointer"
                      : seat.status === "sold"
                      ? "bg-chart-1 cursor-not-allowed"
                      : "bg-chart-2 hover:opacity-90 cursor-pointer"
                  }  border rounded-full flex justify-center items-center text-popover`}
                  onClick={() => bookSeatHandler(idx)}
                >
                  <span>{convertToPersianDigits(seat.number)}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex justify-between items-center gap-4 p-2">
                    <div className="text-center">
                      <p className="mb-2">صندلی</p>
                      <p>{convertToPersianDigits(idx + 1)}</p>
                    </div>
                    <span>|</span>
                    <div className="text-center">
                      <p className="mb-2">ردیف</p>
                      <p>{convertToPersianDigits(seat.row)}</p>
                    </div>
                  </div>
                  <p className="text-center">
                    <span>{convertToPersianDigits(price)}</span>
                    <span className="text-xs mr-1">تومان</span>
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 justify-center items-start w-full mt-4 mx-auto">
          {seats.slice(10).map((seat, idx) => {
            return (
              <Tooltip key={`seat-${seat.number}`}>
                <TooltipTrigger
                  className={`h-10 w-10 ${
                    seat.status === "available"
                      ? "bg-gray-400 hover:opacity-90 cursor-pointer"
                      : seat.status === "sold"
                      ? "bg-chart-1 cursor-not-allowed"
                      : "bg-chart-2 hover:opacity-90 cursor-pointer"
                  }  border rounded-full flex justify-center items-center text-popover`}
                  onClick={() => bookSeatHandler(idx + 10)}
                >
                  <span>{convertToPersianDigits(seat.number)}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex justify-between items-center gap-4 p-2">
                    <div className="text-center">
                      <p className="mb-2">صندلی</p>
                      <p>{convertToPersianDigits(idx + 11)}</p>
                    </div>
                    <span>|</span>
                    <div className="text-center">
                      <p className="mb-2">ردیف</p>
                      <p>{convertToPersianDigits(seat.row)}</p>
                    </div>
                  </div>
                  <p className="text-center">
                    <span>{convertToPersianDigits(price)}</span>
                    <span className="text-xs mr-1">تومان</span>
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </>
  );
}
