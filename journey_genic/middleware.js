
import { NextResponse } from "next/server";
import { parseJwt } from "./utils/jwtParser"; // Utility to parse JWT

// Role-specific route prefixes
const roleRoutes = {
  admin: "/admin",
  user: "/",
};

const publicRoutes = ["/login", "/signup"];
const privateRoutes = ["/admin","/admin/dashboard","/admin/booking","/admin/offers","/admin/profile","/admin/user","/admin/trips","/admin/places"];

export const middleware = (request) => {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("accessToken")?.value;

  // Allow static files and public assets
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // Allow public routes like login and signup
  if (publicRoutes.includes(url.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protect private and role-based routes
  if (token) {
    try {
      const { role, exp } = parseJwt(token);

      // Check token expiration
      if (Date.now() > exp * 1000) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("accessToken");
        return response;
      }

      if(url.pathname.startsWith('/doc')){
        return NextResponse.next();
      }
      if(url.pathname.startsWith('/api')){
        return NextResponse.next();
      }

      // Role-based access control
      if (role === "admin" && url.pathname.startsWith(roleRoutes.admin)) {
        return NextResponse.next();
      }

      if (role === "admin" && !(url.pathname.startsWith(roleRoutes.admin))) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }

    
      if (role === "client" &&!url.pathname.startsWith("/admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/", request.url));
    } catch {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect unauthenticated users accessing private or role-based routes
  if (privateRoutes.includes(url.pathname) || url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Default fallback
  return NextResponse.next();
};
