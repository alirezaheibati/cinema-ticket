"use server";
import { ITheater } from "@/interfaces";
import supabase from "@/config/supabase-config";

export const addTheater = async (theater: Partial<ITheater>) => {
  const { data, error } = await supabase.from("theaters").insert(theater);
  if (error) {
    return {
      success: false,
      message: "ثبت سالن سینما انجام نشد.",
    };
  }
  return {
    success: true,
    message: "ثبت سالن سینما با موفقیت انجام شد.",
  };
};
export const updateTheater = async (id: string, theater: Partial<ITheater>) => {
  const { data, error } = await supabase
    .from("theaters")
    .update(theater)
    .eq("id", id);
  if (error) {
    return {
      success: false,
      message: "بروزرسانی سالن سینما انجام نشد.",
    };
  }
  return {
    success: true,
    message: "بروزرسانی سالن سینما با موفقیت انجام شد.",
  };
};

export const deleteTheater = async (id: string) => {
  const { data, error } = await supabase.from("theaters").delete().eq("id", id);
  if (error) {
    return {
      success: false,
      message: "حذف سالن سینما انجام نشد.",
    };
  }
  return {
    success: true,
    message: "حذف سالن سینما با موفقیت انجام شد.",
  };
};

export const getTheaterById = async (id: string) => {
  const { data, error } = await supabase
    .from("theaters")
    .select("*")
    .eq("id", id);
  if (error || !data || !data[0]) {
    return {
      success: false,
      message: "سالن سینما مورد نظر یافت نشد.",
    };
  }
  const theater = data[0] as ITheater;
  return {
    success: true,
    message: "اطلاعات سالن سینما با موفقیت دریافت شد.",
    theater: theater,
  };
};

export const getAllTheaters = async () => {
  const { data, error } = await supabase
    .from("theaters")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return {
      success: false,
      message: "دریافت لیست سالن سینما ها انجام نشد.",
      theaters: [],
    };
  }
  return {
    success: true,
    message: "لیست سالن سینما ها با موفقیت دریافت شد.",
    theaters: data as ITheater[],
  };
};
