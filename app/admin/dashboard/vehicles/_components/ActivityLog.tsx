// STUBBED: replace with real activity query
const STUB_ACTIVITIES = [
  {
    id: 1,
    text: "Dismantling started — Chidi marked engine assembly as in progress",
    time: "Today, 10:42 AM",
    dot: "bg-[#E8A020]",
  },
  {
    id: 2,
    text: "Vehicle collected — picked up from Lekki Address",
    time: "30 Mar, 2:15 PM",
    dot: "bg-green-500",
  },
  {
    id: 3,
    text: "Mechanic verified — Grade A confirmed by Chidi James",
    time: "19 Mar, 11:30 AM",
    dot: "bg-blue-500",
  },
  {
    id: 4,
    text: "Vehicle registered — Owner: Emeka Obi",
    time: "18 Mar, 9:00 AM",
    dot: "bg-gray-400",
  },
]

export function ActivityLog({ vehicleId }: { vehicleId: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-4">Activity</h3>
      <div className="space-y-4">
        {STUB_ACTIVITIES.map((activity, index) => (
          <div key={activity.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${activity.dot}`} />
              {index < STUB_ACTIVITIES.length - 1 && (
                <div className="w-px flex-1 bg-border mt-1" />
              )}
            </div>
            <div className="pb-3">
              <p className="text-xs text-foreground">{activity.text}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}