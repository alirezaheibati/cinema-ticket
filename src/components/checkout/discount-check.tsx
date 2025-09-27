import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronDown, TicketPercent } from "lucide-react";
const FormSchema = z.object({
  discountCode: z.string(),
});
export default function DiscountCheck() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      discountCode: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  const [openDiscount, setOpenDiscount] = useState(false);
  function toggleDiscountHandler() {
    setOpenDiscount((prev) => !prev);
  }
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3">کد تخفیف</h3>
      <div
        className={`bg-gray-100 rounded-sm overflow-hidden ${
          openDiscount ? "h-max" : "h-14"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <p className="flex justify-start items-center gap-2 w-full">
            <TicketPercent />
            <span>کد تخفیف دارید؟</span>
          </p>
          <button onClick={toggleDiscountHandler}>
            <ChevronDown
              className={`transition-transform ${
                openDiscount ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between items-center gap-2 w-full p-4"
          >
            <div className="grow">
              <FormField
                control={form.control}
                name="discountCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="کد تخفیف"
                        {...field}
                        className="h-12 rounded-sm focus-visible:outline-none focus-visible:ring-0 bg-white border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={!form.watch("discountCode")}
              className="h-12 rounded-sm cursor-pointer hover:disabled:bg-gray-200 hover:bg-popover-foreground hover:opacity-90 disabled:bg-gray-300 bg-popover-foreground text-popover disabled:text-popover-foreground"
            >
              اعمال کد
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
