import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { appToast } from "../toast";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

const authLink = new SetContextLink(async (prevContext) => {
  try {
    const res = await fetch("/api/auth/get-token");
    const { token } = await res.json();
    return {
      headers: {
        ...prevContext.headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    };
  } catch {
    return { headers: prevContext.headers };
  }
});

const errorLink = new ErrorLink((error) => {
  const graphQLErrors = (error as any).graphQLErrors;
  const networkError = (error as any).networkError;

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }: { message: string }) => {
      const lower = message.toLowerCase();
      const isAuthError =
        lower.includes("unauthorized") ||
        lower.includes("jwt") ||
        lower.includes("invalid or expired token") ||
        lower.includes("invalid token") ||
        lower.includes("token expired");

      if (isAuthError) {
        appToast.error({
          title: "Session expired",
          description: "Please sign in again",
        });
        setTimeout(() => {
          fetch("/api/auth/clear-token", { method: "POST" }).then(() => {
            window.location.href = "/login";
          });
        }, 1500); // ← brief delay so user sees the toast
        return;
      }

      // Show toast for other GraphQL errors too
      appToast.error({
        title: "Something went wrong",
        description: message,
      });
    });
  }

  if (networkError) {
    appToast.error({
      title: "Network Error",
      description: "Check your internet connection",
    });
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
