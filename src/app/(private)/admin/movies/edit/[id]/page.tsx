import { getMovieById } from "@/actions/movies";
import EditMovieForm from "@/components/admin-movies/edit-movie";
import PageTitle from "@/components/ui/page-title";

export default async function EditMoviePage({
  params,
}: {
  params: { id: string };
}) {
  const fixedParams = await params;
  const movie = await getMovieById(fixedParams.id);
  if (!movie) {
    return (
      <div className="text-center text-red-600">
        خطایی رخ داده است. لطفا دوباره تلاش کنید.
      </div>
    );
  }
  return (
    <div className="w-full overflow-x-auto max-w-7xl mx-auto p-4 lg:p-0">
      <div className="flex py-4 px-10 justify-between items-center">
        <PageTitle title="ویرایش فیلم" />
      </div>
      {movie.movie && <EditMovieForm movie={movie.movie} />}
    </div>
  );
}
