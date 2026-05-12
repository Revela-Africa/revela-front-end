"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  InviteInspectorDocument,
  GetAllInspectorsDocument,
} from "@/graphql/generated/graphql";
import { appToast } from "@/lib/toast";
import { AVAILABLE_REGIONS } from "@/shared/constants/nigeria-states";
import {
  UserPlus,
  X,
  Loader2,
  Mail,
  User,
  Phone,
  AtSign,
  MapPin,
  ShieldCheck,
  Clock,
  Users,
} from "lucide-react";
import FormSelect from "@/components/ui/form-select";
import { TextField } from "@/components/ui/textfield";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

const inviteSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^0[789][01]\d{8}$/, "Enter a valid Nigerian phone number"),
  region: z.string().min(1, "Please select a region"),
});

type InviteValues = z.infer<typeof inviteSchema>;

export default function SettingsPage() {
  const [showForm, setShowForm] = useState(false);

  const [inviteInspector, { loading: inviting }] = useMutation(
    InviteInspectorDocument,
  );

  const { data, loading: loadingInspectors } = useQuery(
    GetAllInspectorsDocument,
    {
      fetchPolicy: "cache-and-network",
    },
  );

  const inspectors = data?.getAllInspectors ?? [];

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      fullName: "",
      region: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: InviteValues) {
    try {
      await inviteInspector({
        variables: {
          email: values.email,
          fullName: values.fullName,
          phone: values.phone,
          region: values.region,
        },
      });

      appToast.success({
        title: "Invite sent!",
        description: `${values.fullName} will receive an email to set up their account`,
      });

      reset();
      setShowForm(false);
    } catch (err: any) {
      appToast.error({
        title: "Failed to send invite",
        description: err?.graphQLErrors?.[0]?.message ?? "Please try again",
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 py-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
          Administration
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#171D17]">
          Inspector Management
        </h1>
        <p className="mt-1 text-sm text-[#6A6A6A]">
          Invite and manage field inspectors across all regions
        </p>
      </div>

      {/* Invite Section */}
      <div className="rounded-3xl border border-[#E7E1D8] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF7E4]">
              <UserPlus size={20} className="text-[#E8A020]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#171D17]">
                Field Inspectors
              </h2>
              <p className="text-xs text-[#6A6A6A]">
                Invite inspectors to join Revela and conduct vehicle assessments
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex h-10 items-center gap-2 rounded-xl bg-[#E8A020] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <UserPlus size={14} />
            Invite Inspector
          </button>
        </div>

        {/* Invite form */}
        {showForm && (
          <div className="mt-5 space-y-4 rounded-2xl border border-[#E8A020]/20 bg-[#FFF7E4]/30 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#171D17]">
                New Inspector Invite
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}
                className="rounded-lg p-1 text-[#6A6A6A] transition-colors hover:bg-[#F7F2EB] hover:text-[#171D17]"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FieldGroup>
                <TextField
                  id="name"
                  label="Full Name"
                  required
                  placeholder="Enter full legal name"
                  rightIcon={<User size={18} className="text-[#BFC9C3]" />}
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />

                <TextField
                  id="phone"
                  label="Phone Number"
                  required
                  placeholder="08012345678"
                  rightIcon={<Phone size={18} className="text-[#BFC9C3]" />}
                  error={errors.phone?.message}
                  {...register("phone")}
                />

                <TextField
                  id="email"
                  label="Email Address"
                  required
                  placeholder="inspector@revelaafrica.com"
                  rightIcon={<AtSign size={18} className="text-[#BFC9C3]" />}
                  error={errors.email?.message}
                  {...register("email")}
                />

                <FormSelect
                  name="region"
                  control={control}
                  label="Region"
                  placeholder="Select region"
                  options={AVAILABLE_REGIONS.map((b) => ({
                    label: b,
                    value: b,
                  }))}
                  error={errors.region?.message}
                />
              </FieldGroup>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  loading={inviting}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#E8A020] text-sm font-bold text-white normal-case disabled:opacity-40"
                >
                  {inviting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Mail size={14} />
                  )}
                  {inviting ? "Sending..." : "Send Invite"}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    reset();
                  }}
                  className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#E7E1D8] text-sm font-semibold text-[#171D17] transition-colors hover:bg-[#F7F2EB]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Inspectors Directory */}
      <div className="rounded-3xl border border-[#E7E1D8] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF7E4]">
              <Users size={20} className="text-[#E8A020]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#171D17]">
                All Inspectors
              </h2>
              <p className="text-xs text-[#6A6A6A]">
                {inspectors.length} inspector
                {inspectors.length !== 1 ? "s" : ""} registered
              </p>
            </div>
          </div>
        </div>

        {loadingInspectors ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={24} className="animate-spin text-[#E8A020]" />
          </div>
        ) : inspectors.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E7E1D8] py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF7E4]">
              <Users size={20} className="text-[#E8A020]" />
            </div>
            <p className="mt-3 text-sm font-semibold text-[#171D17]">
              No inspectors yet
            </p>
            <p className="mt-1 text-xs text-[#6A6A6A]">
              Invite your first inspector to get started
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#E7E1D8]">
            {/* Table Header */}
            <div className="hidden grid-cols-12 gap-4 bg-[#FAF8F5] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6A6A6A] sm:grid">
              <div className="col-span-4">Inspector</div>
              <div className="col-span-3">Contact</div>
              <div className="col-span-2">Region</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#F7F2EB]">
              {inspectors.map((inspector) => (
                <div
                  key={inspector.id}
                  className="grid grid-cols-1 items-center gap-3 px-5 py-4 transition-colors hover:bg-[#FAF8F5] sm:grid-cols-12 sm:gap-4"
                >
                  {/* Name */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF7E4]">
                      <span className="text-xs font-bold text-[#E8A020]">
                        {inspector.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#171D17]">
                        {inspector.fullName}
                      </p>
                      <p className="text-xs text-[#6A6A6A]">
                        {inspector.email}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-span-3 flex items-center gap-2">
                    <Phone size={12} className="text-[#BFC9C3]" />
                    <span className="text-sm text-[#6A6A6A]">
                      {inspector.phone ?? "—"}
                    </span>
                  </div>

                  {/* Region */}
                  <div className="col-span-2 flex items-center gap-2">
                    <MapPin size={12} className="text-[#BFC9C3]" />
                    <span className="text-sm text-[#6A6A6A]">
                      {inspector.region ?? "—"}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    {inspector.isAvailable ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[10px] font-bold text-green-600">
                        <ShieldCheck size={10} />
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F2EB] px-3 py-1 text-[10px] font-bold text-[#6A6A6A]">
                        <Clock size={10} />
                        Busy
                      </span>
                    )}
                  </div>

                  {/* Action */}
                  <div className="col-span-1 flex justify-end">
                    <button className="rounded-lg p-1.5 text-[#BFC9C3] transition-colors hover:bg-[#F7F2EB] hover:text-[#171D17]">
                      <Mail size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
