import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAuthPage = nextUrl.pathname.startsWith("/login") || 
         nextUrl.pathname.startsWith("/signup")

      if (isOnAuthPage) {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl))
        return true
      }

      return true // open for now, we'll lock routes down later
    },
  },
  providers: [], // we'll add phone/OTP provider when backend is ready
}