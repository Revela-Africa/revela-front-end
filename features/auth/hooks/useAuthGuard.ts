import { checkIsAuthenticated, getUser, type StoredUser } from "@/lib/auth/token"
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
    async function check() {
      const auth = await checkIsAuthenticated()
      const storedUser = getUser() // reads revela_user (not httpOnly)

      setAuthenticated(auth)
      setUser(storedUser)
      setIsLoading(false)

      if (!auth) {
        router.replace("/login")
      }
    }

    check()
  }, [router])

  return { isAuthenticated: authenticated, isLoading, user }
}