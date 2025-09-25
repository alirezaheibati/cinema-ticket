import { getAllMovies, searchMovies } from "@/actions/movies";
import MovieCard from "@/components/user-movies/movie-card";
import UserSearchMovieForm from "@/components/user-movies/search-movie-form";
import { IMovie } from "@/interfaces";

export default async function UserMoviePage({
  searchParams,
}: {
  searchParams: Promise<{ term?: string }>;
}) {
  const { term } = await searchParams;
  let moviesList: IMovie[];
  if (!term) {
    const { movies } = await getAllMovies();
    moviesList = [...movies];
  } else {
    const { movies } = await searchMovies(term);
    moviesList = [...movies];
  }
  return (
    <main className="max-w-7xl py-8 mx-auto px-3">
      {term ? (
        <h1 className="font-bold text-xl mb-6">
          نتایج جستجو برای واژه : "{term}"
        </h1>
      ) : (
        <h1 className="font-bold text-xl mb-6">فیلم های در حال اکران</h1>
      )}

      <UserSearchMovieForm />
      <div className="mt-6 border border-gray-200 p-4 rounded-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {moviesList.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </main>
  );
}
