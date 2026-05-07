"use client";

import { useOfferStore } from "@/features/offer/store/useOfferStore";
import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import VehicleCarousel from "../../../_components/VehicleCarousel";
import Link from "next/link";
import { TextField } from "@/components/ui/textfield";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AVAILABLE_REGIONS = ["Lagos", "Ilorin"];

export default function ConfirmStep() {
  const {
    make,
    model,
    year,
    mileage,
    condition,
    tav,
    setStep,
    collectionAddress,
    setCollectionAddress,
    imageUrls,
    setRegion,
    region,
  } = useOfferStore();
  const { user } = useAuthGuard();

  const images = imageUrls.map((img) => img.imageUrl);

  const isDisabled = !region || collectionAddress.trim().length < 8;

  return (
    <div className="font-cabinet space-y-6 py-4">
      <div>
        <h1 className="text-xl font-extrabold text-[#E8A020]">
          Verify Vehicle Details
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ensure all details match your vehicle documents to prevent delays in
          payout.
        </p>
      </div>

      <div className="w-full  rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
        <VehicleCarousel images={images} />
      </div>

      <div className="rounded-2xl border border-border bg-white overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-[24px] font-bold text-foreground">
            {year} {make} {model}
          </h2>
        </div>
        <div className="py-5">
          {[
            {
              label: "Mileage",
              value: `${Number(mileage).toLocaleString()} KM`,
            },
            { label: "Condition Grade", value: condition },
            { label: "Assessed Value", value: `₦${tav?.toLocaleString()}` },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-4 py-3"
            >
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p
                className={`text-base font-semibold ${item.label === "Assessed Value" ? "text-[#D4900A] " : "text-(--ink)"}`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Owner info */}
      <div className="space-y-3">
        <p className="text-[20px] font-bold text-(--ink-secondary)">
          Owner Information
        </p>
        <TextField
          id="fullName"
          label="Full Name"
          value={user?.fullName ?? ""}
          readOnly
        />
        <Select
          value={region}
          onValueChange={(value) => setRegion(value || "")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {AVAILABLE_REGIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <TextField
          id="collectionAddress"
          label="Collection Address"
          value={collectionAddress}
          placeholder="No.42 Jibola Estate Vi lekki"
          required
          onChange={(e) => setCollectionAddress(e.target.value)}
        />
      </div>

      <div className="p-4 rounded-xl flex gap-x-4 bg-[#FFF7E4] border border-[#E8A02040]  space-y-2">
        <Info size={20} color="#D4900A" />

        <div className="max-w-65 ">
          <p className="text-sm text-muted-foreground">
            By proceeding, you confirm that the vehicle condition remains as
            stated in the initial valuation. Any discrepancies found during
            physical inspection may affect the final offer.
          </p>
        </div>
      </div>

      <Button
        onClick={() => setStep(4)}
        disabled={isDisabled}
        className="w-full bg-[#E8A020] normal-case text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
      >
        Verify Details
      </Button>

      <p className="text-xs text-muted-foreground text-center px-4">
        Need help?{" "}
        <Link href="/support" className="font-bold">
          Contact our specialist support
        </Link>
      </p>
    </div>
  );
}
