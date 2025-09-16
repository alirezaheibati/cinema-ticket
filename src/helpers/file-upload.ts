"use server";

import supabase from "@/config/supabase-config";

export const uploadFileGetUrl = async (file: File) => {
  try {
    const filename = `${Date.now()}-${file.name}`;
    const uploadResponse = await supabase.storage
      .from("default")
      .upload(filename, file);

    if (uploadResponse.error || !uploadResponse.data) {
      throw new Error("آپلود فایل  خطا مواجه شد. لطفا دوباره تلاش کنید.");
    }

    const { data } = supabase.storage.from("default").getPublicUrl(filename);

    return {
      success: true,
      message: "آپلود با موفقیت انجام شد.",
      url: data.publicUrl,
    };
  } catch (err) {
    return {
      success: false,
      message: "آپلود فایل با  مواجه شد. لطفا دوباره تلاش کنید.",
    };
  }
};
