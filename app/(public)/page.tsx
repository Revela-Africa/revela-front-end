"use client"
import AppNavigation from "../components/AppNavigation";
import HeroSection from "./sections/HeroSection";
import ModelSection from "./sections/ModelSection";
import SellYourCar from "./sections/SellYourCar";
import StatsRibbon from "./sections/StatsRibbon";
import TheProcess from "./sections/TheProcess";
import WhatWeBuy from "./sections/WhatWeBuy";

const page = () => {
  return (
    <div className="text-3xl font-extrabold font-syne">
      <AppNavigation />
      <HeroSection />
      <StatsRibbon/>
      <SellYourCar/>
      <TheProcess/>
      <WhatWeBuy/>
      <ModelSection/>
    </div>
  );
};

export default page;
