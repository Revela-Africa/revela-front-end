

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agentStep1Schema } from "@/features/auth/schemas/signup.steps";
import { useSignupStore } from "../../store/useSignupStore";
import { z } from "zod";

type Values = z.infer<typeof agentStep1Schema>;

export function useAgentStep1() {
  const { agentData, setAgentData, setStep } = useSignupStore();

  const form = useForm<Values>({
    resolver: zodResolver(agentStep1Schema),
    defaultValues: {
      name: agentData.name ?? "",
      phone: agentData.phone ?? "",
      email: agentData.email ?? "",
    },
  });

  function onNext(values: Values) {
    setAgentData(values);
    setStep(2);
  }

  return { form, onNext: form.handleSubmit(onNext) };
}