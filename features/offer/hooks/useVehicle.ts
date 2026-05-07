


import { GetSingleUserVehicleDocument } from "@/graphql/generated/graphql"
import { useQuery } from "@apollo/client/react"

export function useVehicle(vehicleId: string) {
  const { data, loading } = useQuery(GetSingleUserVehicleDocument, {
    variables: { vehicleId },
    skip: !vehicleId,
    fetchPolicy: "network-only",
    pollInterval: 60000,
  })

  const vehicle = data?.getSingleUserVehicle

  return {
    vehicle,
    loading,
  }
}