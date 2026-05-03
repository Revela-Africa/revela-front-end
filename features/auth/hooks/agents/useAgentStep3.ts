import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { agentStep3Schema } from "@/features/auth/schemas/signup.steps";
import { useSignupStore } from "../../store/useSignupStore";
import { z } from "zod";
import { useMutation } from "@apollo/client/react";
import { InitiateRegistrationDocument } from "@/graphql/generated/graphql";
import { appToast } from "@/lib/toast";

type Values = z.infer<typeof agentStep3Schema>;

export function useAgentStep3() {
  const router = useRouter();
  const { agentData, setAgentData, setTempCredentials, setStep } =
    useSignupStore();

  const [initiateRegistration, { loading }] = useMutation(
    InitiateRegistrationDocument,
  );

  const form = useForm<Values>({
    resolver: zodResolver(agentStep3Schema),
  });

  async function onSubmit(values: Values) {
    setAgentData(values);
    setTempCredentials(agentData.email!, values.password);

    try {
      await initiateRegistration({
        variables: {
          input: {
            email: agentData.email!,
            password: values.password,
            fullName: agentData.name!,
            phoneNumber: agentData.phone!,
            role: "AGENT",
            agencyName: agentData.agencyName ?? undefined,
            documentUrl: agentData.licenseUrl ?? undefined,
          },
        },
      });

      router.push("/signup/verify");
    } catch (error: any) {
      const message =
        error?.graphQLErrors?.[0]?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      appToast.error({
        title: "Oops Something went wrong!",
        description: message,
      });
    }
  }

  function goBack() {
    setStep(2);
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    goBack,
    isLoading: loading,
  };
}
