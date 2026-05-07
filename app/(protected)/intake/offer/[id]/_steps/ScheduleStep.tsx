"use client";

import { useOfferStore } from "@/features/offer/store/useOfferStore";
import { MapPin, ShieldCheck } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useMutation } from "@apollo/client/react";
import { useParams } from "next/navigation";
import { appToast } from "@/lib/toast";
import { SchedulePickupDocument } from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";

const TIME_SLOTS = [
  { label: "8 AM - 10 AM", sublabel: "Morning", value: "08:00-10:00" },
  { label: "10:00 - 12:00", sublabel: "Noon", value: "10:00-12:00" },
  { label: "12:00 - 14:00", sublabel: "Afternoon", value: "12:00-14:00" },
  { label: "14:00 - 16:00", sublabel: "Evening", value: "14:00-16:00" },
];

export default function ScheduleStep() {
  const { id } = useParams<{ id: string }>();
  const {
    setStep,
    setCollectionDate,
    setTimeSlot,
    collectionAddress,
    collectionDate,
    region,
    timeSlot,
    vehicleId,
    bankName,
    accountNumber,
  } = useOfferStore();

  const [schedulePickup, { loading }] = useMutation(SchedulePickupDocument);

  const canProceed = !!collectionDate && !!timeSlot;

  // Selected date derived from store
  const selectedDate = collectionDate ? new Date(collectionDate) : null;

  async function handleConfirm() {
    if (!canProceed) return;

    const payload = {
      vehicleId: vehicleId ?? id,
      bankName,
      accountNumber,
      collectionDate,
      region,
      timeSlot,
      collectionAddress,
    };

    // console.log("[SchedulePickup] Payload:", payload);

    try {
      const { data } = await schedulePickup({
        variables: {
          input: payload,
        },
      });

      if (data?.schedulePickup) {
        // only proceed if backend confirms success
        setStep(5);
      }
    } catch (err: any) {
      const message =
        err?.graphQLErrors?.[0]?.message ??
        err?.message ??
        "Scheduling failed. Please try again.";

      appToast.error({
        title: "Could not schedule pickup",
        description: message,
      });

      console.error("[SchedulePickup] Error:", message);
    }
  }


  return (
    <div className="font-cabinet space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-extrabold text-[#E8A020]">
          When should we{" "}
          <span className="text-(--ink-secondary)">collect your car?</span>
        </h1>
        <p className="text-base text-muted-foreground mt-1">
          Pickup fee is surcharged from your offer.
        </p>
      </div>

      {/* Collection point */}
      <div>
        <div className="flex text-(--ink-secondary) mb-4 justify-between tracking-[1.4px] text-sm font-bold items-center uppercase">
          Collection Point
          <button
            onClick={() => setStep(3)}
            className="text-[#E8A020] tracking-normal normal-case"
          >
            Change
          </button>
        </div>
        <div className="flex items-start gap-3 bg-white border rounded-[12px] border-[#E8A02040] p-6">
          <span className="bg-[#E8A0201A] p-2.5 rounded-sm">
            <MapPin color="#D4900A" />
          </span>
          <div>
            <p className="font-bold text-[#E8A020]">Home Address</p>
            <p className="text-sm text-(--ink)">{collectionAddress}</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Select Date
          </p>
          <p className="text-xs text-muted-foreground">
            Starting from 2 days ahead
          </p>
        </div>

        <div className="rounded-xl bg-white">
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(date) => {
              if (!date) return;
              // Use local date parts instead of ISO string to avoid timezone shift
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              setCollectionDate(`${year}-${month}-${day}`);
            }}
            disabled={(date) => {
              const minDate = new Date();
              minDate.setHours(0, 0, 0, 0);
              minDate.setDate(minDate.getDate() + 2);
              return date < minDate;
            }}
          />
        </div>
        <p className="text-xs text-[#B86B00] pr-5">
          Minimum 2 days' notice required for scheduling.
        </p>
      </div>

      {/* Time slots */}
      {collectionDate && (
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Available Slots — {new Date(collectionDate).toDateString()}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {TIME_SLOTS.map((slot) => {
              const isSelected = timeSlot === slot.value;
              return (
                <button
                  key={slot.value}
                  type="button"
                  onClick={() => setTimeSlot(slot.value)} // ← store directly
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-[#D4900A] bg-[#FFF7E6]"
                      : "border-[#DCDCDC] bg-white hover:border-[#E8A020]/40"
                  }`}
                >
                  <p
                    className={`text-sm font-bold ${isSelected && "text-(--gold-secondary)"}`}
                  >
                    {slot.label}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${isSelected ? "text-(--gold-secondary)" : "text-muted-foreground"}`}
                  >
                    {slot.sublabel}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="p-4 rounded-xl flex gap-x-4 bg-[#FFF7E4] border border-[#E8A02040]">
        <ShieldCheck size={20} color="#D4900A" />
        <div className="max-w-65">
          <p className="text-sm text-muted-foreground">
            A certified{" "}
            <span className="text-[#D4900A] font-bold">Revela inspector</span>{" "}
            will meet you for a final 15-minute verification of the vehicle's
            condition before handover.
          </p>
        </div>
      </div>

      <Button
        onClick={handleConfirm}
        disabled={!canProceed || loading}
        loading={loading}
        className="w-full bg-[#E8A020] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Confirm Pickup Time →
      </Button>
    </div>
  );
}
