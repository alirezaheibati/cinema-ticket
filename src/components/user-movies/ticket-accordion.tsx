"use client";
import { IShow, ITheater } from "@/interfaces";
import { useState } from "react";
import BookShowCard from "./book-show-card";
import TheaterCard from "./theater-card";
interface TicketAccordionProps {
  theater: ITheater;
  shows: IShow[];
}
export default function TicketAccordion({
  theater,
  shows,
}: TicketAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  function AccordionOpenHandler() {
    setIsOpen((prev) => !prev);
  }
  return (
    <div
      className={`border ${
        isOpen ? "h-auto bg-gray-100" : "h-[102px] sm:h-[126px] bg-white"
      } rounded-sm p-3 sm:p-6 mb-4 last:mb-0 hover:bg-gray-100 transition-colors overflow-hidden`}
    >
      <TheaterCard
        onOpenAccordion={AccordionOpenHandler}
        theater={theater}
        isOpen={isOpen}
      />
      <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-3 sm:gap-6">
        {shows
          .filter((show) => show.theater_id === +theater.id)
          .map((show, idx) => (
            <BookShowCard key={`${show.id}${idx}`} show={show} />
          ))}
      </div>
    </div>
  );
}
