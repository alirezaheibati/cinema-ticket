"use client";
import InvoiceDetails from "@/components/checkout/invoice-details";
import DiscountCheck from "@/components/checkout/discount-check";
import CheckoutRules from "@/components/checkout/checkout-rules";
import PaymentMethod from "@/components/checkout/payment-method";
import TicketsInfo from "@/components/checkout/tickets-info";
import ShowInfo from "@/components/checkout/show-info";
import { useCartStore } from "@/store/cart-store";
import NotFoundWarning from "@/components/ui/not-found-warning";
import ConfirmBookingBtn from "@/components/checkout/confirm-booking-btn";

export default function CheckoutPage() {
  const { cart } = useCartStore();
  if (cart.length < 1) {
    return (
      <section className="max-w-7xl mx-auto pt-8 pb-16 p-4 lg:p-0">
        <h2 className="text-xl font-bold text-popover-foreground mb-4">
          تسویه حساب
        </h2>
        <NotFoundWarning message="هیچ بلیتی انتخاب نشده است. از لیست فیلم ها بلیت خود را تهیه نمایید." />
      </section>
    );
  }
  return (
    <section className="max-w-7xl mx-auto pt-8 pb-16 p-4 lg:p-0">
      <h2 className="text-xl font-bold text-popover-foreground mb-4">
        تسویه حساب
      </h2>
      {cart.length < 1 ? (
        <NotFoundWarning message="هیچ بلیتی انتخاب نشده است. از لیست فیلم ها بلیت خود را تهیه نمایید." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8 ">
          <div className="p-4 lg:col-span-2 border border-gray-200 rounded-sm">
            {/* purchased info section */}
            <div className="border border-gray-200 rounded-sm p-4 mb-4">
              {/* show info */}
              <ShowInfo />
              {/* tickets info */}
              <TicketsInfo />
            </div>
            {/* rules section */}
            <CheckoutRules />
          </div>

          {/* invoice summary */}
          <div className="p-4 border border-gray-200 rounded-sm">
            {/* factor */}
            <InvoiceDetails />
            {/* discount */}
            <DiscountCheck />
            {/* payment method */}
            <PaymentMethod />
            <ConfirmBookingBtn />
          </div>
        </div>
      )}
    </section>
  );
}
