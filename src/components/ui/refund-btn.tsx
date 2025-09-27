"use client";
import { TicketX } from "lucide-react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RemoveBtnProps {
  refundFn: (id: number) => Promise<{ success: boolean; message: string }>;
  id: number;
}
export default function RefundBtn({ refundFn, id }: RemoveBtnProps) {
  const router = useRouter();
  async function ticketRefundHandler() {
    try {
      const response = await refundFn(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      router.refresh();
      toast.success("مرجوع بلیت با موفقیت انجام شد.");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger title="لغو رزرو" className="cursor-pointer">
          <TicketX size={18} />
        </AlertDialogTrigger>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              از مرجوع کردن بلیت اطمینان دارید؟
            </AlertDialogTitle>
            <AlertDialogDescription>
              توجه داشته باشید که پس از مرجوع کردن بلیت، امکان برگشت آن وجود
              ندارد و در صورت نیاز دوباره باید اقدام به رزرو بلیت نمایید.
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
    </>
  );
}
