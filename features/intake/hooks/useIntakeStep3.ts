import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { intakeStep3Schema, type IntakeStep3Values } from "../schemas/intake.schema"
import { useIntakeStore } from "../store/useIntakeStore"

export function useIntakeStep3() {
  const { data, setData, setStep } = useIntakeStore()

  const form = useForm<IntakeStep3Values>({
    resolver: zodResolver(intakeStep3Schema),
    defaultValues: {
      structuralDamage: data.structuralDamage ?? false,
      mechanicalOverhaul: data.mechanicalOverhaul ?? false,
      serviceHistory: data.serviceHistory ?? "",
    },
  })

  function onNext(values: IntakeStep3Values) {
    setData(values)
    setStep(4)
  }

  function goBack() {
    setStep(2)
  }

  return {
    form,
    onNext: form.handleSubmit(onNext),
    goBack,
  }
}