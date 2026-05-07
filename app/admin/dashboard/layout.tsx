"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Sidebar from "./_components/layout/Sidebar";
import MainContent from "./_components/layout/MainContent";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen sbg-[#F7F2EB] overflow-hidden font-cabinet ">
      <Sidebar />
      <MainContent>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </MainContent>
    </div>
  );
}
