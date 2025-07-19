import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const url = req.nextUrl;

  const publicRoutes = ["/dashboard/login", "/dashboard/register"];
  const isPublicRoute = publicRoutes.includes(url.pathname);

  if (!token?.value && !isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }

  let role: string | undefined;

  if (token?.value) {
    try {
      const decoded = jwt.decode(token.value) as JwtPayload | null;
      role = decoded?.role;
    } catch (err) {
      console.error("Token decode error", err);

      const response = NextResponse.redirect(
        new URL("/dashboard/login", req.url)
      );
      response.cookies.delete("token");
      return response;
    }
  }

  if (role && url.pathname === "/dashboard/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
