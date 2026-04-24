import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carOwnerStep2Schema } from "@/features/auth/schemas/signup.steps";
import { useSignupStore } from "../../store/useSignupStore";
import { z } from "zod";

type Step2Values = z.infer<typeof carOwnerStep2Schema>;

export function useCarOwnerStep2() {
  const { carOwnerData, setCarOwnerData, setStep } = useSignupStore();

  const form = useForm<Step2Values>({
    resolver: zodResolver(carOwnerStep2Schema),
    defaultValues: {
      state: carOwnerData.state ?? "",
      address: carOwnerData.address ?? "",
    },
  });

  function onNext(values: Step2Values) {
    setCarOwnerData(values);
    setStep(3);
  }

  function goBack() {
    setStep(1);
  }

  return {
    form,
    onNext: form.handleSubmit(onNext),
    goBack,
  };
}
