import type { Metadata } from "next";
import { El_Messiri, Vazirmatn } from "next/font/google";
import "./globals.css";

const elMessiri = El_Messiri({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  weight: ["400", "900"],
});

export const metadata: Metadata = {
  title: "Cinema ticket",
  description: "Online cinema ticket booking service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body
        className={`${elMessiri.className} ${vazirmatn.className}`}
        dir="rtl"
      >
        {children}
      </body>
    </html>
  );
}
