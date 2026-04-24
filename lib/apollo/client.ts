import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

const httpLink = createHttpLink({
  uri: "https://revela-api.onrender.com/graphql",
  credentials: "include", // send cookies with every request
})

const authLink = setContext(async (_, { headers }) => {
  // Token is in httpOnly cookie — browser sends it automatically
  // But since Apollo needs it in the Authorization header for this API,
  // we fetch it from our own Next.js route
  const res = await fetch("/api/auth/get-token")
  const { token } = await res.json()

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  }
})

const errorLink = onError((error) => {
  const graphQLErrors = (error as any).graphQLErrors
  const networkError = (error as any).networkError

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }: { message: string }) => {
      console.error("[GraphQL error]:", message)
      if (
        message.toLowerCase().includes("unauthorized") ||
        message.toLowerCase().includes("jwt")
      ) {
        fetch("/api/auth/clear-token", { method: "POST" }).then(() => {
          window.location.href = "/login"
        })
      }
    })
  }

  if (networkError) {
    console.error("[Network error]:", networkError)
  }
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})