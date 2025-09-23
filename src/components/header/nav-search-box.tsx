"use client";
import { Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
const FormSchema = z.object({
  term: z.string(),
});
export default function NavSearchBox() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      term: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`/user/movies?term=${data.term}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="hidden sm:flex justify-between items-center gap-2 w-full max-w-[400px] relative pr-12 border rounded-full overflow-hidden"
      >
        <div className="w-full">
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="جستجوی نام فیلم"
                    {...field}
                    className="h-10 rounded-sm border-none focus-visible:outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="h-10 rounded-full cursor-pointer hover:opacity-90 absolute right-0 top-0 bg-gray-200 text-popover-foreground"
        >
          <Search />
        </Button>
      </form>
    </Form>
  );
}
