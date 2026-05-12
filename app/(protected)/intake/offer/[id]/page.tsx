"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { GetSingleUserVehicleDocument } from "@/graphql/generated/graphql";
import { useOfferStore } from "@/features/offer/store/useOfferStore";

import ResultsStep from "./_steps/ResultsStep";
import BankStep from "./_steps/BankStep";
import ConfirmStep from "./_steps/ConfirmStep";
import ScheduleStep from "./_steps/ScheduleStep";
import FinalStep from "./_steps/FinalStep";
import OfferStep from "./_steps/OfferStep";
import OutcomeStep from "./_steps/OutcomeStep";
import PaidStep from "./_steps/PaidStep";

function getStepFromStatus(status: string): number {
  switch (status) {
    case "RANGE_PROVIDED":
      return 1;
    case "INSPECTION_SCHEDULED":
    case "INSPECTOR_ASSIGNED":
    case "UNDER_ASSESSMENT":
      return 5;
    case "OFFER_SENT":
      return 6;
    case "OFFER_REJECTED":
    case "ACCEPTED":
      return 7;
    case "PAID":
      return 8;
    default:
      return 1;
  }
}

export default function OfferPage() {
  const { id } = useParams<{ id: string }>();
  const {
    step,
    vehicleId,
    setVehicleData,
    setVehicleStatus,
    setImageUrls,
    setStep,
    setOffer,
    reset, 
  } = useOfferStore();


  const { data, loading, error } = useQuery(GetSingleUserVehicleDocument, {
    variables: { vehicleId: id },
    skip: !id,
    fetchPolicy: "cache-and-network",
  });

  // Reset store if the user navigated to a different vehicle
  useEffect(() => {
    if (!id) return;
    if (vehicleId && vehicleId !== id) {
      reset();
    }
  }, [id, vehicleId, reset]);

  // Hydrate store from fetched data
  useEffect(() => {
    const vehicle = data?.getSingleUserVehicle;
    if (!vehicle || vehicle.id !== id) return;

    const correctStep = getStepFromStatus(vehicle.status);
    setStep(correctStep);
    setVehicleStatus(vehicle.status)
    if (vehicle.tav == null) {
      console.error("TAV missing from backend:", vehicle);
      return;
    }

    const tav = vehicle.tav;

    setImageUrls(
      (vehicle.imageUrls ?? []).map((img) => ({
        imageUrl: img.imageUrl,
        angle: img.angle,
      }))
    );

    setVehicleData({
      vehicleId: vehicle.id,
      make: vehicle.make,
      model: vehicle.model ?? null,
      year: String(vehicle.year),
      mileage: String(vehicle.mileage),
      condition: vehicle.condition,
      tav,
      min: vehicle.min ?? Math.round(tav * 0.7),
      max: vehicle.max ?? Math.round(tav * 1.05),
    });

    if (vehicle.offer) {
      setOffer(vehicle.offer);
    }
  }, [data, id, setImageUrls, setOffer, setStep, setVehicleData]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#E8A020] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-center text-sm text-destructive">
          Failed to load vehicle. Please try again.
        </p>
      </div>
    );
  }

  return (
    <>
      {step === 1 && <ResultsStep />}
      {step === 2 && <BankStep />}
      {step === 3 && <ConfirmStep />}
      {step === 4 && <ScheduleStep />}
      {step === 5 && <FinalStep />}
      {step === 6 && <OfferStep />}
      {step === 7 && <OutcomeStep />}
      {step === 8 && <PaidStep />}
    </>
  );
}