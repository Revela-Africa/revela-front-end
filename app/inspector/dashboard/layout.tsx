"use client";

import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import ProfileCard from "./_components/ProfileCard";

export default function InspectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthGuard();
  return (
    <div className="min-h-screen flex items-center justify-center font-cabinet">
      <div className="w-full max-w-md bg-[#F7F2EB] h-dvh flex flex-col justify-between">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-50 border-b border-[#E7E1D8] bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-2">
              <img
                src="/icons/primary-logo.svg"
                alt="Revela"
                className="h-8 w-auto"
              />
              <span className="text-[8px] font-bold bg-[#E8A020] text-white px-2 py-0.5 rounded">
                INSPECTOR
              </span>
            </div>

            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.id}`}
              alt="avatar"
              className={`rounded-full object-cover p-1 size-12 bg-[#d4910a65]`}
            />
          </div>
        </header>

        <main className=" px-6 h-full overflow-scroll ">{children}</main>
        <div>
          <ProfileCard />
        </div>
        <p className="text-center text-xs text-muted-foreground ">
          © {new Date().getFullYear()} Revela. All rights reserved.
        </p>
      </div>
    </div>
  );
}
