import type { Metadata } from "next";
import { Syne, Inter, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import localFont from "next/font/local";
import BlobBackground from "./components/BlobBackground";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const clash = localFont({
  src: [
    {
      path: "/assets/fonts/clash-display/ClashDisplay-Extralight.woff2",
      weight: "200",
    },
    {
      path: "/assets/fonts/clash-display/ClashDisplay-Light.woff2",
      weight: "300",
    },
    {
      path: "/assets/fonts/clash-display/ClashDisplay-Regular.woff2",
      weight: "400",
    },
    {
      path: "/assets/fonts/clash-display/ClashDisplay-Medium.woff2",
      weight: "500",
    },
    {
      path: "/assets/fonts/clash-display/ClashDisplay-Semibold.woff2",
      weight: "600",
    },
    {
      path: "/assets/fonts/clash-display/ClashDisplay-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-clash",
  display: "swap",
});
const cabinet = localFont({
  src: [
    {
      path: "/assets/fonts/cabinet-grotesk/CabinetGrotesk-Thin.woff2",
      weight: "100",
    },
    {
      path: "/assets/fonts/cabinet-grotesk/CabinetGrotesk-Extralight.woff2",
      weight: "200",
    },
    {
      path: "/assets/fonts/cabinet-grotesk/CabinetGrotesk-Light.woff2",
      weight: "300",
    },
    {
      path: "/assets/fonts/cabinet-grotesk/CabinetGrotesk-Regular.woff2",
      weight: "400",
    },
    {
      path: "/assets/fonts/cabinet-grotesk/CabinetGrotesk-Medium.woff2",
      weight: "500",
    },
    {
      path: "/assets/fonts/cabinet-grotesk/CabinetGrotesk-Bold.woff2",
      weight: "700",
    },
    {
      path: "/assets/fonts/cabinet-grotesk/CabinetGrotesk-Extrabold.woff2",
      weight: "800",
    },
    {
      path: "/assets/fonts/cabinet-grotesk/CabinetGrotesk-Black.woff2",
      weight: "900",
    },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Revela Africa — Sell End-of-Life & Damaged Cars in Nigeria | Instant Valuation",
  description:
    "Revela is Nigeria’s trusted circular vehicle economy platform. Sell end-of-life, accidented, high-mileage, or damaged cars and receive instant valuation with direct bank transfer within 48 hours. Fast, transparent, and fully verified vehicle disposal across Lagos and Nigeria.",

  keywords: [
    "sell damaged car Nigeria",
    "end of life vehicle Nigeria",
    "car valuation Lagos",
    "scrap car buyer Nigeria",
    "accident car sale Nigeria",
    "used car disposal Nigeria",
    "vehicle scrapping Lagos",
    "instant car valuation Nigeria",
    "Revela Africa",
    "sell broken car Nigeria",
  ],

  authors: [{ name: "Revela Africa" }],
  creator: "Revela Africa",
  publisher: "Revela Africa",

  applicationName: "Revela Africa",
  category: "Automotive Services",

  metadataBase: new URL("https://revela-africa.vercel.app/"),

  openGraph: {
    title:
      "Revela Africa — Instant Valuation for Damaged & End-of-Life Vehicles",
    description:
      "Sell your accidented, high-mileage, or end-of-life vehicle in Nigeria and get a fair, data-driven valuation with direct bank transfer within 48 hours.",
    url: "https://revela-africa.vercel.app/",
    siteName: "Revela Africa",
    images: [
      {
        url: "https://revela-africa.vercel.app/icons/revela-meta.png",
        width: 1200,
        height: 630,
        alt: "Revela Africa Vehicle Valuation Platform",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Revela Africa — Sell Your Car Fast in Nigeria",
    description:
      "Instant valuation for damaged, old, and end-of-life vehicles. Get paid directly to your bank account within 48 hours.",
    images: ["https://revela-africa.vercel.app/"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://revela-africa.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${clash.variable} ${cabinet.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        <BlobBackground />

        <div id="cur" className="relative z-20"></div>
        <div id="cur-r" className="relative z-20"></div>
        <CustomCursor />

        <div className="relative z-10 flex flex-col min-h-full">{children}</div>
      </body>
    </html>
  );
}
