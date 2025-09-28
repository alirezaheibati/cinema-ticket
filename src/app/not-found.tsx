import Image from "next/image";
import nemoImage from "@/../public/assets/nemo.png";
import Link from "next/link";
export default function notFoundPage() {
  return (
    <div className="w-screen h-[calc(100vh-85px)] bg-gray-50 relative">
      <div className="w-full h-full absolute flex flex-col justify-center items-center p-4 sm:p-8">
        <p className="font-bold text-9xl opacity-10 leading-0 bg-red-100 mb-8">
          404
        </p>
        <Image src={nemoImage} alt="nemo the fish image" width={200} />
        <p className="font-semibold mb-1">صفحه مورد نظر یافت نشد.</p>
        <p className="mb-3 text-sm">
          برای استفاده از سایت میتوانید از لینک پایین ثبت نام نمایید.
        </p>
        <Link
          href={"/?form=login"}
          className="bg-destructive px-4 py-2 text-popover rounded-md"
        >
          خانه
        </Link>
      </div>
    </div>
  );
}
