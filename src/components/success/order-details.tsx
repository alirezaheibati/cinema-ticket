import { Clapperboard, House, TicketCheck } from "lucide-react";
import SuccessLink from "./success-link";

export default function OrderDetails() {
  return (
    <div className="w-max border border-gray-100 shadow-md p-6 rounded-md flex flex-col justify-start items-center gap-2 mb-12">
      <div className="bg-[#00798c]/20 rounded-full p-3 flex justify-center items-center">
        <TicketCheck />
      </div>
      <h1 className="text-[#003d5b] font-messiri font-semibold text-2xl pt-4">
        بلیت شما با موفقیت رزرو شد.
      </h1>
      <p className="text-center text-sm text-[#003d5b]/80 max-w-xs">
        با تشکر از خرید شما. بلیت شما با موفقیت رزرو شد. امیدواریم از تماشای
        فیلم لذت ببرید.
      </p>
      <div className="w-xs flex justify-center items-center gap-2 pt-4">
        <SuccessLink href="/user/dashboard">
          بازگشت به خانه
          <House size={16} />
        </SuccessLink>
        <SuccessLink href="/user/movies">
          رزرو بلیت
          <Clapperboard size={16} />
        </SuccessLink>
      </div>
    </div>
  );
}
