"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerUser } from "@/actions/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

const registerFormSchema = z.object({
  name: z.string().min(3),
  email: z.email("Invalid email address"),
  password: z.string().min(6),
});
export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      const response = await registerUser(values);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success(response.message);
      cookies.set("jwt-token", response.data!);
      cookies.set("user-role", "user");
      form.reset();
      router.push("/");
    } catch (err: any) {
      toast.error(err.message ?? err.error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full px-10"
      >
        <h1 className="text-primary text-xl font-bold text-center border-b w-max mx-auto pb-2">
          ساخت اکانت جدید
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام و نام خانوادگی</FormLabel>
              <FormControl>
                <Input placeholder="علیرضا هیبتی" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ایمیل</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>کلمه عبور</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center text-sm gap-2">
            <p>قبلا ثبت نام کرده اید؟</p>
            <Link href={"/?form=login"} className="underline">
              ورود
            </Link>
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            ثبت نام
          </Button>
        </div>
      </form>
    </Form>
  );
}
