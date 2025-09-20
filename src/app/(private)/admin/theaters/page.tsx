import PageTitle from "@/components/ui/page-title";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageCircleWarning, SquarePen } from "lucide-react";
import { convertToPersianDigits } from "@/helpers/convertToPersianDigits";
import RemoveBtn from "@/components/ui/remove-btn";
import { deleteTheater, getAllTheaters } from "@/actions/theaters";
import TheaterFeature from "@/components/admin-theaters/theater-faeture";
import { theaterEquipments } from "@/constants";
export default async function AdminTheatersPage() {
  const theatersResponse = await getAllTheaters();
  if (!theatersResponse.success) {
    return (
      <div className="absolute flex gap-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-destructive">
        <MessageCircleWarning />
        <p className="text-lg">
          اطلاعات سالن ها یافت نشد. لطفا لحظاتی بعد دوباره تلاش کنید.
        </p>
      </div>
    );
  }
  const theaters = theatersResponse.theaters;
  return (
    <>
      <div className="flex py-4 mx-auto max-w-7xl justify-between items-center">
        <PageTitle title="سالن های سینما" />
        <Link
          href={"/admin/theaters/add"}
          className="bg-primary text-white/90 rounded-sm px-6 py-2 active:scale-95"
        >
          افزودن سالن
        </Link>
      </div>
      <div className="w-full max-w-7xl mx-auto p-4 lg:p-0 overflow-x-scroll no-scroll-bar">
        {theatersResponse.theaters.length > 0 ? (
          <Table className="w-full min-w-2xl border" dir="rtl" align="center">
            <TableHeader>
              <TableRow className="bg-primary/20 " dir="rtl">
                <TableHead className="border font-bold w-[5%]">#</TableHead>
                <TableHead className="border font-bold w-[15%]">نام</TableHead>
                <TableHead className="border font-bold w-[30%]">آدرس</TableHead>
                <TableHead className="border font-bold w-[30%]">
                  ویژگی ها
                </TableHead>
                <TableHead className="border font-bold w-[10%]">
                  گنجایش
                </TableHead>
                <TableHead className="border font-bold w-[10%]">
                  عملیات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {theaters.map((theater, idx) => {
                //map selected features of theater to theater info object(label, icon, id)
                const selectedFeatures = JSON.parse(theater.features).map(
                  (feature: string) => {
                    const featureIndex = theaterEquipments.findIndex(
                      (equipment) => equipment.id === feature
                    );
                    if (featureIndex !== -1)
                      return theaterEquipments[featureIndex];
                  }
                );
                return (
                  <TableRow
                    key={theater.id}
                    className="nth-of-type-[even]:bg-gray-100"
                  >
                    <TableCell className="font-medium border" align="center">
                      {convertToPersianDigits(idx + 1)}
                    </TableCell>
                    <TableCell className="font-medium border">
                      {theater.name}
                    </TableCell>
                    <TableCell className="border" align="center">
                      {theater.address}
                    </TableCell>
                    <TableCell className="border" align="center">
                      <div className="flex flex-wrap gap-2 justify-center items-center">
                        {selectedFeatures.map(
                          (item: {
                            id: string;
                            label: string;
                            icon: string;
                          }) => {
                            return (
                              <TheaterFeature
                                key={`${item.id} - ${theater.id}`}
                                label={item.label}
                                icon={item.icon}
                              />
                            );
                          }
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="border" align="center">
                      <span className="text-base">
                        {convertToPersianDigits(theater.capacity)}
                      </span>
                      <span className="mr-1 text-[10px]">نفر</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center gap-2">
                        <Link
                          href={`/admin/theaters/edit/${theater.id}`}
                          title="ویرایش"
                        >
                          <SquarePen size={18} />
                        </Link>
                        <RemoveBtn id={theater.id} removeFn={deleteTheater} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="absolute flex gap-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-destructive">
            <MessageCircleWarning />
            <p className="text-lg">
              هیچ سالنی در سیستم یافت نشد. میتوانید از دکمه بالا برای ثبت سالن
              استفاده کنید.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
