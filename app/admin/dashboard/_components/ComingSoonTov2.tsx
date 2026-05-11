"use client"

import { useRouter } from "next/navigation"
import { Rocket, ArrowLeft, Sparkles, Clock, Wrench } from "lucide-react"

export default function ComingSoonTov2() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6">
      <div className="w-full max-w-md text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E7E1D8] bg-white px-4 py-2 shadow-sm">
          <Sparkles size={14} className="text-[#E8A020]" />
          <span className="text-xs font-bold uppercase tracking-wide text-[#6A6A6A]">
            Revela v2
          </span>
        </div>

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFF7E4]">
          <Rocket size={36} className="text-[#E8A020]" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#171D17]">
          Coming Soon
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#6A6A6A]">
          This feature is currently in development and will ship with{" "}
          <span className="font-bold text-[#171D17]">Revela v2</span>. We are
          building something great for your operations.
        </p>

        {/* Teaser list */}
        <div className="mt-8 space-y-3">
          {[
            { icon: Wrench, label: "Advanced analytics & reporting" },
            { icon: Clock, label: "Real-time inspector tracking" },
            { icon: Sparkles, label: "AI-powered valuation insights" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-[#E7E1D8] bg-white px-4 py-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF7E4]">
                <item.icon size={16} className="text-[#E8A020]" />
              </div>
              <p className="text-sm font-semibold text-[#171D17]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#171D17] text-sm font-bold text-white transition-all hover:bg-[#171D17]/90 active:scale-[0.98]"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <p className="mt-6 text-xs text-[#BFC9C3]">
          Questions? Reach out to the product team.
        </p>
      </div>
    </div>
  )
}