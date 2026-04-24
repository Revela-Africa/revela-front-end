import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  intakeStep1Schema,
  type IntakeStep1Values,
} from "../schemas/intake.schema";
import { useIntakeStore } from "../store/useIntakeStore";

export function useIntakeStep1() {
  const { data, setData, setStep } = useIntakeStore();

  const form = useForm<IntakeStep1Values>({
    resolver: zodResolver(intakeStep1Schema),
    defaultValues: {
      vin: data.vin ?? "",
      make: data.make ?? "",
      model: data.model ?? "",
      year: data.year ?? "",
      mileage: data.mileage ?? "",
      condition: data.condition ?? "",
    },
  });

  // When make changes, clear model
  function onMakeChange(make: string) {
    form.setValue("make", make, { shouldValidate: true });
    form.setValue("model", "");
  }

  function onNext(values: IntakeStep1Values) {
    setData(values);
    setStep(2);
  }

  return {
    form,
    onNext: form.handleSubmit(onNext),
    onMakeChange,
    selectedMake: form.watch("make"),
  };
}
