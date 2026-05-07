

// import { NextRequest, NextResponse } from "next/server"

// export function proxy(req: NextRequest) {
//   const hostname = req.headers.get("host") ?? ""
//   const pathname = req.nextUrl.pathname

//   // ── Admin domain ───────────────────────────────────────
//   const isAdminDomain =
//     hostname.startsWith("admin.") ||
//     hostname === "admin.revela-africa.com" ||
//     // For local dev — use admin.localhost:3000
//     hostname.startsWith("admin.localhost")

//   if (isAdminDomain) {
//     // Rewrite admin domain to /admin/* routes internally
//     // User sees admin.revela-africa.com/dashboard
//     // Next.js serves /admin/dashboard internally
//     return NextResponse.rewrite(
//       new URL(`/admin${pathname}`, req.url)
//     )
//   }

//   // ── Main app domain ────────────────────────────────────
//   const token = req.cookies.get("revela_token")?.value

//   const PROTECTED_ROUTES = ["/home", "/intake", "/inventory", "/profile"]
//   const AUTH_ROUTES = ["/login", "/signup"]

//   const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r))
//   const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r))

//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/login", req.url))
//   }

//   if (isAuthRoute && token) {
//     return NextResponse.redirect(new URL("/home", req.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|assets|api).*)"],
// }


import { NextRequest, NextResponse } from "next/server"

export function proxy(req: NextRequest) {
  const hostname = req.headers.get("host") ?? ""
  const pathname = req.nextUrl.pathname
  const token = req.cookies.get("revela_token")?.value
  const userCookie = req.cookies.get("revela_user")?.value

  // Parse user role from cookie
  let userRole: string | null = null
  if (userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie))
      userRole = user.role ?? null
    } catch {
      userRole = null
    }
  }

  // ── Admin domain ───────────────────────────────────────
  const isAdminDomain =
    hostname.startsWith("admin.") ||
    hostname === "admin.revelaafrica.com" ||
    hostname.startsWith("admin.localhost")

  if (isAdminDomain) {
    // Not logged in → redirect to admin login
    if (!token && pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Logged in but not admin → redirect to main app
    if (token && userRole && userRole !== "ADMIN" && pathname !== "/login") {
      return NextResponse.redirect(new URL("https://revela.com/home", req.url))
    }

    // Logged in as admin, trying to access login → redirect to dashboard
    if (token && userRole === "ADMIN" && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Rewrite admin domain to /admin/* routes
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.rewrite(
      new URL(`/admin${pathname}`, req.url)
    )
  }

  // ── Main app domain ────────────────────────────────────
  const PROTECTED_ROUTES = ["/home", "/intake", "/inventory", "/profile"]
  const AUTH_ROUTES = ["/login", "/signup"]

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r))

  // Not logged in → trying to access protected route
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Logged in → trying to access auth pages
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/home", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|assets|api).*)",
  ],
}