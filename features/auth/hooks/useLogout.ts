import { useRouter } from "next/navigation"
import { useMutation } from "@apollo/client/react"
import { LogoutDocument } from "@/graphql/generated/graphql"
import { clearAuthCookies } from "@/lib/auth/token"
import { useState } from "react"

export function useLogout() {
  const router = useRouter()
  const [logoutMutation] = useMutation(LogoutDocument)
  const [isLoading, setIsLoading] = useState(false)

  async function logout() {
    setIsLoading(true)
    try {
      await logoutMutation()
      await clearAuthCookies()
      router.replace("/login")
    } catch {
      // Even if backend fails — clear cookies and redirect
      // User should never be stuck logged in
      await clearAuthCookies()
      router.replace("/login")
    } finally {
      setIsLoading(false)
    }
  }

  return { logout, isLoading }
}