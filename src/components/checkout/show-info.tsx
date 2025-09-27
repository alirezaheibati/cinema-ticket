"use client";
import { getShowById } from "@/actions/shows";
import { persianMonths } from "@/constants";
import { convertTimeToPersian } from "@/helpers/convert-time-to-persian";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import { IShow } from "@/interfaces";
import { useCartStore } from "@/store/cart-store";
import { toJalaali } from "jalaali-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShowInfo() {
  const router = useRouter();
  const { cart } = useCartStore();
  const [show, setShow] = useState<IShow>();
  const showId = cart[0]?.seat?.showId;

  useEffect(() => {
    async function fetchShow() {
      const show = await getShowById(String(showId));
      setShow(show.show);
    }

    fetchShow();
  }, []);

  if (!showId || !show) {
    return <p>اطلاعات سانس یافت نشد.</p>;
  }

  let date = new Date();
  if (show?.date) {
    date = new Date(show?.date);
  }
  const { jy, jm, jd } = toJalaali(date);
  return (
    <div className="flex flex-col sm:flex-row justify-start items-stretch gap-4 relative border-b border-dashed border-gray-300 py-4">
      <button
        onClick={() => router.push(`/user/movies/${showId}`)}
        className="absolute left-0 top-0 text-sm cursor-pointer font-semibold text-destructive hover:opacity-100 opacity-90"
      >
        تغییر سانس
      </button>
      <div className="w-32 h-32 rounded-md overflow-hidden relative shrink-0 mx-auto sm:mx-0">
        <Image src={show?.movie?.poster_url!} alt={show?.movie?.title!} fill />
      </div>
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-2 text-popover-foreground">
          {show?.movie?.title}
        </h2>
        <p className="text-sm mb-2">
          <span className="font-semibold ml-2 text-popover-foreground">
            سالن:
          </span>
          <span>{show?.theater.address}</span>
        </p>
        <p className="text-sm">
          <span className="font-semibold ml-2 text-popover-foreground">
            زمان:
          </span>
          <span>{`${convertToPersianDigits(jd)} ${
            persianMonths[jm - 1]
          } ${convertToPersianDigits(jy)}`}</span>
          {" - "}
          <span>{convertTimeToPersian(show?.time ?? "00:00")}</span>
        </p>
      </div>
    </div>
  );
}
