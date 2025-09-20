"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { toJalaali } from "jalaali-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CalendarIcon, Image } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { movieGenres } from "@/constants";
import { useState } from "react";
import { uploadFileGetUrl } from "@/helpers/file-upload";
import { addMovie } from "@/actions/movies";
const movieFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "نام فیلم باید حداقل ۲ کاراکتر باشد.",
    })
    .max(160, {
      message: "نام فیلم باید حداکثر ۱۵۰ کاراکتر باشد.",
    }),
  description: z
    .string()
    .min(10, {
      message: "توضیحات باید حداقل ۱۰ کاراکتر باشد.",
    })
    .max(160, {
      message: "توضیحات باید حداکثر ۱۵۰ کاراکتر باشد.",
    }),
  duration: z
    .string({
      message: "لطفا زمان را به دقیقه وارد نمایید.",
    })
    .regex(/^[1-9]\d*$/, {
      message: "لطفا زمان را به دقیقه وارد نمایید.",
    }),
  genre: z
    .string({
      message: "لطفا ژانر فیلم را انتخاب نمایید.",
    })
    .min(1, {
      message: "لطفا ژانر فیلم را انتخاب نمایید.",
    }),
  release_date: z.date({
    message: "لطفا تاریخ انتشار فیلم را وارد نمایید.",
  }),
  poster_url: z.string({
    message: "لطفا پوستر فیلم را وارد نمایید.",
  }),
});
export default function MovieForm() {
  const [posterFile, setPosterFile] = useState<File | null>();
  const router = useRouter();
  const form = useForm<z.infer<typeof movieFormSchema>>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      genre: "",
      release_date: new Date(),
      poster_url: "",
    },
  });
  async function onSubmit(values: z.infer<typeof movieFormSchema>) {
    try {
      const payload = { ...values };
      if (posterFile) {
        const uploadPosterResponse = await uploadFileGetUrl(posterFile);
        if (!uploadPosterResponse.success) {
          throw new Error("آپلود فایل با خطا مواجه شد. دوباره تلاش کنید.");
        }
        payload.poster_url = uploadPosterResponse.url as string;

        const response = await addMovie({
          ...payload,
          duration: parseInt(payload.duration),
        });
        if (!response.success) {
          throw new Error("ذخیره فیلم با خطا مواجه شد. دوباره تلاش کنید.");
        }
        router.push("/admin/movies");
        router.refresh();
        toast.success("اطلاعات فیلم با موفقیت ذخیره شد.");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  function imageSelectHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPosterFile(file);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-3 sm:px-10 py-8 w-full max-w-2xl block mx-auto border border-gray-200 rounded-sm shadow mb-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-base">نام فیلم:</FormLabel>
              <FormControl>
                <Input {...field} className="h-10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="mb-4 w-full">
                <FormLabel className="text-base">زمان فیلم:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="h-10"
                    placeholder="زمان فیلم به دقیقه"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-base">ژانر:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl dir="rtl" className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="ژانر فیلم را انتخاب نمایید" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {movieGenres.map((genre) => (
                      <SelectItem
                        key={genre.genreEn}
                        value={genre.genreEn}
                        dir="rtl"
                      >
                        {genre.genreFa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-base">توضیحات:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="توضیحات فیلم را وارد کنید"
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="release_date"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-4">
              <FormLabel className="text-base">تاریخ انتشار:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl className="w-full h-10">
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        (() => {
                          const { jy, jm, jd } = toJalaali(field.value);
                          const monthNames = [
                            "فروردین",
                            "اردیبهشت",
                            "خرداد",
                            "تیر",
                            "مرداد",
                            "شهریور",
                            "مهر",
                            "آبان",
                            "آذر",
                            "دی",
                            "بهمن",
                            "اسفند",
                          ];
                          return `${jd} ${monthNames[jm - 1]} ${jy}`;
                        })()
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-start items-start gap-4">
          <FormField
            control={form.control}
            name="poster_url"
            render={({ field }) => (
              <FormItem className="mb-4 grow">
                <FormLabel className="text-base flex flex-col justify-start items-start gap-4">
                  <p>پوستر فیلم:</p>
                  <div className="cursor-pointer flex justify-start items-center gap-2 bg-primary h-9 text-white/90 rounded-sm px-4 py-3 active:scale-95">
                    <Image />
                    <span>افزودن پوستر</span>
                  </div>
                </FormLabel>
                <FormControl className="h-10 hidden">
                  <Input
                    placeholder="shadcn"
                    {...field}
                    type="file"
                    accept="image/*"
                    onChange={imageSelectHandler}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="border shrink-0 bg-gray-100 border-gray-200 rounded-md flex justify-center items-center aspect-square w-32 overflow-hidden">
            {posterFile ? (
              <img
                src={URL.createObjectURL(posterFile)}
                alt="user selected movie poster"
              />
            ) : (
              <p>500*500</p>
            )}
          </div>
        </div>
        <div className="flex justify-start gap-2 items-center">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            ذخیره
          </Button>
          <button
            type="button"
            className="bg-gray-100 h-9 text-slate-900 rounded-sm px-6 py-2 active:scale-95"
            onClick={() => {
              router.back();
            }}
          >
            لغو
          </button>
        </div>
      </form>
    </Form>
  );
}
