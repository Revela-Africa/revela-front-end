"use client"

import { useRouter } from "next/navigation"
import { Home, ArrowLeft, SearchX } from "lucide-react"

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6">
      <div className="w-full max-w-[448px] text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFF7E4]">
          <SearchX size={36} className="text-[#E8A020]" />
        </div>

        {/* Code */}
        <p className="mt-6 text-7xl font-extrabold tracking-tight text-[#171D17]">
          404
        </p>

        {/* Message */}
        <h1 className="mt-2 text-lg font-bold text-[#171D17]">
          Page not found
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-[#6A6A6A]">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => router.back()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#E7E1D8] bg-white px-6 text-sm font-bold text-[#171D17] transition-colors hover:bg-[#F7F2EB] active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Footer hint */}
        <p className="mt-8 text-xs text-[#BFC9C3]">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  )
}