// useCarOwnerStep1.ts

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carOwnerStep1Schema } from "@/features/auth/schemas/signup.steps";
import { useSignupStore } from "../../store/useSignupStore";
import { z } from "zod";

type Step1Values = z.infer<typeof carOwnerStep1Schema>;

export function useCarOwnerStep1() {
  const { carOwnerData, setCarOwnerData, setStep } = useSignupStore();

  const form = useForm<Step1Values>({
    resolver: zodResolver(carOwnerStep1Schema),
    defaultValues: {
      name: carOwnerData.name ?? "",
      phone: carOwnerData.phone ?? "",
      email: carOwnerData.email ?? "",
    },
  });

  function onNext(values: Step1Values) {
    setCarOwnerData(values);
    setStep(2);
  }

  return {
    form,
    onNext: form.handleSubmit(onNext),
  };
}
