// import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
// import { SetContextLink } from "@apollo/client/link/context";
// import { ErrorLink } from "@apollo/client/link/error";
// import { appToast } from "../toast";

// const httpLink = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_API_URL,
//   credentials: "include",
// });

// const authLink = new SetContextLink(async (prevContext) => {
//   try {
//     const res = await fetch("/api/auth/get-token");
//     const { token } = await res.json();
//     return {
//       headers: {
//         ...prevContext.headers,
//         ...(token ? { authorization: `Bearer ${token}` } : {}),
//       },
//     };
//   } catch {
//     return { headers: prevContext.headers };
//   }
// });

// const errorLink = new ErrorLink((error) => {
//   const graphQLErrors = (error as any).graphQLErrors;
//   const networkError = (error as any).networkError;

//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message }: { message: string }) => {
//       const lower = message.toLowerCase();
//       const isAuthError =
//         lower.includes("unauthorized") ||
//         lower.includes("jwt") ||
//         lower.includes("invalid or expired token") ||
//         lower.includes("invalid token") ||
//         lower.includes("token expired");

//       if (isAuthError) {
//         appToast.error({
//           title: "Session expired",
//           description: "Please sign in again",
//         });
//         setTimeout(() => {
//           fetch("/api/auth/clear-token", { method: "POST" }).then(() => {
//             window.location.href = "/login";
//           });
//         }, 1500); // ← brief delay so user sees the toast
//         return;
//       }

//       // Show toast for other GraphQL errors too
//       appToast.error({
//         title: "Something went wrong",
//         description: message,
//       });
//     });
//   }

//   if (networkError) {
//     appToast.error({
//       title: "Network Error",
//       description: "Check your internet connection",
//     });
//   }
// });

// export const apolloClient = new ApolloClient({
//   link: from([errorLink, authLink, httpLink]),
//   cache: new InMemoryCache(),
// });


import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"
import { ErrorLink } from "@apollo/client/link/error"
import { appToast } from "@/lib/toast"

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
})

// ── Token cache ────────────────────────────────────────────
let cachedToken: string | null = null
let fetchPromise: Promise<string | null> | null = null

async function getToken(): Promise<string | null> {
  // Return cached token — no fetch needed
  if (cachedToken) return cachedToken

  // All concurrent requests share ONE fetch promise
  // This prevents 10 simultaneous get-token calls
  if (!fetchPromise) {
    fetchPromise = fetch("/api/auth/get-token")
      .then((res) => res.json())
      .then(({ token }) => {
        cachedToken = token ?? null
        fetchPromise = null
        return cachedToken
      })
      .catch(() => {
        fetchPromise = null
        return null
      })
  }

  return fetchPromise
}

// Only clears token value — does NOT clear the in-flight promise
// This means concurrent requests still share the same fetch
export function clearTokenCache() {
  cachedToken = null
  // Don't clear fetchPromise here — let it complete
}

// Called after refresh stores new token — force fresh fetch next time
export function invalidateTokenCache() {
  cachedToken = null
  fetchPromise = null
}

// ── Links ──────────────────────────────────────────────────
const authLink = new SetContextLink(async (prevContext) => {
  const token = await getToken()
  return {
    headers: {
      ...prevContext.headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  }
})

function isAuthError(message: string): boolean {
  const lower = message.toLowerCase()
  return (
    lower.includes("unauthorized") ||
    lower.includes("jwt") ||
    lower.includes("invalid or expired token") ||
    lower.includes("invalid token") ||
    lower.includes("token expired")
  )
}

const errorLink = new ErrorLink((error) => {
  const graphQLErrors = (error as any).graphQLErrors
  const networkError = (error as any).networkError

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }: { message: string }) => {
      if (isAuthError(message)) {
        invalidateTokenCache()
        appToast.error({
          title: "Session expired",
          description: "Please sign in again",
        })
        setTimeout(() => {
          fetch("/api/auth/clear-token", { method: "POST" }).then(() => {
            window.location.href = "/login"
          })
        }, 1500)
        return
      }
      appToast.error({
        title: "Something went wrong",
        description: message,
      })
    })
  }

  if (networkError) {
    appToast.error({
      title: "Network Error",
      description: "Check your internet connection",
    })
  }
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})