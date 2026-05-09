"use client";

import { useNetworkStatus } from "@/shared/hooks/useNetworkStatus";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

   useNetworkStatus()

  return (
    <div className=" h-screen bg-[#F7F2EB] overflow-hidden font-cabinet ">
      <main>{children}</main>
    </div>
  );
}
