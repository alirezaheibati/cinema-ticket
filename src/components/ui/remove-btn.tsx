"use client";
import { Trash2 } from "lucide-react";
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
  removeFn: (id: string) => Promise<{
    success: boolean;
    message: string;
  }>;
  id: string;
}
export default function RemoveBtn({ removeFn, id }: RemoveBtnProps) {
  const router = useRouter();
  async function itemRemoveHandler() {
    try {
      const response = await removeFn(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      router.refresh();
      toast.success("حذف آیتم با موفقیت انجام شد.");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer">
          <Trash2 size={18} />
        </AlertDialogTrigger>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>از حذف این آیتم اطمینان دارید؟</AlertDialogTitle>
            <AlertDialogDescription>
              توجه داشته باشید که حذف این آیتم بصورت دائمی صورت میگیرد و امکان
              برگشت تغییرات وجود ندارد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>لغو</AlertDialogCancel>
            <AlertDialogAction onClick={itemRemoveHandler}>
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
