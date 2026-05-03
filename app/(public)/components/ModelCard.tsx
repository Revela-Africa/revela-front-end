import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppSelect } from "@/components/ui/AppSelect";
import CustomCta from "@/app/components/CustomCta";

const makeOptions = [
  { value: "Toyota", label: "Toyota" },
  { value: "Honda", label: "Honda" },
];

const modelOptions = [
  { value: "Camry", label: "Camry" },
  { value: "Corolla", label: "Corolla" },
  { value: "Accord", label: "Accord" },
];

const yearOptions = [
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
];

const locationOptions = [
  { value: "Lagos", label: "Lagos" },
  { value: "Abuja", label: "Abuja" },
  { value: "Port-Harcourt", label: "Port Harcourt" },
];

export default function ModelCard() {
  const [make, setMake] = useState("Toyota");
  const [model, setModel] = useState("Camry");
  const [year, setYear] = useState("2018");
  const [condition, setCondition] = useState("Minor dents, runs well");
  const [location, setLocation] = useState("Lagos");
  const [offer, setOffer] = useState(0);

  // Editable pricing logic
  const calculateEstimate = useMemo(() => {
    return (
      currentMake: string,
      currentModel: string,
      currentYear: string,
      currentCondition: string,
      currentLocation: string,
    ) => {
      // 1. Base Prices Dictionary
      const basePrices: Record<
        string,
        Record<string, Record<string, number>>
      > = {
        Toyota: {
          Camry: { "2018": 5000000, "2019": 5800000, "2020": 6500000 },
          Corolla: { "2018": 4200000, "2019": 4900000 },
        },
        Honda: {
          Accord: { "2018": 4800000, "2019": 5500000 },
        },
      };

      let estimatedPrice =
        basePrices[currentMake]?.[currentModel]?.[currentYear] || 0;

      // 2. Condition Modifiers
      const conditionStr = currentCondition.toLowerCase();
      let conditionMultiplier = 1.0;

      if (
        conditionStr.includes("perfect") ||
        conditionStr.includes("excellent")
      ) {
        conditionMultiplier = 1.05;
      } else if (
        conditionStr.includes("dent") ||
        conditionStr.includes("scratch")
      ) {
        conditionMultiplier = 0.97; // Adjusts 5,000,000 to exactly 4,850,000
      } else if (
        conditionStr.includes("bad") ||
        conditionStr.includes("poor")
      ) {
        conditionMultiplier = 0.8;
      }

      // 3. Location Modifiers
      const locationModifiers: Record<string, number> = {
        Lagos: 1.0,
        Abuja: 1.05,
        "Port-Harcourt": 0.95,
      };

      const locMultiplier = locationModifiers[currentLocation] || 1.0;

      return Math.round(estimatedPrice * conditionMultiplier * locMultiplier);
    };
  }, []);

  // Update offer whenever dependencies change
  useEffect(() => {
    const newOffer = calculateEstimate(make, model, year, condition, location);
    setOffer(newOffer);
  }, [make, model, year, condition, location, calculateEstimate]);

  // Format currency
  const formattedOffer = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(offer);

  return (
    <Card className="w-full md:w-100 lg:w-125 max-w-125 bg-[#F9FAFB] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-[#F3F4F6]  overflow-hidden">
      <CardContent className="p-6 sm:p-8  ">
        <div className="flex justify-between font-cabinet items-center mb-8">
          <h2 className="text-base font-bold tracking-[1px] text-(--ink) uppercase">
            Sell a car
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-(--ink) animate-pulse" />
            <span className="text-[12px] font-bold tracking-[1px] text-(--ink) uppercase">
              Live Estimate
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className=" font-cabinet">
            <label className="text-sm mb-2 block font-bold text-(--ink)">
              Vehicle Details
            </label>

            <div className="grid grid-cols-3 gap-2">
              <AppSelect
                value={make}
                onValueChange={setMake}
                placeholder="Make"
                options={makeOptions}
              />

              <AppSelect
                value={model}
                onValueChange={setModel}
                placeholder="Model"
                options={modelOptions}
              />

              <AppSelect
                value={year}
                onValueChange={setYear}
                placeholder="Year"
                options={yearOptions}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm mb-2 block font-bold text-(--ink)">
              Condition
            </label>
            <Input
              value={condition}
              onChange={(e: any) => setCondition(e.target.value)}
              placeholder="e.g., Minor dents, runs well"
              className="border-[#E098001A] bg-[#FFF9F099] font-cabinet font-normal text-base shadow-none text-gray-700 h-10 placeholder:text-gray-400 focus-visible:ring-[#F9FAFB]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm mb-2 block font-bold text-(--ink)">
              Location
            </label>
            <AppSelect
              value={location}
              onValueChange={setLocation}
              placeholder="Year"
              options={locationOptions}
            />
          </div>
        </div>

        <div className="mt-8 bg-[#E098001A] border border-[#E0980033] rounded-[10px] p-5 sm:p-6">
          <h3 className="text-[11px] font-medium tracking-widest text-gray-600 uppercase mb-1">
            Your Offer
          </h3>
          <div className="h-12 flex items-center">
            <AnimatePresence mode="popLayout">
              {offer > 0 ? (
                <motion.div
                  key={offer}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-4xl sm:text-[42px] font-bold text-[#D08B25] tracking-tight"
                >
                  {formattedOffer}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-semibold text-gray-400"
                >
                  Calculating...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <CustomCta
          label="Accept & Get Full Offer →"
          className="w-full text-white mt-3 "
        />
      </CardContent>
    </Card>
  );
}
