"use client";
import { IShow } from "@/interfaces";
import { useEffect, useState } from "react";
import TicketAccordion from "./ticket-accordion";
import ShowDateCard from "./show-date-card";
interface ShowPickerProps {
  shows: IShow[];
  movieTitle: string;
}
export default function ShowPicker({ shows, movieTitle }: ShowPickerProps) {
  const [activeShowDate, setActiveShowDate] = useState<Date>();

  const availableDaysSet = new Set(shows.map((show) => show.date));
  const availableDays = Array.from(availableDaysSet);

  const availableTheaters = Object.values(
    shows
      .filter((show) => show.date === activeShowDate)
      .reduce((prev, show) => {
        if (!Object.keys(prev).includes(String(show.theater_id))) {
          return { ...prev, [show.theater_id]: show.theater };
        }
        return prev;
      }, {})
  );

  useEffect(() => {
    setActiveShowDate(availableDays[0]);
  }, []);
  function activeDayHandler(day: Date) {
    setActiveShowDate(day);
  }
  return (
    <>
      {/* day picker */}
      <h2 className="mt-6 font-semibold">انتخاب تاریخ و خرید بلیت:</h2>
      <div className="flex justify-start items-center gap-4 py-6">
        {availableDays.map((day, idx) => (
          <ShowDateCard
            key={String(day) + idx}
            day={day}
            isActive={day === activeShowDate}
            onActivateDay={activeDayHandler}
          />
        ))}
      </div>
      {/* render sanses */}
      <h2 className="mb-4">سینماهای درحال اکران فیلم {movieTitle}:</h2>
      <div>
        {availableTheaters.map((theater: any) => (
          <TicketAccordion
            key={theater.name}
            theater={theater}
            shows={shows.filter((show) => show.date === activeShowDate)}
          />
        ))}
      </div>
    </>
  );
}
