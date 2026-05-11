"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@apollo/client/react"
import { LoginDocument } from "@/graphql/generated/graphql"
import { setAuthCookies } from "@/lib/auth/token"
import { useRouter } from "next/navigation"
import { appToast } from "@/lib/toast"

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

type Values = z.infer<typeof schema>

export default function page() {
  const router = useRouter()
  const [login, { loading }] = useMutation(LoginDocument)

  const { register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: Values) {
    try {
      const { data } = await login({
        variables: { input: values },
      })

      if (data?.login) {
        if (data.login.role !== "ADMIN") {
          appToast.error({
            title: "Access denied",
            description: "This portal is for admins only",
          })
          return
        }

        await setAuthCookies(data.login.accessToken, {
          id: data.login.id,
          email: data.login.email,
          fullName: data.login.fullName,
          role: data.login.role,
        })

        router.push("/dashboard")
      }
    } catch (err: any) {
      appToast.error({
        title: "Login failed",
        description: err?.graphQLErrors?.[0]?.message ?? "Invalid credentials",
      })

      // console.log(err);
      
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center p-4 font-cabinet">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src="/icons/primary-logo.svg" alt="Revela" className="h-8 w-auto" />
          <span className="text-xs font-bold bg-[#E8A020] text-white px-2 py-0.5 rounded">
            ADMIN
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
          <h1 className="text-xl font-extrabold text-foreground mb-1">
            Admin Portal
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to manage Revela operations
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="admin@revelaafrica.com"
                className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-ring"
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
                className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
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
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Revela Admin Portal · Restricted Access
        </p>
      </div>
    </div>
  )
}