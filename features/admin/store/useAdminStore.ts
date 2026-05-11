import { create } from "zustand"

interface AdminStore {
  // Filters
  statusFilter: string
  searchQuery: string
  
  // Selected vehicle for detail view
  selectedVehicleId: string | null

  // Actions
  setStatusFilter: (status: string) => void
  setSearchQuery: (query: string) => void
  setSelectedVehicleId: (id: string | null) => void
  reset: () => void
}

const initialState = {
  statusFilter: "ALL",
  searchQuery: "",
  selectedVehicleId: null,
}

export const useAdminStore = create<AdminStore>((set) => ({
  ...initialState,
  setStatusFilter: (status) => set({ statusFilter: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedVehicleId: (id) => set({ selectedVehicleId: id }),
  reset: () => set(initialState),
}))