"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client/react";
import { InviteInspectorDocument } from "@/graphql/generated/graphql";
import { appToast } from "@/lib/toast";
import { AVAILABLE_REGIONS } from "@/shared/constants/nigeria-states";
import { UserPlus, X, Loader2, Mail, User, Phone, AtSign } from "lucide-react";
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

  const [inviteInspector, { loading }] = useMutation(InviteInspectorDocument);

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
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your Revela admin configuration
        </p>
      </div>

      {/* Inspector management section */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Field Inspectors
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Invite inspectors to join Revela and conduct vehicle assessments
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#E8A020] text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <UserPlus size={14} />
            Invite Inspector
          </button>
        </div>

        {/* Invite form */}
        {showForm && (
          <div className="border border-[#E8A020]/20 rounded-xl p-5 bg-[#FFF7E4]/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">
                New Inspector Invite
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}
                className="text-muted-foreground hover:text-foreground"
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
                  placeholder="Enter your full legal name"
                  rightIcon={<User size={20} className="text-[#BDCABB]" />}
                  error={errors.fullName?.message}
                  {...register("fullName")}
                />

                <TextField
                  id="phone"
                  label="Phone Number"
                  required
                  placeholder="+234 (000) 000-0000"
                  rightIcon={<Phone size={20} className="text-[#BDCABB]" />}
                  error={errors.phone?.message}
                  {...register("phone")}
                />

                <TextField
                  id="email"
                  label="Email Address"
                  required
                  placeholder="name@revelaafrica.com"
                  rightIcon={<AtSign size={20} className="text-[#BDCABB]" />}
                  error={errors.email?.message}
                  {...register("email")}
                />

                <FormSelect
                  name="region"
                  id="bankName"
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
                  loading={loading}
                  className="flex-1 bg-[#E8A020] text-white font-bold py-2.5 normal-case rounded-lg text-sm disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Mail size={14} />
                  )}
                  {loading ? "Sending invite..." : "Send Invite"}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    reset();
                  }}
                  className="flex-1 border border-border text-sm py-2.5 rounded-lg hover:bg-muted/30"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
