import { NextRequest, NextResponse } from "next/server"

const PROTECTED_ROUTES = [
  "/home",
  "/intake", 
  "/inventory",
  "/profile",
]

const AUTH_ROUTES = [
  "/login",
  "/signup",
]

export function middleware(req: NextRequest) {
  const token = req.cookies.get("revela_token")?.value
  const pathname = req.nextUrl.pathname

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

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