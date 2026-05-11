"use client";

import { useNetworkStatus } from "@/shared/hooks/useNetworkStatus";

export default function InspectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

   useNetworkStatus()
  return (
    <div className=" h-screen  overflow-hidden font-cabinet ">
      <main>{children}</main>
    </div>
  );
}
