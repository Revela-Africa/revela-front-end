import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { intakeStep2Schema, type IntakeStep2Values } from "../schemas/intake.schema"
import { useIntakeStore } from "../store/useIntakeStore"

export function useIntakeStep2() {
  const { data, setData, setStep } = useIntakeStore()

  const form = useForm<IntakeStep2Values>({
    resolver: zodResolver(intakeStep2Schema),
    defaultValues: {
      engineType: data.engineType ?? "",
      transmission: data.transmission ?? "",
      drivetrain: data.drivetrain ?? "",
    },
  })

  function onNext(values: IntakeStep2Values) {
    setData(values)
    setStep(3)
  }

  function goBack() {
    setStep(1)
  }

  return {
    form,
    onNext: form.handleSubmit(onNext),
    goBack,
  }
}