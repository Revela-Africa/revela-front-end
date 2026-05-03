"use client";

import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function ProfilePage() {
  const { user } = useAuthGuard();
  const { logout, isLoading } = useLogout();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#E8A020] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full py-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
          Profile
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#171D17]">
          Account
        </h1>
      </div>

      <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.id}`}
            alt="avatar"
            className="h-16 w-16 rounded-2xl bg-[#FFF7E4] p-2"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-[#171D17]">
              {user?.fullName ?? "User"}
            </p>
            <p className="truncate text-sm text-[#6A6A6A]">{user?.email}</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-[#F7F2EB] px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <UserRound size={18} className="text-[#E8A020]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[#6A6A6A]">Role</p>
              <p className="truncate text-sm font-semibold text-[#171D17]">
                {user?.role ?? "Member"}
              </p>
            </div>
            <ChevronRight size={16} className="text-[#BFC9C3]" />
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-[#F7F2EB] px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Mail size={18} className="text-[#E8A020]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[#6A6A6A]">Email</p>
              <p className="truncate text-sm font-semibold text-[#171D17]">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-[#F7F2EB] px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <ShieldCheck size={18} className="text-[#E8A020]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[#6A6A6A]">Status</p>
              <p className="truncate text-sm font-semibold text-[#171D17]">
                Active
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-[#E7E1D8] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
          Actions
        </p>

        <Button
          type="button"
          onClick={logout}
          disabled={isLoading}
          className="mt-4 h-12 w-full rounded-2xl bg-[#171D17] text-white hover:bg-[#171D17]/90"
        >
          <LogOut size={16} className="mr-2" />
          {isLoading ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
}
