export function EnvBadge() {
  const isProduction =
    process.env.NEXT_PUBLIC_API_URL?.includes("staging") === false

  if (isProduction) return null // never show in production

  return (
    <div className="fixed hidden top-10 font-inter left-4 z-50 bg-(--gold) border border-white/80 text-xs text-white font-bold px-3 py-2 rounded-full shadow-lg">
      STAGING
    </div>
  )
}