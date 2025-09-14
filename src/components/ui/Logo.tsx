import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src={"/assets/logo.png"}
      alt="cinema ticket logo"
      width={60}
      height={60}
      title="cinema ticket logo"
    />
  );
}
