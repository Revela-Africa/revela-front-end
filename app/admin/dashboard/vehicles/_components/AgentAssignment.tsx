"use client"

import { useState } from "react"

// STUBBED: replace with real agents query
const STUB_AGENTS = [
  { id: "a1", name: "Chidi James", initials: "CJ", available: true },
  { id: "a2", name: "Amaka Obi", initials: "AO", available: true },
  { id: "a3", name: "Tunde Adeyemi", initials: "TA", available: false },
]

interface Props {
  vehicleId: string
  currentAgent: string | null
}

export function AgentAssignment({ vehicleId, currentAgent }: Props) {
  const [isAssigning, setIsAssigning] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  async function handleAssign() {
    if (!selected) return
    // --- STUBBED: assignPartner mutation ---
    console.log("Assigning agent:", { vehicleId, agentId: selected })
    setIsAssigning(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-foreground">Assigned Agent</h3>
        <button
          onClick={() => setIsAssigning(!isAssigning)}
          className="text-xs text-[#E8A020] font-bold hover:underline"
        >
          {currentAgent ? "Reassign" : "Assign"}
        </button>
      </div>

      {currentAgent && !isAssigning && (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E8A020] flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {currentAgent.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{currentAgent}</p>
            <p className="text-xs text-green-600">Active</p>
          </div>
        </div>
      )}

      {isAssigning && (
        <div className="space-y-2">
          {STUB_AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelected(agent.id)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg border transition-all ${
                selected === agent.id
                  ? "border-[#E8A020] bg-[#FFF7E4]"
                  : "border-border hover:bg-muted/30"
              } ${!agent.available ? "opacity-40 cursor-not-allowed" : ""}`}
              disabled={!agent.available}
            >
              <div className="w-8 h-8 rounded-full bg-[#E8A020] flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {agent.initials}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">{agent.name}</p>
                <p className={`text-xs ${agent.available ? "text-green-600" : "text-red-500"}`}>
                  {agent.available ? "Available" : "Busy"}
                </p>
              </div>
            </button>
          ))}

          <button
            onClick={handleAssign}
            disabled={!selected}
            className="w-full bg-[#E8A020] text-white text-sm font-bold py-2 rounded-lg disabled:opacity-40"
          >
            Confirm Assignment
          </button>
        </div>
      )}
    </div>
  )
}