"use client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { refundBooking } from "@/actions/bookings";
interface CancelBookingBtnProps {
  status: "refund" | "booked";
  id: number;
}
export default function CancelBookingBtn({
  status,
  id,
}: CancelBookingBtnProps) {
  const router = useRouter();
  async function ticketRefundHandler() {
    try {
      const response = await refundBooking(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success("مرجوع بلیت با موفقیت انجام شد.");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        title="لغو رزرو"
        disabled={status === "refund"}
        className=" flex justify-center items-center bg-destructive cursor-pointer disabled:cursor-not-allowed text-popover rounded-sm w-full py-4 px-3 mt-6 text-sm disabled:bg-gray-300 disabled:text-popover-foreground"
      >
        لغو رزرو و عودت مبلغ
      </AlertDialogTrigger>

      <AlertDialogContent dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>از مرجوع کردن بلیت اطمینان دارید؟</AlertDialogTitle>
          <AlertDialogDescription>
            توجه داشته باشید که پس از مرجوع کردن بلیت، امکان برگشت آن وجود ندارد
            و در صورت نیاز دوباره باید اقدام به رزرو بلیت نمایید.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>لغو</AlertDialogCancel>
          <AlertDialogAction onClick={ticketRefundHandler}>
            مرجوع
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
