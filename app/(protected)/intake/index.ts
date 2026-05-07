import AutomaticSvg from "@/public/icons/protected/AutomaticSvg";
import BoltSvg from "@/public/icons/protected/BoltSvg";
import EngineSvg from "@/public/icons/protected/EngineSvg";
import EVehicle from "@/public/icons/protected/EVehicle";
import ManualSvg from "@/public/icons/protected/ManualSvg";
import QuestionMarkSvg from "@/public/icons/protected/QuestionMarkSvg";

export const ENGINE_OPTIONS = [
  {
    value: "INTERNAL_COMBUSTION",
    label: "Internal Combustion",
    subtitle: "Gasoline or Diesel powertrains",
    icon: EngineSvg,
  },
  {
    value: "ELECTRIC",
    label: "Electric (EV)",
    subtitle: "Full battery electric vehicle",
    icon: EVehicle,
  },
  {
    value: "HYBRID_PHEV",
    label: "Hybrid / PHEV",
    subtitle: "Dual energy source systems",
    icon: BoltSvg,
  },
  {
    value: "OTHER",
    label: "Other",
    subtitle: "Hydrogen or alternative fuels",
    icon: QuestionMarkSvg,
  },
];

export const TRANSMISSION_OPTIONS = [
  {
    value: "AUTOMATIC",
    label: "Automatic",
    subtitle: "Includes DCT, CVT, and Traditional Torque Converter",
    icon: AutomaticSvg,
  },
  {
    value: "MANUAL",
    label: "Manual",
    subtitle: "Three-pedal traditional manual transmission",
    icon: ManualSvg,
  },
];

export const DRIVETRAIN_OPTIONS = [
  { value: "FWD", label: "FWD" },
  { value: "RWD", label: "RWD" },
  { value: "AWD_4WD", label: "AWD / 4WD" },
];







