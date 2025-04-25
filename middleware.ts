import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (token && req.nextUrl.pathname === "/dashboard/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (
    !token &&
    req.nextUrl.pathname.startsWith("/dashboard") &&
    req.nextUrl.pathname !== "/dashboard/login"
  ) {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard/login"],
};
