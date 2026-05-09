// import { apolloClient } from "@/lib/apollo/client";
// import { RefreshTokenDocument } from "@/graphql/generated/graphql";

// let isRefreshing = false;

// export async function refreshToken(): Promise<string | null> {
//   if (isRefreshing) return null;
//   try {
//     isRefreshing = true;

//     const tokenRes = await fetch("/api/auth/get-token");
//     const { token } = await tokenRes.json();
//     if (!token) return null;

//     const { data, error } = await apolloClient.mutate({
//       mutation: RefreshTokenDocument,
//       fetchPolicy: "no-cache",
//     });

//     const newToken = data?.refresh;
//     if (!newToken) return null;

//     const userCookie = document.cookie
//       .split("; ")
//       .find((r) => r.startsWith("revela_user="))
//       ?.split("=")[1];

//     await fetch("/api/auth/set-token", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         accessToken: newToken,
//         user: userCookie ? JSON.parse(decodeURIComponent(userCookie)) : {},
//       }),
//     });

//     return newToken;
//   } catch (err) {
//     console.log("[Refresh] Failed:", err);
//     return null;
//   } finally {
//     isRefreshing = false; // ← always release lock
//   }
// }

import { apolloClient, invalidateTokenCache } from "@/lib/apollo/client";
import { RefreshTokenDocument } from "@/graphql/generated/graphql";

let isRefreshing = false;

export async function refreshToken(): Promise<string | null> {
  if (isRefreshing) return null;

  try {
    isRefreshing = true;

    const tokenRes = await fetch("/api/auth/get-token");
    const { token } = await tokenRes.json();
    if (!token) return null;

    const { data } = await apolloClient.mutate({
      mutation: RefreshTokenDocument,
      fetchPolicy: "no-cache",
    });

    const newToken = data?.refresh;
    if (!newToken) return null;

    const userCookie = document.cookie
      .split("; ")
      .find((r) => r.startsWith("revela_user="))
      ?.split("=")[1];

    await fetch("/api/auth/set-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken: newToken,
        user: userCookie ? JSON.parse(decodeURIComponent(userCookie)) : {},
      }),
    });

    // After storing new token — invalidate so next request fetches fresh
    invalidateTokenCache();

    return newToken;
  } catch {
    return null;
  } finally {
    isRefreshing = false;
  }
}
