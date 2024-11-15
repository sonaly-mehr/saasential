
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // If there's no token, the user is not authenticated
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login"; // Redirect to login page or any route you want
    return NextResponse.redirect(url);
  }
  
  // Continue if the user is authenticated
  return NextResponse.next();
}

// Define the middleware to apply only to protected routes
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
  ],
};