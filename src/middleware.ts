import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get("jwt-token")?.value;

    const isPrivate =
      pathname.startsWith("/user") || pathname.startsWith("/admin");
    if (isPrivate && !token) {
      return NextResponse.redirect(new URL("/?form=login", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log("middleware error:" + err);
    return NextResponse.redirect(new URL("/?form=login", request.url));
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
