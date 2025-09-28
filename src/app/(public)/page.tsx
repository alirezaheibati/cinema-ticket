import Overlay from "@/components/landing-page/Overlay";
import TopNav from "@/components/landing-page/TopNav";
import { Suspense } from "react";
export default function HomePage() {
  return (
    <div className="w-screen h-screen background bg-[url(/assets/header-bg.jpg)] bg-bottom-right bg-no-repeat bg-cover flex flex-col">
      <Suspense fallback={null}>
        <TopNav />
      </Suspense>
      <Overlay />
    </div>
  );
}
