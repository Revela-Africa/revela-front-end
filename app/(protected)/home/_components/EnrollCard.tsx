import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"

export function EnrollCard() {
  return (
    <div className="rounded-2xl bg-[#D4900A] p-5 flex items-center justify-between">
      <div className="flex-1">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-3">
          <Plus size={18} className="text-white" />
        </div>
        <h3 className="text-white text-xl font-extrabold  leading-tight mb-1">
          Enroll New Vehicle
        </h3>
        <p className="text-white text-xs ">
          Start the intelligent intake flow for a new asset valuation
        </p>

        <Link
          href="/intake"
          className="mt-4 inline-flex items-center gap-2 bg-white text-[#E8A020] text-xs font-bold px-4 py-2.5 rounded-[8px] hover:bg-white/90 transition-colors"
        >
          START INTAKE FLOW <ArrowRight size={14} />
        </Link>
      </div>


      <div className="w-20 h-20 rounded-full bg-white/10 shrink-0" />
    </div>
  )
}