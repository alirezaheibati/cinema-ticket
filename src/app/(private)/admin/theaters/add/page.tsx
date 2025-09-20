import AddTheaterForm from "@/components/admin-theaters/add-theater";
import PageTitle from "@/components/ui/page-title";

export default function AddMovie() {
  return (
    <>
      <div className="flex py-4 px-10 justify-between items-center">
        <PageTitle title=" افزودن سالن سینما" />
      </div>
      <AddTheaterForm />
    </>
  );
}
