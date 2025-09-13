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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { loginUser } from "@/actions/users";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
const loginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6),
  role: z.enum(["user", "admin"]),
});
export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "user",
    },
  });
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const response = await loginUser(values);

      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success(response.message);
      cookies.set("jwt-token", response.data!);
      cookies.set("user-role", values.role);
      router.push(`/${values.role}/dashboard`);

      form.reset();
    } catch (err: any) {
      toast.error(err.message);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full px-10"
      >
        <h1 className="text-primary text-xl font-bold text-center border-b w-max mx-auto pb-2">
          ورود به حساب کاربری
        </h1>
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

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>نقش</FormLabel>
              <FormControl>
                <RadioGroup
                  dir="rtl"
                  onValueChange={field.onChange}
                  defaultValue="user"
                  className="flex gap-6"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="user" />
                    </FormControl>
                    <FormLabel className="font-normal">کاربر</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="admin" />
                    </FormControl>
                    <FormLabel className="font-normal">ادمین</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center text-sm gap-2">
            <p>هنوز ثبت نام نکرده اید؟</p>
            <Link href={"/?form=register"} className="underline">
              ثبت نام
            </Link>
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            ورود
          </Button>
        </div>
      </form>
    </Form>
  );
}
