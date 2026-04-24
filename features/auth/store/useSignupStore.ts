import { create } from "zustand";
import type {
  AgentValues,
  CarOwnerValues,
  SellerType,
} from "../schemas/signup.schema";


interface AgentStoreData extends Partial<AgentValues> {
  licenseUrl?: string | null
}

interface SignupStore {
  sellerType: SellerType | null;
  carOwnerData: Partial<CarOwnerValues>;
  agentData: AgentStoreData;
  tempEmail: string | null;
  tempPassword: string | null;
  step: number;

  setSellerType: (type: SellerType) => void;
  setCarOwnerData: (data: Partial<CarOwnerValues>) => void;
  setAgentData: (data: AgentStoreData) => void;
  setTempCredentials: (email: string, password: string) => void;
  setStep: (step: number) => void;

  clearTempCredentials: () => void;
  getCurrentData: () => Partial<AgentValues | CarOwnerValues>;
  reset: () => void;
}

const initialState = {
  sellerType: null,
  carOwnerData: {},
  agentData: {},
  tempEmail: null,
  tempPassword: null,
  step: 1,
};

export const useSignupStore = create<SignupStore>((set, get) => ({
  ...initialState,

  setSellerType: (type) =>
    set({
      sellerType: type,
      step: 1,
      carOwnerData: {},
      agentData: {},
    }),

  setCarOwnerData: (data) =>
    set((state) => ({
      carOwnerData: { ...state.carOwnerData, ...data },
    })),

  setAgentData: (data) =>
    set((state) => ({
      agentData: { ...state.agentData, ...data },
    })),

  setTempCredentials: (email, password) =>
    set({ tempEmail: email, tempPassword: password }),

  setStep: (step) => set({ step }),

  clearTempCredentials: () => set({ tempEmail: null, tempPassword: null }),

  getCurrentData: () => {
    const { sellerType, agentData, carOwnerData } = get();

    if (sellerType === "AGENT") return agentData;
    if (sellerType === "CAR_OWNER") return carOwnerData;

    return {};
  },

  reset: () => set(initialState),
}));
