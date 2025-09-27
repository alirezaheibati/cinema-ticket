"use server";
import supabase from "@/config/supabase-config";
import { IBooking } from "@/interfaces";
import { updateShow } from "./shows";
import { revalidatePath } from "next/cache";

export const getAllBookingsOfUser = async (id: number) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, movie:movies(*), theater:theaters(*), show:shows(*)")
    .eq("user_id", id)
    .order("created_at");
  if (error) {
    return {
      success: false,
      message: "دریافت لیست سفارشات انجام نشد.",
      bookings: [],
    };
  }
  return {
    success: true,
    message: "لیست سفارشات با موفقیت دریافت شد.",
    bookings: data as IBooking[],
  };
};

export const refundBooking = async (
  id: number
): Promise<{ success: boolean; message: string }> => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, movie:movies(*), user:user_profiles(*), show:shows(*)")
    .eq("id", id);
  if (error) {
    throw new Error("عملیات انجام نشد. دقایقی بعد دوباره امتحان کنید.");
  }
  if (data && data[0]) {
    const timestamp = new Date(`${data[0].show.date}T${data[0].show.time}:00`);
    if (timestamp.getTime() < Date.now()) {
      throw new Error("مهلت مرجوع کردن بلیت سپری شده است.");
    }
    if (data[0].status !== "booked") {
      throw new Error("امکان لغو مجدد بلیت وجود ندارد.");
    }
  }
  // remove canceled seats from booked_seats column of the show
  const filterdSeats = data[0].show.booked_seats.filter(
    (seat: number) => !data[0].seat_numbers.includes(seat)
  );
  updateShow(data[0].show.id, { booked_seats: filterdSeats });
  // chenage the booking status to refund
  const { data: bookingData, error: bookingError } = await supabase
    .from("bookings")
    .update({ status: "refund" })
    .eq("id", id);

  // return booking money to user wallet
  const { data: userData, error: userError } = await supabase
    .from("user_profiles")
    .update({ wallet: (data[0].user.wallet ?? 0) + data[0].total_payed })
    .eq("id", data[0].user.id);
  if (userError) {
    throw new Error("عملیات انجام نشد. دقایقی بعد دوباره امتحان کنید.");
  }
  return {
    success: true,
    message: "عملیات با موفقیت انجام شد و هزینه به کیف پول شما منتقل شد.",
  };
};

export const makeBooking = async (booking: Partial<IBooking>) => {
  const { data, error } = await supabase.from("bookings").insert(booking);
  if (error) {
    return {
      success: false,
      message: "رزرو بلیت انجام نشد.",
    };
  }
  revalidatePath("/user/show");
  return {
    success: true,
    message: "رزرو بلیت با موفقیت انجام شد.",
  };
};
