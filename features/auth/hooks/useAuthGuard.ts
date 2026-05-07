import { getUser, type StoredUser } from "@/lib/auth/token"
import { refreshToken } from "@/lib/auth/refresh"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type AuthGuardResult = {
  isAuthenticated: boolean
  isLoading: boolean
  user: StoredUser | null
}

// export function useAuthGuard(): AuthGuardResult {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(true)
//   const [user, setUser] = useState<StoredUser | null>(null)
//   const [authenticated, setAuthenticated] = useState(false)

//   useEffect(() => {
//     const storedUser = getUser()
//     const auth = !!storedUser

//     setAuthenticated(auth)
//     setUser(storedUser)
//     setIsLoading(false)

//     if (!auth) {
//       router.replace("/login")
//       return
//     }
//     // refreshToken()
//     const interval = setInterval(() => refreshToken(), 10 * 60 * 1000)
//     return () => clearInterval(interval)
//   }, [router])

//   return { isAuthenticated: authenticated, isLoading, user }
// }


export function useAuthGuard(): AuthGuardResult {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<StoredUser | null>(null)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    let mounted = true

    async function init() {
      const storedUser = getUser()
      const auth = !!storedUser

      if (!auth) {
        router.replace("/login")
        return
      }

      setUser(storedUser)
      setAuthenticated(true)

      await refreshToken() 

      if (mounted) setIsLoading(false)
    }

    init()

    return () => {
      mounted = false
    }
  }, [router])

  useEffect(() => {
    if (!authenticated) return

    const interval = setInterval(async () => {
      await refreshToken()
    }, 9 * 60 * 1000)

    return () => clearInterval(interval)
  }, [authenticated])

  return { isAuthenticated: authenticated, isLoading, user }
}