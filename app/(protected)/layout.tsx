"use client";

import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";

import { Home, User, CarFront, ClipboardCheck } from "lucide-react";
import { BottomNav } from "./components/navigation/BottomNav";

import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Intake", href: "/intake", icon: ClipboardCheck },
  { label: "Inventory", href: "/inventory", icon: CarFront },
  { label: "Profile", href: "/profile", icon: User },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuthGuard();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#E8A020] border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen h-dvh  flex items-center justify-center font-cabinet">
      <div className="w-full max-w-md bg-[#F7F2EB] h-dvh flex flex-col justify-between">
        <nav className="flex px-6 py-4  justify-between items-center  ">
          <Link href="/">
            <img
              src="/icons/primary-logo.svg"
              alt="Revela"
              className="h-8 w-auto"
            />
          </Link>

          <Link href="/profile">
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.id}`}
              alt="avatar"
              className={`rounded-full object-cover p-1 size-12 bg-[#d4910a65]`}
            />
          </Link>
        </nav>

        <main className=" px-6 h-full overflow-scroll ">{children}</main>

        <BottomNav items={NAV_ITEMS} />
      </div>
    </div>
  );
}
