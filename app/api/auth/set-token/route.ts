import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { accessToken, user } = await req.json()

  if (!accessToken) {
    return NextResponse.json(
      { error: "No token provided" },
      { status: 400 }
    )
  }

  const response = NextResponse.json({ success: true })

  // Set httpOnly cookie — JS can never read this
  response.cookies.set("revela_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })

  // Store non-sensitive user info in a readable cookie
  // (role, name etc — NOT the token)
  response.cookies.set("revela_user", JSON.stringify(user), {
    httpOnly: false,   // readable by JS — safe since it has no sensitive data
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return response
}