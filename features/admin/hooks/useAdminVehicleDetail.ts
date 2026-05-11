import { useQuery, useMutation } from "@apollo/client/react";
import {
  AdminGetUserSingleVehicleDocument,
  GetInspectorsByRegionDocument,
  GetAllInspectorsDocument,
  AssignInspectorDocument,
} from "@/graphql/generated/graphql";
import { useState } from "react";
import { appToast } from "@/lib/toast";

export function useAdminVehicleDetail(vehicleId: string) {
  const [showAllInspectors, setShowAllInspectors] = useState(false);

  // Vehicle data
  const {
    data: vehicleData,
    loading: vehicleLoading,
    error: vehicleError,
    refetch,
  } = useQuery(AdminGetUserSingleVehicleDocument, {
    variables: { vehicleId },
    skip: !vehicleId,
    fetchPolicy: "cache-and-network",
  });

  const vehicle = vehicleData?.adminGetUserSingleVehicle;

  // Regional inspectors
  const { data: regionalData, loading: regionalLoading } = useQuery(
    GetInspectorsByRegionDocument,
    {
      variables: { region: vehicle?.region ?? "" },
      skip: !vehicle?.region,
    },
  );

  // All inspectors (loaded on demand)
  const {
    data: allData,
    loading: allLoading,
    refetch: fetchAllInspectors,
  } = useQuery(GetAllInspectorsDocument, {
    // skip: !showAllInspectors,
  });

  // Assign inspector mutation
  const [assignInspector, { loading: assigning }] = useMutation(
    AssignInspectorDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "Inspector assigned",
          description: "Inspector has been notified",
        });
        refetch();
      },
      onError: (err) => {
        appToast.error({
          title: "Assignment failed",
          description: err.message,
        });
      },
    },
  );

  const regionalInspectors = regionalData?.getInspectorsByRegion ?? [];
  const rawAllInspectors = allData?.getAllInspectors ?? [];

  // Normalized allInspectors — always available
  const allInspectors = rawAllInspectors.map((inspector) => ({
    ...inspector,
    isOutOfRegion: inspector.region !== vehicle?.region,
    isAvailable: inspector.isAvailable === true,
  }));

  // Filtered view for the assignment panel
  const inspectors = showAllInspectors
    ? allInspectors
    : regionalInspectors.map((inspector) => ({
        ...inspector,
        isOutOfRegion: false,
        isAvailable: inspector.isAvailable === true,
      }));

  async function handleAssign(inspectorId: string) {
    await assignInspector({
      variables: { vehicleId, inspectorId },
    });
  }

  return {
    vehicle,
    vehicleLoading,
    vehicleError,
    inspectors,
    allInspectors, // ← exposed
    regionalInspectors, // ← also useful
    inspectorsLoading: showAllInspectors ? allLoading : regionalLoading,
    showAllInspectors,
    setShowAllInspectors: (val: boolean) => {
      setShowAllInspectors(val);
      if (val) fetchAllInspectors();
    },
    handleAssign,
    assigning,
    refetch,
  };
}
