"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { theaterEquipments } from "@/constants";
import { ITheater } from "@/interfaces";
import { updateTheater } from "@/actions/theaters";
const theaterFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "نام سالن باید حداقل ۲ کاراکتر باشد.",
    })
    .max(160, {
      message: "نام سالن باید حداکثر ۱۵۰ کاراکتر باشد.",
    }),
  address: z
    .string()
    .min(10, {
      message: "ادرس باید حداقل ۱۰ کاراکتر باشد.",
    })
    .max(160, {
      message: "ادرس باید حداکثر ۱۵۰ کاراکتر باشد.",
    }),
  capacity: z
    .string({
      message: "لطفا ظرفیت سالن را وارد نمایید.",
    })
    .regex(/^[1-9]\d*$/, {
      message: "لطفا ظرفیت سالن را وارد نمایید.",
    }),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "حداقل یک گزینه را باید انتخاب نمایید.",
  }),
});
interface EditTheaterFormProps {
  theater: ITheater;
}
export default function EditTheaterForm({ theater }: EditTheaterFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof theaterFormSchema>>({
    resolver: zodResolver(theaterFormSchema),
    defaultValues: {
      name: theater.name,
      address: theater.address,
      capacity: String(theater.capacity),
      features: JSON.parse(theater.features),
    },
  });
  async function onSubmit(values: z.infer<typeof theaterFormSchema>) {
    try {
      const payload = { ...values };

      const response = await updateTheater(theater.id, {
        ...payload,
        capacity: parseInt(payload.capacity),
        features: JSON.stringify(payload.features),
      });
      if (!response.success) {
        throw new Error("ویرایش فیلم با خطا مواجه شد. دوباره تلاش کنید.");
      }
      router.push("/admin/movies");
      router.refresh();
      toast.success("ویرایش فیلم با موفقیت انجام شد.");
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
          ویرایش سالن سینما
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-base">نام سالن:</FormLabel>
                <FormControl>
                  <Input {...field} className="h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="mb-4 w-full">
                <FormLabel className="text-base">ظرفیت سالن:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="h-10"
                    placeholder="ظرفیت سالن به نفر"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-base">آدرس سالن:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="آدرس سالن سینما را وارد کنید"
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
          name="features"
          render={() => (
            <FormItem>
              <div className="mb-2">
                <FormLabel className="text-base">امکانات سالن سینما:</FormLabel>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2">
                {theaterEquipments.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="features"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
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
