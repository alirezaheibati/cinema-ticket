import { getMovieById } from "@/actions/movies";
import { getShowsOfMovie } from "@/actions/shows";
import NotFoundWarning from "@/components/ui/not-found-warning";
import MovieBanner from "@/components/user-movies/movie-banner";
import ShowPicker from "@/components/user-movies/show-picker";
import { notFound } from "next/navigation";

interface BookShowPageProps {
  params: Promise<{ id: string }>;
}
export default async function BookShowPage({ params }: BookShowPageProps) {
  const { id } = await params;
  const movieResponse = await getMovieById(id);
  const showsResponse = await getShowsOfMovie(id);
  if (!movieResponse.success) {
    notFound();
  }
  if (!showsResponse.success || showsResponse.shows.length < 1) {
    return (
      <main className="max-w-6xl py-8 mx-auto px-3">
        <MovieBanner movie={movieResponse.movie!} />

        <NotFoundWarning message="سانس فعال برای فیلم انتخابی وجود ندارد." />
      </main>
    );
  }
  return (
    <main className="max-w-6xl py-8 mx-auto px-3">
      {/* movie banner */}
      <MovieBanner movie={movieResponse.movie!} />
      {/* day picker */}
      <ShowPicker
        shows={showsResponse.shows!}
        movieTitle={movieResponse.movie?.title!}
      />
    </main>
  );
}
