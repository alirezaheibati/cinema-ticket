import { Button } from "@/components/ui/button";

export default function Overlay() {
  return (
    <div className="w-full grow flex justify-center items-center">
      <div className="bg-black/30 rounded-lg px-8 py-10 text-white/90 w-lg max-w-screen">
        <h1 className="text-center font-semibold text-xl">
          بزرگ ترین مرجع <span className="text-destructive">رزرو بلیط</span>{" "}
          سینما در ایران
        </h1>
        <p className="text-center text-sm mt-4 mb-6 text-gray-400">
          همکاری با برترین سینماهای کشور، ارایه‌ی خدمات ویژه به سازمان‌ها و
          شرکت‌های دولتی و خصوصی به منظور اکران‌های خصوصی، فروش بلیت جشنواره
          فیلم فجر و تسهیل اتصال و ارتباط با درگاه یک‌پارچه‌ی سمفا برای سایر
          کسب‌وکارها
        </p>
        <p className="text-center">
          لطفا جهت استفاده از خدمات سایت، ثبت نام نمایید.
        </p>
      </div>
    </div>
  );
}
