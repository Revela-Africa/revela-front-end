// import { NextRequest, NextResponse } from "next/server"

// const PROTECTED_ROUTES = [
//   "/home",
//   "/intake",
//   "/inventory",
//   "/profile",
// ]

// const AUTH_ROUTES = [
//   "/login",
//   "/signup",
// ]

// export function proxy(req: NextRequest) {

//   const token = req.cookies.get("revela_token")?.value
//   const pathname = req.nextUrl.pathname

//   const isProtected = PROTECTED_ROUTES.some((route) =>
//     pathname.startsWith(route)
//   )
//   const isAuthRoute = AUTH_ROUTES.some((route) =>
//     pathname.startsWith(route)
//   )

//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/login", req.url))
//   }

//   if (isAuthRoute && token) {
//     return NextResponse.redirect(new URL("/home", req.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|icons|assets|api).*)",
//   ],
// }

import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const hostname = req.headers.get("host") ?? "";
  const pathname = req.nextUrl.pathname;

  // ── Admin domain ───────────────────────────────────────
  const isAdminDomain =
    hostname.startsWith("admin.") ||
    hostname === "admin.revela-africa.com" ||
    // For local dev — use admin.localhost:3000
    hostname.startsWith("admin.localhost");

  if (isAdminDomain) {
    // Rewrite admin domain to /admin/* routes internally
    // User sees admin.revela-africa.com/dashboard
    // Next.js serves /admin/dashboard internally
    return NextResponse.rewrite(new URL(`/admin${pathname}`, req.url));
  }

  // ── Main app domain ────────────────────────────────────
  const token = req.cookies.get("revela_token")?.value;

  const PROTECTED_ROUTES = ["/home", "/intake", "/inventory", "/profile"];
  const AUTH_ROUTES = ["/login", "/signup"];

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|assets|api).*)"],
};
