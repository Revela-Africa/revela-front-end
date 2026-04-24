import { create } from "zustand";
import type { IntakeFormValues } from "../schemas/intake.schema";

interface IntakeStore {
  step: number;
  data: Partial<IntakeFormValues>;
  photos: File[];

  setStep: (step: number) => void;
  setData: (data: Partial<IntakeFormValues>) => void;
  setPhotoAtIndex: (index: number, file: File) => void
  removePhoto: (index: number) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  data: {},
  photos: [],
};

export const useIntakeStore = create<IntakeStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  setData: (data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),

setPhotoAtIndex: (index: number, file: File) =>
  set((state) => {
    const photos = [...state.photos]
    photos[index] = file
    return { photos }
  }),

removePhoto: (index) =>
  set((state) => {
    const photos = [...state.photos]
    photos[index] = undefined as any  
    return { photos }
  }),

  reset: () => set(initialState),
}));
