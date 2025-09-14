"use server";
import supabase from "@/config/supabase-config";
import { IUser } from "@/interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
  const jwtToken = jwt.sign({ userId: data[0].id }, process.env.JWT_SECRET!, {
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

  const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  return {
    success: true,
    message: "با موفقیت وارد اکانت خود شدید.",
    data: jwtToken,
  };
};

export const retriveLogedInUser = async function () {
  try {
    const cookiesStore = await cookies();

    const jwtToken = cookiesStore.get("jwt-token")?.value;
    const decodedToken: any = jwt.verify(
      jwtToken || "",
      process.env.JWT_SECRET!
    );

    const userId = decodedToken.userId;

    const { data: users, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId);

    if (users?.length === 0 || error) {
      throw new Error("اطلاعات کاربر یافت نشد.");
    }

    const user = users[0];
    delete user.password;

    return {
      success: true,
      message: "اطلاعات با موفقیت بارگیری شد.",
      user: user,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};
