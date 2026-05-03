import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { carOwnerStep3Schema } from "@/features/auth/schemas/signup.steps";
import { useSignupStore } from "../../store/useSignupStore";
import { z } from "zod"; 
import { useMutation } from "@apollo/client/react";
import { InitiateRegistrationDocument } from "@/graphql/generated/graphql";
import { appToast } from "@/lib/toast";

type Values = z.infer<typeof carOwnerStep3Schema>;

export function useCarOwnerStep3() {
  const router = useRouter();
  const { carOwnerData, setCarOwnerData, setTempCredentials, setStep } =
    useSignupStore();

  const [initiateRegistration, { loading }] = useMutation(
    InitiateRegistrationDocument,
  );

  const form = useForm<Values>({
    resolver: zodResolver(carOwnerStep3Schema),
  });

  async function onSubmit(values: Values) {
    setCarOwnerData(values);
    setTempCredentials(carOwnerData.email!, values.password);

    try {
      await initiateRegistration({
        variables: {
          input: {
            email: carOwnerData.email!,
            password: values.password,
            fullName: carOwnerData.name!,
            phoneNumber: carOwnerData.phone!,
            role: "CAR_OWNER",
            state: carOwnerData.state ?? undefined,
            address: carOwnerData.address ?? undefined,
          },
        },
      });

      router.push("/signup/verify");
    } catch (error: any) {
      console.log(error);
      
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
