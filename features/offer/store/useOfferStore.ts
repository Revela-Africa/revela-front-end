import { create } from "zustand"

interface OfferStore {
  step: number

  // Vehicle data 
  vehicleId: string | null
  make: string | null
  model: string | null
  year: string | null
  mileage: string | null
  condition: string | null
  tav: number | null
  min: number | null
  max: number | null
  offer: number | null
  imageUrls: { imageUrl: string; angle: string }[]

  // Bank details / bookingReference
  bankName: string
  accountNumber: string

  bookingReference:string

  // Schedule
  collectionDate: string
  timeSlot: string
  collectionAddress: string
  // Actions
  setStep: (step: number) => void
  setVehicleData: (data: {
    vehicleId: string
    make: string
    model: string | null
    year: string
    mileage: string
    condition: string
    tav: number
    min: number
    max: number
  }) => void
setCollectionDate: (date: string) => void
setTimeSlot: (slot: string) => void
setBookingReference:(bookingReference:string) => void
  setImageUrls: (urls: { imageUrl: string; angle: string }[]) => void
  setOffer: (offer: number) => void
  setBankDetails: (bankName: string, accountNumber: string) => void
  setSchedule: (collectionDate: string, timeSlot: string) => void
  setCollectionAddress: (address: string) => void
  reset: () => void
}

const initialState = {
  step: 1,
  vehicleId: null,
  make: null,
  model: null,
  year: null,
 imageUrls: [],
  mileage: null,
  condition: null,
  tav: null,
  min: null,
  max: null,
  offer: null,
  bankName: "",
  accountNumber: "",
  collectionDate: "",
  timeSlot: "",
  collectionAddress: "",
  bookingReference:"",
}

export const useOfferStore = create<OfferStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  setVehicleData: (data) =>
    set({
      vehicleId: data.vehicleId,
      make: data.make,
      model: data.model,
      year: data.year,
      mileage: data.mileage,
      condition: data.condition,
      tav: data.tav,
      min: data.min,
      max: data.max,
    }),

setImageUrls: (urls:{ imageUrl: string; angle: string; }[]) => set({ imageUrls: urls }),
  setOffer: (offer) => set({ offer }),

  setBankDetails: (bankName, accountNumber) =>
    set({ bankName, accountNumber }),

  setCollectionDate: (date) => set({ collectionDate: date }),
setTimeSlot: (slot) => set({ timeSlot: slot }),
setBookingReference: (bookingReference) => set({ bookingReference: bookingReference }),

  setSchedule: (collectionDate, timeSlot) =>
    set({ collectionDate, timeSlot }),

setCollectionAddress: (address: string) => set({ collectionAddress: address }),
  reset: () => set(initialState),
}))