import { clearTokenCache, invalidateTokenCache } from "@/lib/apollo/client"
export interface StoredUser {
  id: string
  email: string
  fullName: string
  role: string
}

// export async function setAuthCookies(
//   accessToken: string,
//   user: StoredUser
// ): Promise<void> {
//   await fetch("/api/auth/set-token", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ accessToken, user }),
//   })
// }

// export async function clearAuthCookies(): Promise<void> {
//   await fetch("/api/auth/clear-token", { method: "POST" })
// }


export async function setAuthCookies(
  accessToken: string,
  user: StoredUser
): Promise<void> {
  invalidateTokenCache() // ← full reset on new login
  await fetch("/api/auth/set-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken, user }),
  })
}


export async function clearAuthCookies(): Promise<void> {
  invalidateTokenCache() // ← full reset on logout
  await fetch("/api/auth/clear-token", { method: "POST" })
}

export function getUser(): StoredUser | null {
  if (typeof document === "undefined") return null

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("revela_user="))

  if (!match) return null

  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1]))
  } catch {
    return null
  }
}