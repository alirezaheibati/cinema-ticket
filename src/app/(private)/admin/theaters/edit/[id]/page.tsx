import { getTheaterById } from "@/actions/theaters";
import EditTheaterForm from "@/components/admin-theaters/edit-theater";
import PageTitle from "@/components/ui/page-title";

export default async function EditTheaterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: theaterId } = await params;
  const theater = await getTheaterById(theaterId);
  if (!theater) {
    return (
      <div className="text-center text-red-600">
        خطایی رخ داده است. لطفا دوباره تلاش کنید.
      </div>
    );
  }
  return (
    <div className="w-full overflow-x-auto max-w-7xl mx-auto p-4 lg:p-0">
      <div className="flex py-4 px-10 justify-between items-center">
        <PageTitle title="ویرایش سینما" />
      </div>
      {theater.theater && <EditTheaterForm theater={theater.theater} />}
    </div>
  );
}
