"use client";

import { useInspectorLogin } from "@/features/inspector/hooks/useInspectorLogin";

export default function page() {
  const { form, onSubmit, loading } = useInspectorLogin();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-foreground mb-1">
          Inspector Portal
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to access your inspection assignments
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Email address
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="inspector@revelaafrica.com"
            className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-colors"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-[#E8A020]/20 focus:border-[#E8A020] transition-colors"
          />
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E8A020] text-white font-bold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </>
  );
}
