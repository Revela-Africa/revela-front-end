import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { agentStep2Schema } from "@/features/auth/schemas/signup.steps";
import { useSignupStore } from "../../store/useSignupStore";
import { uploadImage } from "@/lib/cloudinary/uploadImage";
import { z } from "zod";

type Values = z.infer<typeof agentStep2Schema>;

export function useAgentStep2() {
  const { agentData, setAgentData, setStep } = useSignupStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(agentStep2Schema),
    defaultValues: {
      agencyName: agentData.agencyName ?? "",
      license: undefined,
    },
  });

  function handleFileChange(file: File | null) {
    form.setValue("license", file as File, { shouldValidate: true });
  }

  async function onNext(values: Values) {
    setIsLoading(true);

    try {
      // Upload license to Cloudinary
      const result = await uploadImage(values.license, "revela/licenses");

      setAgentData({
        ...values,
        licenseUrl: result.url,
      });

      setStep(3);
    } catch {
      form.setError("license", {
        message: "Upload failed — please try again",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function goBack() {
    setStep(1);
  }

  return {
    form,
    onNext: form.handleSubmit(onNext),
    handleFileChange,
    goBack,
    isLoading,
  };
}
