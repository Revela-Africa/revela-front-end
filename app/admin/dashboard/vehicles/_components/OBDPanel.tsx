import { Download } from "lucide-react"

interface OBDCode {
  code: string
  description: string
  severity: "HIGH" | "MEDIUM" | "LOW"
}

const SEVERITY_STYLES = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-orange-100 text-orange-700",
  LOW: "bg-yellow-100 text-yellow-700",
}

export function OBDPanel({ codes }: { codes: OBDCode[] }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-foreground">OBD Diagnostics</h3>
        <button className="flex items-center gap-1 text-xs text-[#E8A020] font-bold hover:underline">
          <Download size={12} /> Download Report
        </button>
      </div>

      <div className="space-y-2">
        {codes.map((code) => (
          <div
            key={code.code}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/40"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-foreground font-mono">
                {code.code}
              </span>
              <p className="text-sm text-muted-foreground">{code.description}</p>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                SEVERITY_STYLES[code.severity]
              }`}
            >
              {code.severity}
            </span>
          </div>
        ))}

        <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-xs font-medium text-green-700">
            Engine, transmission, drivetrain — no critical codes
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
        {[
          { label: "Mileage (OBI)", value: "142,831 km" },
          { label: "Battery", value: "12.6 V" },
          { label: "Engine Hrs", value: "3,420 h" },
          { label: "Last Service", value: "18 months" },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-sm font-bold text-foreground mt-0.5">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}