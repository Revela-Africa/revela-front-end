"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { LoginDocument } from "@/graphql/generated/graphql";
import { setAuthCookies } from "@/lib/auth/token";
import { appToast } from "@/lib/toast";



import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export function useInspectorLogin() {
  const router = useRouter();
  const [login, { loading }] = useMutation(LoginDocument);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginValues) {
    try {
      const { data } = await login({
        variables: { input: values },
      });

      if (!data?.login) return;

      if (data.login.role !== "INSPECTOR") {
        appToast.error({
          title: "Access denied",
          description: "This portal is for inspectors only",
        });
        return;
      }

      await setAuthCookies(data.login.accessToken, {
        id: data.login.id,
        email: data.login.email,
        fullName: data.login.fullName,
        role: data.login.role,
      });

      router.push("/dashboard");
    } catch (err: any) {
      appToast.error({
        title: "Login failed",
        description: err?.graphQLErrors?.[0]?.message ?? "Invalid credentials",
      });
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    loading,
  };
}