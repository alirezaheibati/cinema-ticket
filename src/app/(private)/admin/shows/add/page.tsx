import AddShowForm from "@/components/admin-shows/add-show";
import PageTitle from "@/components/ui/page-title";

export default function AddMovie() {
  return (
    <>
      <div className="flex py-4 px-10 justify-between items-center">
        <PageTitle title=" افزودن سانس نمایش" />
      </div>
      <AddShowForm />
    </>
  );
}
