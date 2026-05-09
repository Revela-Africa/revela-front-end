import { useQuery } from "@apollo/client/react"
import { AdminGetAllVehiclesDocument } from "@/graphql/generated/graphql"
import { useAdminStore } from "../store/useAdminStore"
import { useMemo } from "react"

export function useAdminVehicles() {
  const { statusFilter, searchQuery } = useAdminStore()

  const { data, loading, error, refetch } = useQuery(
    AdminGetAllVehiclesDocument,
    {
      fetchPolicy: "cache-and-network",
      pollInterval: 5 * 60 * 1000, // refetch every 5 mins
    }
  )

  const allVehicles = data?.adminGetAllVehicles ?? []
  

  // Filter client-side — no need for separate API calls per filter
  const filteredVehicles = useMemo(() => {
    return allVehicles.filter((vehicle) => {
      const matchesStatus =
        statusFilter === "ALL" || vehicle.status === statusFilter

      const matchesSearch =
        !searchQuery ||
        `${vehicle.make} ${vehicle.model} ${vehicle.year} ${vehicle.id} ${vehicle.bookingReference}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

      return matchesStatus && matchesSearch
    })
  }, [allVehicles, statusFilter, searchQuery])

  // Stats derived from real data
const stats = useMemo(() => ({
  total: allVehicles.length,
  submitted: allVehicles.filter((v) => v.status === "SUBMITTED").length,
  rangeProvided: allVehicles.filter((v) => v.status === "RANGE_PROVIDED").length,
  inspectionScheduled: allVehicles.filter((v) => v.status === "INSPECTION_SCHEDULED").length,
  inspectorAssigned: allVehicles.filter((v) => v.status === "INSPECTOR_ASSIGNED").length,
  underAssessment: allVehicles.filter((v) => v.status === "UNDER_ASSESSMENT").length,
  offerSent: allVehicles.filter((v) => v.status === "OFFER_SENT").length,
  offerRejected: allVehicles.filter((v) => v.status === "OFFER_REJECTED").length,
  accepted: allVehicles.filter((v) => v.status === "ACCEPTED").length,
  paid: allVehicles.filter((v) => v.status === "PAID").length,
}), [allVehicles])

  return {
    vehicles: filteredVehicles,
    allVehicles,
    stats,
    loading,
    error,
    refetch,
  }
}