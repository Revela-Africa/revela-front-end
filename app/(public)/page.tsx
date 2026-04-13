"use client"
import AboutRevela from "./sections/AboutRevela";
import BottomCTAsection from "./sections/BottomCTAsection";
import CititesSection from "./sections/CititesSection";
import HeroSection from "./sections/HeroSection";
import ModelSection from "./sections/ModelSection";
import SellYourCar from "./sections/SellYourCar";
import StatsRibbon from "./sections/StatsRibbon";
import TheProcess from "./sections/TheProcess";
import WhatWeBuy from "./sections/WhatWeBuy";

const page = () => {
  return (
    <div className="text-3xl font-syne ">
      <HeroSection />
      <StatsRibbon/>
      <SellYourCar/>
      <TheProcess/>
      <WhatWeBuy/>
      <ModelSection/>
      <AboutRevela/>
      <CititesSection/>
      <BottomCTAsection/>
      
    </div>
  );
};

export default page;
