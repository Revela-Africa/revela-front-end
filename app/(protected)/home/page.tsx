"use client"
import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard"
import { AppHeader } from "./_components/AppHeader"
import { PortfolioCard } from "./_components/PortfolioCard"
import { EnrollCard } from "./_components/EnrollCard"
import { QuickInsights } from "./_components/QuickInsights"
import { InProgress } from "./_components/InProgress"
import { GetUserDashboardDocument } from "@/graphql/generated/graphql"
import { useQuery } from "@apollo/client/react"
import {AnimatePresence, motion} from "framer-motion"

export default function HomePage() {
  const {user} =  useAuthGuard()
  const {data} = useQuery(GetUserDashboardDocument)

  const dashBoardData =data?.getUserDashboard


  return (
    <div className="space-y-7 pb-10 font-cabinet">
      <AppHeader user={user} />
    
    <AnimatePresence mode="popLayout">
      {(dashBoardData?.totalVehicles ?? 0) > 1 && (
        <motion.div
          key="portfolio-card"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          layout
        >
          <PortfolioCard dashBoardData={dashBoardData} />
        </motion.div>
      )}
    </AnimatePresence>
      <EnrollCard />
      <QuickInsights />
      <InProgress />
    </div>
  )
}