"use client"

import { useEffect } from "react"
import { appToast } from "@/lib/toast"

export function useNetworkStatus() {
  useEffect(() => {
    function handleOffline() {
      appToast.error({
        title: "No internet connection",
        description: "Please check your network and try again",
      })
    }

    function handleOnline() {
      appToast.success({
        title: "Back online",
        description: "Your connection has been restored",
      })
    }

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("offlne", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [])
}