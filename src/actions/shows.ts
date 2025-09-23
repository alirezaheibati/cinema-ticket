"use server";
import { IShow } from "@/interfaces";
import supabase from "@/config/supabase-config";

export const addShow = async (show: Partial<IShow>) => {
  const { data, error } = await supabase.from("shows").insert(show);
  if (error) {
    return {
      success: false,
      message: "ثبت سانس انجام نشد.",
    };
  }
  return {
    success: true,
    message: "ثبت سانس با موفقیت انجام شد.",
  };
};

export const updateShow = async (id: string, show: Partial<IShow>) => {
  const { data, error } = await supabase
    .from("shows")
    .update(show)
    .eq("id", id);
  if (error) {
    return {
      success: false,
      message: "بروزرسانی سانس انجام نشد.",
    };
  }
  return {
    success: true,
    message: "بروزرسانی سانس با موفقیت انجام شد.",
  };
};

export const deleteShow = async (id: string) => {
  const { data, error } = await supabase.from("shows").delete().eq("id", id);
  if (error) {
    return {
      success: false,
      message: "حذف سانس انجام نشد.",
    };
  }
  return {
    success: true,
    message: "حذف سانس با موفقیت انجام شد.",
  };
};

export const getShowById = async (id: string) => {
  const { data, error } = await supabase
    .from("shows")
    .select("*, movie:movies(*), theater:theaters(*)")
    .eq("id", id);
  if (error || !data || !data[0]) {
    return {
      success: false,
      message: "سانس مورد نظر یافت نشد.",
    };
  }
  const show = data[0] as IShow;
  return {
    success: true,
    message: "اطلاعات سانس با موفقیت دریافت شد.",
    show: show,
  };
};

export const getAllShows = async () => {
  const { data, error } = await supabase
    .from("shows")
    .select("*, movie:movies(*), theater:theaters(*)")
    .order("created_at", { ascending: false });
  if (error) {
    return {
      success: false,
      message: "دریافت لیست سانس ها انجام نشد.",
      shows: [],
    };
  }
  return {
    success: true,
    message: "لیست سانس ها با موفقیت دریافت شد.",
    shows: data as IShow[],
  };
};

export const getShowsOfMovie = async (id: string) => {
  const { data, error } = await supabase
    .from("shows")
    .select("*, movie:movies(*), theater:theaters(*)")
    .eq("movie_id", id)
    .order("date");
  if (error) {
    return {
      success: false,
      message: "دریافت لیست سانس ها انجام نشد.",
      shows: [],
    };
  }
  return {
    success: true,
    message: "لیست سانس ها با موفقیت دریافت شد.",
    shows: data as IShow[],
  };
};
