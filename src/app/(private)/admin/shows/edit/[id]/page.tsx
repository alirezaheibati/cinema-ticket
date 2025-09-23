import { getAllMovies } from "@/actions/movies";
import { getShowById } from "@/actions/shows";
import { getAllTheaters } from "@/actions/theaters";
import EditShowForm from "@/components/admin-shows/edit-show";
import PageTitle from "@/components/ui/page-title";

export default async function EditMoviePage({
  params,
}: {
  params: { id: string };
}) {
  const fixedParams = await params;
  const show = await getShowById(fixedParams.id);
  const movies = await getAllMovies();
  const theaters = await getAllTheaters();

  if (!show) {
    return (
      <div className="text-center text-red-600">
        خطایی رخ داده است. لطفا دوباره تلاش کنید.
      </div>
    );
  }
  return (
    <div className="w-full overflow-x-auto max-w-7xl mx-auto p-4 lg:p-0">
      <div className="flex py-4 px-10 justify-between items-center">
        <PageTitle title="ویرایش سانس نمایش" />
      </div>
      {show.show && (
        <EditShowForm
          show={show.show}
          movies={movies.movies}
          theaters={theaters.theaters}
        />
      )}
    </div>
  );
}
