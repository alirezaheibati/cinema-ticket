import MovieForm from "@/components/admin-movies/add-movie";
import PageTitle from "@/components/ui/page-title";

export default function AddMovie() {
  return (
    <>
      <div className="flex py-4 px-10 justify-between items-center">
        <PageTitle title=" افزودن فیلم" />
      </div>
      <MovieForm />
    </>
  );
}
