"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toJalaali } from "jalaali-js";

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
import { CalendarIcon, Image } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IMovie, IShow, ITheater } from "@/interfaces";
import { updateShow } from "@/actions/shows";
const showFormSchema = z.object({
  movie_id: z.string().max(160, {
    message: "نام فیلم باید حداکثر ۱۵۰ کاراکتر باشد.",
  }),
  theater_id: z
    .string()
    .min(1, {
      message: "توضیحات باید حداقل ۱ کاراکتر باشد.",
    })
    .max(160, {
      message: "توضیحات باید حداکثر ۱۵۰ کاراکتر باشد.",
    }),
  date: z.date({
    message: "لطفا تاریخ انتشار فیلم را وارد نمایید.",
  }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "لطفا پوستر فیلم را وارد نمایید.",
  }),
  ticket_price: z
    .string({
      message: "لطفا زمان را به دقیقه وارد نمایید.",
    })
    .regex(/^[1-9]\d*$/, {
      message: "لطفا زمان را به دقیقه وارد نمایید.",
    }),
});
interface EditShowFormProps {
  show: IShow;
  movies: IMovie[];
  theaters: ITheater[];
}
export default function EditShowForm({
  show,
  movies,
  theaters,
}: EditShowFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof showFormSchema>>({
    resolver: zodResolver(showFormSchema),
    defaultValues: {
      movie_id: String(show.movie_id),
      theater_id: String(show.theater_id),
      date: new Date(show.date),
      time: show.time,
      ticket_price: String(show.ticket_price),
    },
  });
  async function onSubmit(values: z.infer<typeof showFormSchema>) {
    const selectedTheater = theaters?.find(
      (theater) => theater.id == values.theater_id
    );
    // calendar was returning GMT+3:30 iran time zone that caused problem
    // and returned 1 day before selected date
    // this conversion to gmt fixed the problem
    const localDate = new Date(values.date);
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate()
      )
    );
    try {
      const response = await updateShow(show.id, {
        time: values.time,
        movie_id: parseInt(values.movie_id),
        theater_id: parseInt(values.theater_id),
        ticket_price: parseInt(values.ticket_price),
        available_seats_count: selectedTheater?.capacity,
        date: utcDate,
      });
      if (!response.success) {
        throw new Error("ویرایش سانس با خطا مواجه شد. دوباره تلاش کنید.");
      }
      router.push("/admin/shows");
      router.refresh();
      toast.success("ویرایش سانس با موفقیت انجام شد.");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-3 sm:px-10 py-8 w-full max-w-2xl block mx-auto border border-gray-200 rounded-sm shadow mb-8"
      >
        <h1 className="mb-10 text-center font-semibold text-lg">
          ویرایش سانس فیلم
        </h1>
        <FormField
          control={form.control}
          name="movie_id"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-base">فیلم:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl dir="rtl" className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="فیلم را انتخاب نمایید" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {movies?.map((movie) => (
                    <SelectItem
                      key={movie.id}
                      value={String(movie.id)}
                      dir="rtl"
                    >
                      {movie.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theater_id"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-base">سالن نمایش:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl dir="rtl" className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="سالن نمایش را انتخاب نمایید" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {theaters?.map((theater) => (
                    <SelectItem
                      key={theater.id}
                      value={String(theater.id)}
                      dir="rtl"
                    >
                      {theater.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ticket_price"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel className="text-base">قیمت بلیت:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="h-10"
                  placeholder="قیمت بلیت به تومان"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mb-4">
                <FormLabel className="text-base">تاریخ پخش:</FormLabel>
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
                      disabled={(date) => date < new Date()}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>زمان شروع سانس:</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    className="justify-end"
                    dir="rtl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-start gap-2 items-center mt-8">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            بروزرسانی
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
