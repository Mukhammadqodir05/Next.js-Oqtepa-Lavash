import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const protectedRoutes = ["/auth/signup"];
const protectedRoutes2 = ["/auth/signin"];


export default function middleware(req: NextRequest) {
  let isAuthenticated =  req.cookies.get('loggedin')   
  if (isAuthenticated && (protectedRoutes.includes(req.nextUrl.pathname) || protectedRoutes2.includes(req.nextUrl.pathname ))) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}