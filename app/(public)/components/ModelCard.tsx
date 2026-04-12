import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
// Assuming standard shadcn/ui imports. Adjust paths based on your project structure.
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CarSellEstimate() {
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
      currentLocation: string
    ) => {
      // 1. Base Prices Dictionary
      const basePrices: Record<string, Record<string, Record<string, number>>> = {
        Toyota: {
          Camry: { "2018": 5000000, "2019": 5800000, "2020": 6500000 },
          Corolla: { "2018": 4200000, "2019": 4900000 },
        },
        Honda: {
          Accord: { "2018": 4800000, "2019": 5500000 },
        },
      };

      let estimatedPrice = basePrices[currentMake]?.[currentModel]?.[currentYear] || 0;

      // 2. Condition Modifiers
      const conditionStr = currentCondition.toLowerCase();
      let conditionMultiplier = 1.0;
      
      if (conditionStr.includes("perfect") || conditionStr.includes("excellent")) {
        conditionMultiplier = 1.05;
      } else if (conditionStr.includes("dent") || conditionStr.includes("scratch")) {
        conditionMultiplier = 0.97; // Adjusts 5,000,000 to exactly 4,850,000
      } else if (conditionStr.includes("bad") || conditionStr.includes("poor")) {
        conditionMultiplier = 0.8;
      }

      // 3. Location Modifiers
      const locationModifiers: Record<string, number> = {
        Lagos: 1.0,
        Abuja: 1.05,
        "Port Harcourt": 0.95,
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
    <div className="flex items-center justify-center min-h-screen bg-[#F5EFE6] p-4 font-sans">
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-0 overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[13px] font-bold tracking-widest text-gray-900 uppercase">
              Sell a car
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider text-gray-900 uppercase">
                Live Estimate
              </span>
            </div>
          </div>

          <div className="space-y-5">
            {/* Vehicle Details */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900">
                Vehicle Details
              </label>
              <div className="grid grid-cols-3 gap-2">
                <Select value={make} onValueChange={setMake}>
                  <SelectTrigger className="bg-white border-gray-200 shadow-sm text-gray-700 h-10 focus:ring-[#D08B25]">
                    <SelectValue placeholder="Make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Toyota">Toyota</SelectItem>
                    <SelectItem value="Honda">Honda</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="bg-white border-gray-200 shadow-sm text-gray-700 h-10 focus:ring-[#D08B25]">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Camry">Camry</SelectItem>
                    <SelectItem value="Corolla">Corolla</SelectItem>
                    <SelectItem value="Accord">Accord</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="bg-white border-gray-200 shadow-sm text-gray-700 h-10 focus:ring-[#D08B25]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                    <SelectItem value="2018">2018</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Condition */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900">
                Condition
              </label>
              <Input
                value={condition}
                onChange={(e:any) => setCondition(e.target.value)}
                placeholder="e.g., Minor dents, runs well"
                className="bg-white border-gray-200 shadow-sm text-gray-700 h-10 placeholder:text-gray-400 focus-visible:ring-[#D08B25]"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900">
                Location
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-white border-gray-200 shadow-sm text-gray-700 h-10 focus:ring-[#D08B25]">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="Abuja">Abuja</SelectItem>
                  <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Offer Display Card */}
          <div className="mt-8 bg-[#FAF6EE] border border-[#F0E5CC] rounded-xl p-5 sm:p-6">
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

          {/* CTA Button */}
          <Button 
            className="w-full mt-5 h-14 bg-[#E29D22] hover:bg-[#C98A1C] text-white text-base font-bold rounded-xl shadow-[0_4px_14px_0_rgba(226,157,34,0.25)] transition-all duration-200 active:scale-[0.98]"
          >
            Accept & Get Full Offer
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}