"use server";
import supabase from "@/config/supabase-config";
import { IUser } from "@/interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async function (payload: Partial<IUser>) {
  // check if user already exists
  const { data: userAlreadyExists, error: userExistsError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", payload.email);

  if (userAlreadyExists && userAlreadyExists.length > 0) {
    return {
      success: false,
      message: "این ایمیل قبلا در سیستم ثبت نام کرده است.",
    };
  }
  // hash the password
  payload.password = await bcrypt.hash(payload.password!, 10);

  const { error, data } = await supabase
    .from("user_profiles")
    .insert([payload])
    .select("id");
  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }
  const jwtToken = jwt.sign({ userId: data[0].id }, process.env.JWT_SECREC!, {
    expiresIn: "1d",
  });
  return {
    success: true,
    message: "ثبت نام شما با موفقیت انجام شد.",
    data: jwtToken,
  };
};

export const loginUser = async function name(payload: Partial<IUser>) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", payload.email);

  if (error || !data || !data[0]) {
    return {
      success: false,
      message: "کاربر یافت نشد.",
    };
  }
  const user = data[0];
  const isPasswordValid = await bcrypt.compare(
    payload.password!,
    data[0].password
  );
  if (!isPasswordValid) {
    return {
      success: false,
      message: "نام کاربری با کلمه عبور تطابق ندارند.",
    };
  }
  if (user.role !== payload.role) {
    return {
      success: false,
      message: "نام کاربری با نقش انتخابی وجود ندارد.",
    };
  }

  const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECREC!, {
    expiresIn: "1d",
  });
  return {
    success: true,
    message: "با موفقیت وارد اکانت خود شدید.",
    data: jwtToken,
  };
};
