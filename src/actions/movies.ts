"use server";
import { IMovie } from "@/interfaces";
import supabase from "@/config/supabase-config";

export const addMovie = async (movie: Partial<IMovie>) => {
  const { data, error } = await supabase.from("movies").insert(movie);
  if (error) {
    return {
      success: false,
      message: "ثبت فیلم انجام نشد.",
    };
  }
  return {
    success: true,
    message: "ثبت فیلم با موفقیت انجام شد.",
  };
};
export const updateMovie = async (id: string, movie: Partial<IMovie>) => {
  const { data, error } = await supabase
    .from("movies")
    .update(movie)
    .eq("id", id);
  if (error) {
    return {
      success: false,
      message: "بروزرسانی فیلم انجام نشد.",
    };
  }
  return {
    success: true,
    message: "بروزرسانی فیلم با موفقیت انجام شد.",
  };
};

export const deleteMovie = async (id: string) => {
  const { data, error } = await supabase.from("movies").delete().eq("id", id);
  if (error) {
    return {
      success: false,
      message: "حذف فیلم انجام نشد.",
    };
  }
  return {
    success: true,
    message: "حذف فیلم با موفقیت انجام شد.",
  };
};

export const getMovieById = async (id: string) => {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id);
  if (error || !data || !data[0]) {
    return {
      success: false,
      message: "فیلم مورد نظر یافت نشد.",
    };
  }
  const movie = data[0] as IMovie;
  return {
    success: true,
    message: "اطلاعات فیلم با موفقیت دریافت شد.",
    movie: movie,
  };
};

export const getAllMovies = async () => {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return {
      success: false,
      message: "دریافت لیست فیلم ها انجام نشد.",
      movies: [],
    };
  }
  return {
    success: true,
    message: "لیست فیلم ها با موفقیت دریافت شد.",
    movies: data as IMovie[],
  };
};
