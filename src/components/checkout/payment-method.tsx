import Image from "next/image";
import mellatLogo from "@/../public/assets/banks/mellat.png";
import samanLogo from "@/../public/assets/banks/saman.png";
export default function PaymentMethod() {
  return (
    <div>
      <h3 className="font-semibold mb-3">روش پرداخت</h3>
      <div className="bg-gray-100 rounded-sm p-4">
        <div className="flex justify-start gap-2 items-center">
          <input
            type="radio"
            className="accent-primary"
            name="payment-method"
            defaultChecked
            value={"saman"}
          />
          <Image src={samanLogo} alt="bank saman logo" width={24} height={24} />
          <p>بانک سامان</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-start gap-2 items-center">
          <input
            type="radio"
            name="payment-method"
            value={"mellat"}
            className="accent-primary"
          />
          <Image
            src={mellatLogo}
            alt="bank mellat logo"
            width={24}
            height={24}
          />
          <p>بانک ملت</p>
        </div>
      </div>
    </div>
  );
}
