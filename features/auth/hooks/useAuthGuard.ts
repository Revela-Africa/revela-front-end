import { getUser, type StoredUser } from "@/lib/auth/token"
import { refreshToken } from "@/lib/auth/refresh"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type AuthGuardResult = {
  isAuthenticated: boolean
  isLoading: boolean
  user: StoredUser | null
}

export function useAuthGuard(): AuthGuardResult {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<StoredUser | null>(null)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const storedUser = getUser()
    const auth = !!storedUser

    setAuthenticated(auth)
    setUser(storedUser)
    setIsLoading(false)

    if (!auth) {
      router.replace("/login")
      return
    }
    // refreshToken()
    const interval = setInterval(() => refreshToken(), 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [router])

  return { isAuthenticated: authenticated, isLoading, user }
}