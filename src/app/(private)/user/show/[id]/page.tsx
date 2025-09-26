import { getShowById } from "@/actions/shows";
import ConfirmSeatsBtn from "@/components/pick-seat/confirm-seats-btn";
import PickedSeatsContainer from "@/components/pick-seat/picked-seats-container";
import SeatsBox from "@/components/pick-seat/seats-box";
import MovieDetails from "@/components/user-shows/movie-details";
import SeatsColorGuide from "@/components/user-shows/seats-color-guide";

interface UserShowPageProps {
  params: Promise<{ id: string }>;
}
export default async function UserShowPage({ params }: UserShowPageProps) {
  const { id } = await params;
  const show = await getShowById(id);

  return (
    <div className="bg-gray-100">
      {/* movie info */}
      <div className="bg-gray-100 py-8 ">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-start items-start gap-4">
          <MovieDetails show={show.show!} />
          {/* tickets */}
          <PickedSeatsContainer />
        </div>
        <ConfirmSeatsBtn />
      </div>
      {/* info line */}
      <SeatsColorGuide capacity={show.show?.theater.capacity!} />
      {/* screen and seats */}
      <div className="w-full overflow-x-auto max-w-7xl mx-auto p-4 lg:p-0 lg:pb-16">
        <div className="border bg-white rounded-b-sm rounded-t-full py-2 text-center mt-8 mb-10 mx-auto w-[896px]">
          صحنه اجرا
        </div>
        {/* seats */}
        <SeatsBox
          seatsCount={show.show?.available_seats_count!}
          bookedSeats={show.show?.booked_seats!}
          price={show.show?.ticket_price!}
          showId={id}
        />
      </div>
    </div>
  );
}
