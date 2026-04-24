export interface StoredUser {
  id: string
  email: string
  fullName: string
  role: string
}

// Set token + user via Next.js API route (sets httpOnly cookie)
export async function setAuthCookies(
  accessToken: string,
  user: StoredUser
): Promise<void> {
  await fetch("/api/auth/set-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken, user }),
  })
}

// Clear both cookies via Next.js API route
export async function clearAuthCookies(): Promise<void> {
  await fetch("/api/auth/clear-token", {
    method: "POST",
  })
}

// Read user from the readable cookie (client-side)
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

// Check if authenticated (client-side readable cookie check)
export async function checkIsAuthenticated(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/get-token")
    const { token } = await res.json()
    return !!token
  } catch {
    return false
  }
}