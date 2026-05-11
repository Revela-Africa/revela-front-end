import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const hostname = req.headers.get("host") ?? "";
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("revela_token")?.value;
  const userCookie = req.cookies.get("revela_user")?.value;

  // Parse user role from cookie
  let userRole: string | null = null;
  if (userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie));
      userRole = user.role ?? null;
    } catch {
      userRole = null;
    }
  }

  // ── Admin domain ───────────────────────────────────────
  const isAdminDomain =
    hostname.startsWith("admin.") ||
    hostname === "admin.revelaafrica.com" ||
    hostname.startsWith("admin.localhost");

  if (isAdminDomain) {
    // Not logged in → redirect to admin login
    if (!token && pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Logged in but not admin → redirect to main app
    if (token && userRole && userRole !== "ADMIN" && pathname !== "/login") {
      return NextResponse.redirect(
        new URL("https://revelaafrica.com/home", req.url),
      );
    }

    // Logged in as admin, trying to access login → redirect to dashboard
    if (token && userRole === "ADMIN" && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Rewrite admin domain to /admin/* routes
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.rewrite(new URL(`/admin${pathname}`, req.url));
  }




  
  // ── Inspector domain ────────────────────────────────────
  const isInspectorDomain =
    hostname.startsWith("inspector.") ||
    hostname === "inspector.revelaafrica.com" ||
    hostname.startsWith("inspector.localhost");

  if (isInspectorDomain) {
    const PUBLIC_INSPECTOR_ROUTES = ["/login", "/onboard"];

    const isPublicInspectorRoute = PUBLIC_INSPECTOR_ROUTES.includes(pathname);

    // ── Not authenticated ───────────────────────────────
    if (!token && !isPublicInspectorRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ── Wrong role ──────────────────────────────────────
    if (
      token &&
      userRole &&
      userRole !== "INSPECTOR" &&
      pathname !== "/login"
    ) {
      return NextResponse.redirect(
        new URL("https://revelaafrica.com/home", req.url),
      );
    }

    // ── Inspector already authenticated ────────────────
    if (token && userRole === "INSPECTOR" && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // ── Domain root → dashboard ────────────────────────
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/inspector/dashboard", req.url));
    }

    // ── Public onboarding route ────────────────────────
    if (pathname === "/onboard") {
      return NextResponse.rewrite(new URL("/inspector/onboard", req.url));
    }

    // ── Internal rewrite ───────────────────────────────
    return NextResponse.rewrite(new URL(`/inspector${pathname}`, req.url));
  }







  // ── Main app domain ────────────────────────────────────
  const PROTECTED_ROUTES = ["/home", "/intake", "/inventory", "/profile"];
  const AUTH_ROUTES = ["/login", "/signup"];

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // Not logged in → trying to access protected route
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged in → trying to access auth pages
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|assets|api).*)"],
};
