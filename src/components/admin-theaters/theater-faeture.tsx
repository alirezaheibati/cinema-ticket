import Image from "next/image";
interface TheaterFeatureProps {
  label: string;
  icon: string;
}
export default function TheaterFeature({ label, icon }: TheaterFeatureProps) {
  return (
    <div className="flex justify-start items-center gap-1.5 border rounded-lg bg-gray-50 px-2 py-1 w-max">
      <Image
        src={`/assets/features/${icon}`}
        alt={label}
        width={14}
        height={14}
      />
      <p className="text-xs">{label}</p>
    </div>
  );
}
