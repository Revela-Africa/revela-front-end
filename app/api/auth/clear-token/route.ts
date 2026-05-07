import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ success: true })

  response.cookies.delete("revela_token")
  response.cookies.delete("revela_user")

  return response
}

// import { NextResponse } from "next/server"

// export async function POST() {
//   const response = NextResponse.json({ success: true })

//   // Clear both cookies with same settings they were set with
//   response.cookies.set("revela_token", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: 0, // ← expires immediately
//     path: "/",
//   })

//   response.cookies.set("revela_user", "", {
//     httpOnly: false,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: 0, // ← expires immediately
//     path: "/",
//   })

//   return response
// }