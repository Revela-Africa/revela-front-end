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
  const { data, photos, setPhotoAtIndex, removePhoto, reset } =
    useIntakeStore();
  const [isLoading, setIsLoading] = useState(false); // ← own state
  const [submitVehicle, { loading }] = useMutation(SubmitVehicleDocument);

  const form = useForm<IntakeStep4Values>({
    resolver: zodResolver(intakeStep4Schema),
    defaultValues: { photos: [] },
  });

  function getNextFreeIndex(): number {
    for (let i = 0; i < REQUIRED_ANGLES.length; i++) {
      if (!photos[i]) return i;
    }
    return -1; // all slots filled
  }

  function addPhotoHandler(file: File, index: number) {
    setPhotoAtIndex(index, file);
    const current = [...form.getValues("photos")];
    current[index] = file;
    form.setValue("photos", current, { shouldValidate: true });
  }

  // All 5 slots must be filled
  const allComplete = photos.filter(Boolean).length === REQUIRED_ANGLES.length;
  const completedCount = photos.filter(Boolean).length;

  function removePhotoHandler(index: number) {
    removePhoto(index);
    const current = [...form.getValues("photos")];
    current[index] = undefined as any;
    form.setValue("photos", current.filter(Boolean), { shouldValidate: true });
  }

  async function onSubmit() {
    if (!allComplete) return; // ← guard against partial submission
    setIsLoading(true);

    try {
      const uploadResults = await Promise.all(
        photos
          .filter(Boolean)
          .map((file) => uploadImage(file, "revela/vehicles")),
      );

      const imageUrls = uploadResults.map((result, index) => ({
        imageUrl: result.url,
        angle: REQUIRED_ANGLES[index]?.id ?? `photo_${index}`,
      }));

      await submitVehicle({
        variables: {
          input: {
            vin: data.vin,
            make: data.make!,
            model: data.model,
            year: data.year!,
            mileage: data.mileage!,
            condition: data.condition!,
            engineType: data.engineType!,
            transmission: data.transmission!,
            drivetrain: data.drivetrain!,
            structuralDamage: data.structuralDamage!,
            mechanicalOverhaul: data.mechanicalOverhaul!,
            serviceHistory: data.serviceHistory!,
            imageUrls: imageUrls,
          },
        },
      });

      appToast.success({
        title: "Vehicle submitted",
        description: "We’re analyzing your vehicle now.",
      });

      reset();
      router.push("/home");
    } catch (error:any) {
      console.error("Upload failed");
    } finally {
      setIsLoading(false);
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
