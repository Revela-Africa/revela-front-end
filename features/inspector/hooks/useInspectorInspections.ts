import { useQuery } from "@apollo/client/react"
import { InspectorGetAllInspectionsDocument } from "@/graphql/generated/graphql"

export function useInspectorInspections() {
  // Always fetch all — no filter
  // We derive active/completed client-side so counts are always accurate
  const { data, loading, error, refetch } = useQuery(
    InspectorGetAllInspectionsDocument,
    {
      variables: {},
      fetchPolicy: "cache-and-network",
    }
  )

  const inspections = data?.inspectorGetAllInspections ?? []

  const active = inspections.filter((v) =>
    ["INSPECTOR_ASSIGNED"].includes(v.status)
  )

  const completed = inspections.filter((v) =>
    ["UNDER_ASSESSMENT", "OFFER_SENT", "ACCEPTED", "PAID"].includes(v.status)
  )

  return {
    inspections,
    active,
    completed,
    loading,
    error,
    refetch,
  }
}