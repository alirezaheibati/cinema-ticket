"use client";
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
export default function UserSearchMovieForm() {
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
        className="flex justify-between items-center gap-2 w-full"
      >
        <div className="w-full">
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="نام فیلم"
                    {...field}
                    className="h-12 rounded-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="h-12 rounded-sm">
          جستجو
        </Button>
      </form>
    </Form>
  );
}
