import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get("jwt-token")?.value ?? "";

    const isPrivate =
      pathname.startsWith("/user") || pathname.startsWith("/admin");

    if (isPrivate) {
      if (!token || token.trim() === "") {
        return NextResponse.redirect(new URL("/?form=login", request.url));
      } else {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

        // Validate token format before verifying
        if (token.split(".").length !== 3) {
          throw new Error("Malformed JWT");
        }

        const verifyResult = await jwtVerify(token, secret);
        if (
          verifyResult.payload.userId &&
          verifyResult.payload.exp &&
          verifyResult.payload.exp * 1000 > new Date().getTime()
        ) {
          if (
            pathname.startsWith("/user") &&
            verifyResult.payload.role === "user"
          ) {
            const response = NextResponse.next();
            const userId = String(verifyResult.payload.userId ?? "");
            response.headers.set("user-id", userId);
            return response;
          } else if (
            pathname.startsWith("/user") &&
            verifyResult.payload.role !== "user"
          ) {
            return NextResponse.redirect(
              new URL("/admin/dashboard", request.url)
            );
          } else if (
            pathname.startsWith("/admin") &&
            verifyResult.payload.role !== "admin"
          ) {
            return NextResponse.redirect(
              new URL("/user/dashboard", request.url)
            );
          } else {
            return NextResponse.next();
          }
        } else {
          return NextResponse.redirect(new URL("/?form=login", request.url));
        }
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.log("Invalid token:", err);
    return NextResponse.redirect(new URL("/?form=login", request.url));
  }
}
