import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("Middleware triggered for:", req.nextUrl.pathname);
  const { pathname } = req.nextUrl;

  const userToken = req.cookies.get("usertoken")?.value;
  const adminToken = req.cookies.get("admintoken")?.value;

  // Protect /signup/adminlogin/* routes
  if (pathname.startsWith("/signup/adminlogin")) {
    if (userToken) {
      console.log("User token present for admin route");
      return NextResponse.redirect(new URL("/signup/loginasadmin", req.url));
    }
    if (!adminToken) {
      console.log(" No admin token");
      return NextResponse.redirect(new URL("/signup/loginasadmin", req.url));
    }
    try {
      // Call backend to verify admin token
      const response = await fetch("http://localhost:5000/api/verify-admin-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: adminToken }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok || data.role !== "admin") {
        console.log("Invalid admin token or role");
        return NextResponse.redirect(new URL("/signup/loginasadmin", req.url));
      }
    } catch (err) {
      console.error("Admin token verification error:", err.message);
      return NextResponse.redirect(new URL("/signup/loginasadmin", req.url));
    }
  }

  // Protect /signup/userlogin/* routes
  if (pathname.startsWith("/signup/userlogin")) {
    if (adminToken) {
      console.log("Admin token present for user route");
      return NextResponse.redirect(new URL("/signup/loginasuser", req.url));
    }
    if (!userToken) {
      console.log("No user token");
      return NextResponse.redirect(new URL("/signup/loginasuser", req.url));
    }
    try {
      // Call backend to verify user token
      const response = await fetch("http://localhost:5000/api/verify-user-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: userToken }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok || data.role === "admin") {
        console.log("Invalid user token or admin role");
        return NextResponse.redirect(new URL("/signup/loginasuser", req.url));
      }
    } catch (err) {
      console.error("User token verification error:", err.message);
      return NextResponse.redirect(new URL("/signup/loginasuser", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signup/adminlogin/:path*", "/signup/userlogin/:path*"],
};