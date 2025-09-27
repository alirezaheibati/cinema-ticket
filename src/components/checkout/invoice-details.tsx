"use client";
import addCommasToString from "@/helpers/addCommasToPrice";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { useCartStore } from "@/store/cart-store";

export default function InvoiceDetails() {
  const { cart } = useCartStore();

  const ticketsTotal = cart[0]?.seat?.price * cart.length;
  const tax = ticketsTotal * 0.1;
  const fee = ticketsTotal * 0.04;
  return (
    <div className=" overflow-hidden mb-6">
      <h3 className="font-semibold mb-3">جزئیات پرداخت</h3>
      <div className="bg-gray-100 rounded-sm p-4">
        <div className="grid grid-cols-4 gap-2 py-2">
          <p className="col-span-2 text-sm">
            <span>بلیت</span>
            <span className="mr-1">
              {addCommasToString(convertToPersianDigits(cart[0]?.seat?.price))}
            </span>
            <span className="text-xs mr-1">تومانی</span>
          </p>
          <p>
            <span>{convertToPersianDigits(cart.length)}</span>
            <span className="text-xs mr-1">عدد</span>
          </p>
          <p>
            <span>
              {addCommasToString(convertToPersianDigits(ticketsTotal))}
            </span>
            <span className="text-xs mr-1">تومان</span>
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 py-2">
          <p className="col-span-2">
            <span className="text-sm">مالیات بر ارزش افزوده</span>
          </p>
          <p>
            <span className="text-xs">%</span>
            <span>{convertToPersianDigits(10)}</span>
          </p>
          <p>
            <span>{addCommasToString(convertToPersianDigits(tax))}</span>
            <span className="text-xs mr-1">تومان</span>
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 py-2">
          <p className="col-span-2">
            <span className="text-sm">کارمزد خرید آنلاین</span>
          </p>
          <p>
            <span className="text-xs">%</span>
            <span>{convertToPersianDigits(4)}</span>
          </p>
          <p>
            <span>{addCommasToString(convertToPersianDigits(fee))}</span>
            <span className="text-xs mr-1">تومان</span>
          </p>
        </div>
        <hr className="mb-4" />
        <div className="grid grid-cols-4 gap-2 py-2">
          <p className="col-span-3">
            <span className="text-sm font-semibold">مبلغ قابل پرداخت</span>
          </p>
          <p>
            <span>
              {addCommasToString(
                convertToPersianDigits(fee + tax + ticketsTotal)
              )}
            </span>
            <span className="text-xs mr-1">تومان</span>
          </p>
        </div>
      </div>
    </div>
  );
}
