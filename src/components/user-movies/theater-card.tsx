import { ITheater } from "@/interfaces";
import { ChevronDown } from "lucide-react";
interface TheaterCardProps {
  onOpenAccordion: () => void;
  isOpen: boolean;
  theater: ITheater;
}
export default function TheaterCard({
  onOpenAccordion,
  isOpen,
  theater,
}: TheaterCardProps) {
  return (
    <div className="flex justify-between mb-6 items-start ">
      <div>
        <h2 className="font-semibold text-lg mb-6 text-popover-foreground">
          {theater.name}
        </h2>
        <p className="text-muted-foreground line-clamp-1">{theater.address}</p>
      </div>
      <button
        className="flex shrink-0 justify-center items-center text-sm text-destructive cursor-pointer gap-2 "
        onClick={onOpenAccordion}
      >
        <span>سانس ها</span>
        <ChevronDown
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
}
