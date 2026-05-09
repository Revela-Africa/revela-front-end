"use client";

import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
  KeyRound,
  Activity,
  Users,
  Settings,
  Bell,
  Lock,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Shield,
} from "lucide-react";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function AdminProfilePage() {
  const { user } = useAuthGuard();
  const { logout, isLoading } = useLogout();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E8A020] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen  ">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
            Administrator
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#171D17] lg:text-4xl">
            Account Overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7E4] px-3 py-1.5 text-xs font-semibold text-[#E8A020]">
            <ShieldCheck size={14} />
            Super Admin
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5E9] px-3 py-1.5 text-xs font-semibold text-[#2E7D32]">
            <CheckCircle2 size={14} />
            Online
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
        {/* Left Column - Profile & Stats */}
        <div className="space-y-3 xl:col-span-8">
          {/* Profile Hero Card */}
          <div className="rounded-3xl border border-[#E7E1D8] bg-white p-6  lg:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative">
                <img
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.id}`}
                  alt="avatar"
                  className="h-24 w-24 rounded-3xl bg-[#FFF7E4] p-2 lg:h-28 lg:w-28"
                />
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#E8A020]">
                  <Shield size={14} className="text-white" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-extrabold text-[#171D17] lg:text-3xl">
                    {user?.fullName ?? "Administrator"}
                  </h2>
                </div>
                <p className="mt-1 text-[#6A6A6A]">{user?.email}</p>
                
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-[#6A6A6A]">
                    <Clock size={14} className="text-[#E8A020]" />
                    <span>Joined March 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6A6A6A]">
                    <Activity size={14} className="text-[#E8A020]" />
                    <span>Last active 2 min ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6A6A6A]">
                    <KeyRound size={14} className="text-[#E8A020]" />
                    <span>ID: {user?.id?.slice(0, 8)}...</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 ">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7E4]">
                <Users size={20} className="text-[#E8A020]" />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-[#171D17]">1,284</p>
              <p className="text-sm font-medium text-[#6A6A6A]">Total Users</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#2E7D32]">
                <BarChart3 size={14} />
                +12% this month
              </div>
            </div>

            <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 ">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7E4]">
                <Shield size={20} className="text-[#E8A020]" />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-[#171D17]">8</p>
              <p className="text-sm font-medium text-[#6A6A6A]">Active Roles</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#6A6A6A]">
                3 pending approval
              </div>
            </div>

            <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 ">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7E4]">
                <Activity size={20} className="text-[#E8A020]" />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-[#171D17]">99.9%</p>
              <p className="text-sm font-medium text-[#6A6A6A]">System Uptime</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#2E7D32]">
                <CheckCircle2 size={14} />
                All systems operational
              </div>
            </div>
          </div>

          {/* Permissions & Security */}
          {/* <div className="rounded-3xl border border-[#E7E1D8] bg-white p-6  lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
                  Access Control
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-[#171D17]">
                  Permissions & Security
                </h3>
              </div>
              <Button
                
                className="h-10 rounded-2xl border-[#E7E1D8] text-xs font-semibold text-[#6A6A6A] hover:text-[#171D17]"
              >
                Manage Access
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                { label: "User Management", desc: "Create, edit, delete users", active: true },
                { label: "Financial Reports", desc: "View revenue & analytics", active: true },
                { label: "System Configuration", desc: "Change platform settings", active: true },
                { label: "Audit Logs", desc: "View security logs", active: true },
                { label: "API Access", desc: "Generate & revoke keys", active: false },
                { label: "Billing Control", desc: "Manage subscriptions", active: true },
              ].map((perm) => (
                <div
                  key={perm.label}
                  className="flex items-start gap-4 rounded-2xl bg-[#F7F2EB] p-4"
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      perm.active ? "bg-[#E8A020]" : "bg-[#BFC9C3]"
                    }`}
                  >
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#171D17]">
                      {perm.label}
                    </p>
                    <p className="text-xs text-[#6A6A6A]">{perm.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Recent Activity */}
          <div className="rounded-3xl border border-[#E7E1D8] bg-white p-6  lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
                  Audit Trail
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-[#171D17]">
                  Recent Activity
                </h3>
              </div>
              <Button
                variant="ghost"
                className="h-10 rounded-2xl text-xs font-semibold text-[#E8A020] hover:bg-[#FFF7E4]"
              >
                View All
                <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { action: "Updated user permissions", target: "for Sarah Chen", time: "2 hours ago", type: "security" },
                { action: "Generated API key", target: "Production environment", time: "5 hours ago", type: "key" },
                { action: "Modified system settings", target: "Email notifications", time: "1 day ago", type: "settings" },
                { action: "Approved new registration", target: "Marketing Team", time: "2 days ago", type: "user" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl bg-[#F7F2EB] px-5 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                    {item.type === "security" && <ShieldCheck size={18} className="text-[#E8A020]" />}
                    {item.type === "key" && <KeyRound size={18} className="text-[#E8A020]" />}
                    {item.type === "settings" && <Settings size={18} className="text-[#E8A020]" />}
                    {item.type === "user" && <UserRound size={18} className="text-[#E8A020]" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#171D17]">
                      {item.action}{" "}
                      <span className="font-normal text-[#6A6A6A]">{item.target}</span>
                    </p>
                    <p className="text-xs text-[#BFC9C3]">{item.time}</p>
                  </div>
                  <ChevronRight size={16} className="text-[#BFC9C3]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Actions */}
        <div className="space-y-3 xl:col-span-4">
          {/* Quick Actions */}
          <div className="rounded-3xl border border-[#E7E1D8] bg-white p-6 ">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
              Quick Actions
            </p>
            <div className="mt-5 space-y-3">
              {[
                { icon: Users, label: "Manage Users", desc: "View and edit accounts" },
                { icon: Shield, label: "Security Settings", desc: "2FA & passwords" },
                { icon: Bell, label: "Notifications", desc: "Alert preferences" },
                { icon: BarChart3, label: "Analytics", desc: "Dashboard reports" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex w-full items-center gap-3 rounded-2xl bg-[#F7F2EB] px-4 py-3 text-left transition-colors hover:bg-[#E7E1D8]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <action.icon size={18} className="text-[#E8A020]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#171D17]">
                      {action.label}
                    </p>
                    <p className="text-xs text-[#6A6A6A]">{action.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-[#BFC9C3]" />
                </button>
              ))}
            </div>
          </div>

          {/* Account Details */}
          <div className="rounded-3xl border border-[#E7E1D8] bg-white p-6 ">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
              Account Info
            </p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F2EB]">
                  <UserRound size={18} className="text-[#E8A020]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6A6A6A]">Full Name</p>
                  <p className="text-sm font-semibold text-[#171D17]">
                    {user?.fullName ?? "Administrator"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F2EB]">
                  <Mail size={18} className="text-[#E8A020]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6A6A6A]">Email</p>
                  <p className="text-sm font-semibold text-[#171D17]">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F2EB]">
                  <ShieldCheck size={18} className="text-[#E8A020]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6A6A6A]">Access Level</p>
                  <p className="text-sm font-semibold text-[#171D17]">
                    {user?.role ?? "Super Administrator"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F2EB]">
                  <Lock size={18} className="text-[#E8A020]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#6A6A6A]">2FA Status</p>
                  <p className="text-sm font-semibold text-[#2E7D32]">
                    Enabled
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-3xl border border-red-100 bg-white p-6 ">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
                Danger Zone
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <Button
                type="button"
                onClick={logout}
                disabled={isLoading}
                className="h-11 w-full rounded-2xl bg-[#171D17] text-sm font-semibold text-white hover:bg-[#171D17]/90"
              >
                <LogOut size={16} className="mr-2" />
                {isLoading ? "Logging out..." : "Sign Out"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}