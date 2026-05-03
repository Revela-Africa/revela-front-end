"use client"
import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard"
import { AppHeader } from "./_components/AppHeader"
import { PortfolioCard } from "./_components/PortfolioCard"
import { EnrollCard } from "./_components/EnrollCard"
import { QuickInsights } from "./_components/QuickInsights"
import { InProgress } from "./_components/InProgress"

export default function HomePage() {
  const {user} =  useAuthGuard()
  return (
    <div className="space-y-7 pb-10 font-cabinet">
      <AppHeader user={user} />
      <PortfolioCard />
      <EnrollCard />
      <QuickInsights />
      <InProgress />
    </div>
  )
}