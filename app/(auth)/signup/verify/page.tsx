"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignupStore } from "@/features/auth/store/useSignupStore";
import { Button } from "@/components/ui/button";
import { MailOpen } from "lucide-react";
import { setAuthCookies } from "@/lib/auth/token";
import { useMutation } from "@apollo/client/react";
import {
  LoginDocument,
  VerifyOtpDocument,
  VerifyMagicLinkDocument,
} from "@/graphql/generated/graphql";
import { appToast } from "@/lib/toast";

const OTP_LENGTH = 4;

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tempEmail, tempPassword, clearTempCredentials, reset } =
    useSignupStore();

  const [verifyOtp] = useMutation(VerifyOtpDocument);
  const [login] = useMutation(LoginDocument);
  const [verifyMagicLink] = useMutation(VerifyMagicLinkDocument);

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [autoSubmitting, setAutoSubmitting] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const emailFromUrl = searchParams.get("email");
  const emailToUse = tempEmail ?? emailFromUrl;

  // TODO: Refactor entire page, abstract logic from ui

  // ── Magic link handling ────────────────────────────────
  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) return;

    // Long token = magic link from backend
    // Short 4-digit token = old OTP pre-fill (keep as fallback)
    if (/^\d{4}$/.test(token)) {
      // 4 digit OTP pre-fill
      const digits = token.split("");
      setOtp(digits);
      setAutoSubmitting(true);
      setTimeout(() => handleOtpVerify(token, email), 800);
    } else {
      // Magic link — verify directly
      setAutoSubmitting(true);
      handleMagicLink(token);
    }
  }, [searchParams]);

  // ── Magic link verify ──────────────────────────────────
  async function handleMagicLink(token: string) {
    setIsVerifying(true);
    setError("");

    try {
      const { data } = await verifyMagicLink({
        variables: { token },
      });

      if (data?.verifyMagicLink) {
        await setAuthCookies(data.verifyMagicLink.accessToken, {
          id: data.verifyMagicLink.id,
          email: data.verifyMagicLink.email,
          fullName: data.verifyMagicLink.fullName,
          role: data.verifyMagicLink.role,
        });

        clearTempCredentials();
        reset();
        router.push("/home");
      }
    } catch (err: any) {
      const message =
        err?.graphQLErrors?.[0]?.message ??
        err?.message ??
        "Magic link is invalid or expired.";
      appToast.error({
        title: "Login failed",
        description: message,
      });
    } finally {
      setIsVerifying(false);
      setAutoSubmitting(false);
    }
  }

  // ── OTP verify + auto login ────────────────────────────
  async function handleOtpVerify(code: string, email?: string) {
    const emailToUse = email ?? tempEmail;
    if (!emailToUse) return;
    if (code.length !== OTP_LENGTH) return;

    setIsVerifying(true);
    setError("");

    try {
      // Step 1 — verify OTP
      await verifyOtp({
        variables: {
          input: {
            email: emailToUse,
            code,
          },
        },
      });

      // Step 2 — auto login with temp credentials
      const { data } = await login({
        variables: {
          input: {
            email: emailToUse,
            password: tempPassword!,
          },
        },
      });

      if (data?.login) {
        await setAuthCookies(data.login.accessToken, {
          id: data.login.id,
          email: data.login.email,
          fullName: data.login.fullName,
          role: data.login.role,
        });

        clearTempCredentials();
        reset();
        router.push("/home");
      }
    } catch (err: any) {
      const message =
        err?.graphQLErrors?.[0]?.message ??
        err?.message ??
        "Invalid or expired code. Please try again.";
      appToast.error({
        title: "Login failed",
        description: message,
      });
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
      setAutoSubmitting(false);
    }
  }

  // ── Focus management ───────────────────────────────────
  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError("");

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((d) => d !== "") && digit) {
      handleOtpVerify(newOtp.join(""));
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (pasted.length !== OTP_LENGTH) return;
    const digits = pasted.split("");
    setOtp(digits);
    inputRefs.current[OTP_LENGTH - 1]?.focus();
    setTimeout(() => handleOtpVerify(pasted), 100);
  }

  // ── Resend ─────────────────────────────────────────────
  async function handleResend() {
    setIsResending(true);
    setError("");
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();

    // --- STUBBED: resend OTP mutation ---
    console.log("Resending OTP to:", tempEmail);
    await new Promise((r) => setTimeout(r, 1000));
    // ------------------------------------

    setIsResending(false);
  }

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="font-cabinet">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-14 h-14 rounded-full bg-[#FFF7E4] flex items-center justify-center mb-4">
          <MailOpen size={24} className="text-[#E8A020]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#D4900A]">
          Check your email
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          We sent a verification code to{" "}
          <span className="font-medium text-foreground">
            {tempEmail ?? "your email"}
          </span>
          . Enter it below or click the magic link in the email.
        </p>
      </div>

      {/* Auto submitting indicator */}
      {autoSubmitting && (
        <p className="text-xs text-[#E8A020] text-center mb-4 animate-pulse">
          Magic link detected — verifying...
        </p>
      )}

      {/* OTP inputs — hidden when magic link is being processed */}
      {!autoSubmitting && (
        <>
          <div className="flex gap-2 justify-center mb-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isVerifying}
                className={`w-11 h-13 text-center text-lg font-bold border rounded-xl outline-none transition-all
                  bg-[#FFF9F0]
                  ${digit ? "border-[#E8A020] text-[#E8A020]" : "border-border text-foreground"}
                  focus:border-[#E8A020] focus:ring-2 focus:ring-[#E8A020]/20
                  disabled:opacity-50
                `}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-destructive text-center mt-2">{error}</p>
          )}

          <div className="mt-6">
            <Button
              onClick={() =>
                handleOtpVerify(otp.join(""), emailToUse ?? undefined)
              }
              disabled={!isComplete || isVerifying || !emailToUse}
              className="w-full text-white"
            >
              {isVerifying ? "Verifying..." : "Confirm"}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Didn't receive a code?{" "}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-[#E8A020] font-bold hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend"}
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-40">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
