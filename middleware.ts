import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/auth/signup", "/auth/signin"];
const protectedRoutes2 = ["/user", "/user/update-profile", "checkout", "user/orders"];

export default function middleware(req: NextRequest) {
  let isAuthenticated = req.cookies.get('loggedin');
  
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  } else if (!isAuthenticated && protectedRoutes2.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  else if (isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}
