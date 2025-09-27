"use client";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { useEffect, useState } from "react";
import { getShowById, updateShow } from "@/actions/shows";
import { IBooking, IShow } from "@/interfaces";
import { useCartStore } from "@/store/cart-store";
import { retriveLogedInUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { makeBooking } from "@/actions/bookings";

export default function ConfirmBookingBtn() {
  const router = useRouter();
  const { cart, resetCart } = useCartStore();
  const [show, setShow] = useState<IShow>();
  const [userId, setUserId] = useState<string>();

  const ticketsTotal = cart.reduce((total, item) => item.seat.price + total, 0);
  const totalPayed = ticketsTotal + ticketsTotal * 0.1 + ticketsTotal * 0.04;
  const showId = cart[0].seat.showId;

  useEffect(() => {
    async function getShowInfo() {
      const show = await getShowById(showId);
      const user = await retriveLogedInUser();
      setUserId(user.user.id);
      setShow(show.show);
    }
    getShowInfo();
  }, []);
  const bookingInfo: Partial<IBooking> = {
    user_id: +userId!,
    movie_id: show?.movie_id!,
    theater_id: show?.theater_id!,
    show_id: +show?.id!,
    seat_numbers: cart.map((item) => item.seat.number),
    total_payed: totalPayed,
    status: "booked",
  };

  async function bookTicketHandler() {
    console.log(bookingInfo);

    if (!userId || !show) {
      toast.error("رزرو انجام نشد. دوباره سعی کنید.");
      return;
    }
    const newReservedSeats = [
      ...show.booked_seats,
      ...cart.map((item) => item.seat.number),
    ];
    const thaeterUpdateResponse = await updateShow(String(show.id!), {
      booked_seats: newReservedSeats,
    });
    const booking = await makeBooking(bookingInfo);
    resetCart();
    router.push("/user/success");
  }
  return (
    <button
      className=" flex justify-between items-center bg-destructive cursor-pointer disabled:cursor-not-allowed text-popover rounded-sm w-full py-4 px-3 mt-6 text-sm disabled:bg-gray-300 disabled:text-popover-foreground"
      onClick={bookTicketHandler}
    >
      <span>پرداخت و دریافت بلیت</span>
      <p>
        <span>{convertToPersianDigits(totalPayed)}</span>
        <span className="text-sm mr-1">تومان</span>
      </p>
    </button>
  );
}
