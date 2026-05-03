"use client"

import { EnvBadge } from "@/components/EnvBadge"
import { apolloClient } from "@/lib/apollo/client"

import { ApolloProvider } from "@apollo/client/react"




export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
      <EnvBadge/>
    </ApolloProvider>
  )
}