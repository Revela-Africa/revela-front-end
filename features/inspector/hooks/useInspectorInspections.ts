import { useQuery } from "@apollo/client/react"
import { InspectorGetAllInspectionsDocument } from "@/graphql/generated/graphql"

export function useInspectorInspections(filter?: string) {

  
  const { data, loading, error, refetch } = useQuery(
    InspectorGetAllInspectionsDocument,
    {
      variables: filter ? { filter } : {},
      fetchPolicy: "cache-and-network",
    }
  )

// console.log(data);


  const inspections = data?.inspectorGetAllInspections ?? []

  const active = inspections.filter((v) =>
    ["INSPECTOR_ASSIGNED"].includes(v.status)
  )

  const completed = inspections.filter((v) =>
    ["UNDER_ASSESSMENT","OFFER_SENT", "ACCEPTED", "PAID"].includes(v.status)
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