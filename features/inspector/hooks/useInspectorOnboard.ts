"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client/react";
import {
  VerifyMagicLinkDocument,
  SetPasswordDocument,
} from "@/graphql/generated/graphql";
import { setAuthCookies } from "@/lib/auth/token";
import { appToast } from "@/lib/toast";

import { z } from "zod";

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type PasswordValues = z.infer<typeof passwordSchema>;

export type OnboardStep = "verifying" | "set-password" | "done" | "error";

export function useInspectorOnboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState<OnboardStep>("verifying");
  const [inspectorName, setInspectorName] = useState("");

  const [verifyMagicLink] = useMutation(VerifyMagicLinkDocument);
  const [setPassword, { loading: isSubmitting }] =
    useMutation(SetPasswordDocument);

  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });

  // Step 1: Verify token on mount
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStep("error");
      return;
    }


    console.log(token);
    

    async function verify() {
      try {
        const { data } = await verifyMagicLink({
          variables: { token: token! },
        });

        if (data?.verifyMagicLink) {
          await setAuthCookies(data.verifyMagicLink.accessToken, {
            id: data.verifyMagicLink.id,
            email: data.verifyMagicLink.email,
            fullName: data.verifyMagicLink.fullName,
            role: data.verifyMagicLink.role,
          });

          setInspectorName(data.verifyMagicLink.fullName);
          setStep("set-password");
        }
      } catch {
        appToast.error({
          title: "Invalid or expired link",
          description: "Please ask admin to resend your invite",
        });
        setStep("error");
      }
    }
    verify();
  }, [searchParams, verifyMagicLink]);

  // Step 2: Submit password
  async function onSubmit(values: PasswordValues) {
    try {
      await setPassword({ variables: { password: values.password } });
      setStep("done");

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: any) {
      appToast.error({
        title: "Failed to set password",
        description: err?.graphQLErrors?.[0]?.message ?? "Please try again",
      });
    }
  }

  return {
    step,
    inspectorName,
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
  };
}
