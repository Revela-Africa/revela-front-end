import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  intakeStep4Schema,
  type IntakeStep4Values,
} from "../schemas/intake.schema";
import { useIntakeStore } from "../store/useIntakeStore";
import { uploadImage } from "@/lib/cloudinary/uploadImage";
import { useMutation } from "@apollo/client/react";
import { SubmitVehicleDocument } from "@/graphql/generated/graphql";
import { appToast } from "@/lib/toast";
import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";

const REQUIRED_ANGLES = [
  { id: "front", label: "Front View" },
  { id: "rear", label: "Rear View" },
  { id: "driver_side", label: "Driver Side" },
  { id: "passenger_side", label: "Passenger Side" },
  { id: "interior", label: "Interior" },
] as const;

export type PhotoAngle = (typeof REQUIRED_ANGLES)[number];

export function useIntakeStep4() {
  const router = useRouter();
  const {
    data: intakeData,
    photos,
    setPhotoAtIndex,
    removePhoto,
  } = useIntakeStore();
  const [isLoading, setIsLoading] = useState(false); 
  const [submitVehicle] = useMutation(SubmitVehicleDocument);
  const {user} = useAuthGuard()

  const form = useForm<IntakeStep4Values>({
    resolver: zodResolver(intakeStep4Schema),
    defaultValues: { photos: [] },
  });

  function getNextFreeIndex(): number {
    for (let i = 0; i < REQUIRED_ANGLES.length; i++) {
      if (!photos[i]) return i;
    }
    return -1;
  }

  function addPhotoHandler(file: File, index: number) {
    setPhotoAtIndex(index, file);
    const current = [...form.getValues("photos")];
    current[index] = file;
    form.setValue("photos", current, { shouldValidate: true });
  }

  const allComplete = photos.filter(Boolean).length === REQUIRED_ANGLES.length;
  const completedCount = photos.filter(Boolean).length;

  function removePhotoHandler(index: number) {
    removePhoto(index);
    const current = [...form.getValues("photos")];
    current[index] = undefined as any;
    form.setValue("photos", current.filter(Boolean), { shouldValidate: true });
  }

async function onSubmit() {
  if (!allComplete) return
  setIsLoading(true)

  try {    
    // Step 1 — upload photos
    const uploadResults = await Promise.all(
      photos
        .filter(Boolean)
        .map((file) => uploadImage(file, `revela/vehicle-submissions/${user?.email}`)),
    )

    const imageUrls = uploadResults.map((result, index) => ({
      imageUrl: result.url,
      angle: REQUIRED_ANGLES[index]?.id ?? `photo_${index}`,
    }))


    const { data } = await submitVehicle({
      variables: {
        input: {
          vin: intakeData.vin ?? undefined,
          make: intakeData.make!,
          model: intakeData.model ?? undefined,
          year: intakeData.year!,
          mileage: intakeData.mileage!,
          condition: intakeData.condition!,
          drivetrain: intakeData.drivetrain!,
          engineType: intakeData.engineType!,
          transmission: intakeData.transmission!,
          mechanicalOverhaul: intakeData.mechanicalOverhaul!,
          structuralDamage: intakeData.structuralDamage!,
          serviceHistory: intakeData.serviceHistory!,
          imageUrls,
        },
      },
    })

    // console.log("[Submit] Response:", data)

    if (data?.submitVehicle) {
      const vehicleId = data.submitVehicle.id
      router.replace(`/intake/processing/${vehicleId}`)
    }
  } catch (err: any) {
    const message =
      err?.graphQLErrors?.[0]?.message ??
      err?.message ??
      "Submission failed. Please try again."
    appToast.error({
      title: "Oops Something went wrong!",
      description: message,
    })
    console.error("[Submit] Error:", message)
  } finally {
    setIsLoading(false)
  }
}

  function goBack() {
    useIntakeStore.getState().setStep(3);
  }

  return {
    form,
    onSubmit,
    isLoading,
    photos,
    addPhoto: addPhotoHandler,
    removePhoto: removePhotoHandler,
    goBack,
    requiredAngles: REQUIRED_ANGLES,
    completedCount,
    allComplete,
    getNextFreeIndex,
  };
}
