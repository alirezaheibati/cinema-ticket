"use client";
import { useState } from "react";

import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import addCommasToString from "@/helpers/addCommasToPrice";

interface WalletProps {
  userBalance: number;
}
export default function Wallet({ userBalance }: WalletProps) {
  const [charge, setCharge] = useState(0);

  function walletBalanceHandler(amount: number) {
    if (charge + amount > 0) setCharge((prev) => prev + amount);
  }
  function formSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    console.log(charge);
  }
  return (
    <>
      {
        <div className="max-w-7xl mx-auto pt-8 pb-16 flex justify-center items-center min-h-[calc(100vh-85px)] ">
          <div className="flex justify-center items-center flex-col gap-6 border border-gray-200 rounded-sm py-8 px-16">
            <h2 className="text-xl font-bold text-popover-foreground mb-4">
              موجودی کیف پول
            </h2>
            <p className="flex justify-center gap-1 items-center text-2xl font-semibold border-8 rounded-full w-36 h-36 border-destructive border-solid">
              <span>
                {addCommasToString(convertToPersianDigits(userBalance))}
              </span>
              <span className="text-xs">تومان</span>
            </p>
            <ul className="flex flex-wrap my-4 justify-start items-center gap-2 [&_li]:border-2 [&_li]:py-1 [&_li]:rounded-lg [&_li]:w-14 [&_button]:w-full [&_button]:h-full">
              <li>
                <button
                  onClick={() => {
                    walletBalanceHandler(-5000);
                  }}
                >
                  -
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    walletBalanceHandler(10000);
                  }}
                >
                  {addCommasToString("۱۰۰۰۰")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    walletBalanceHandler(50000);
                  }}
                >
                  {addCommasToString("۵۰۰۰۰")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    walletBalanceHandler(100000);
                  }}
                >
                  {addCommasToString("۱۰۰۰۰۰")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    walletBalanceHandler(5000);
                  }}
                >
                  +
                </button>
              </li>
            </ul>
            <form onSubmit={formSubmitHandler} className="w-full">
              <div className="w-full mb-4 no-arrows text-center text-2xl outline-none rounded-xl max-w-[272px] shadow-sm  py-1 text-slate-900 mx-auto">
                {addCommasToString(convertToPersianDigits(charge))}
              </div>
              <button className="w-full rounded-xl max-w-[272px] bg-destructive py-2 text-slate-50 block mx-auto hover:opacity-90 cursor-pointer">
                شارژ کیف پول
              </button>
            </form>
          </div>
        </div>
      }
    </>
  );
}
