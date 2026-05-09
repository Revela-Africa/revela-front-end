import { Eye, EyeClosed, Loader2 } from "lucide-react";

import type { UseFormReturn } from "react-hook-form";
import { PasswordValues } from "@/features/inspector/hooks/useInspectorOnboard";
import { TextField } from "@/components/ui/textfield";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SetPasswordStepProps {
  inspectorName: string;
  form: UseFormReturn<PasswordValues>;
  onSubmit: (e: React.SubmitEvent) => void;
  isSubmitting: boolean;
}

export function SetPasswordStep({
  inspectorName,
  form,
  onSubmit,
  isSubmitting,
}: SetPasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-foreground">
          Welcome, {inspectorName.split(" ")[0]}! 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Set a password to activate your Revela inspector account
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <TextField
          id="password"
          label={"Password"}
          type={showPassword ? "text" : "password"}
          required={true}
          onRightIconClick={() => setShowPassword((prev) => !prev)}
          rightIcon={
            showPassword ? (
              <EyeClosed className=" text-[#6A6A6A]" />
            ) : (
              <Eye className=" text-[#6A6A6A]" />
            )
          }
          error={errors.password?.message}
          {...register("password")}
        />

        <TextField
          id="confirmPassword"
          label={"Confirm Password"}
          type={showConfirm ? "text" : "password"}
          required={true}
          onRightIconClick={() => setShowConfirm((prev) => !prev)}
          rightIcon={
            showConfirm ? (
              <EyeClosed className=" text-[#6A6A6A]" />
            ) : (
              <Eye className=" text-[#6A6A6A]" />
            )
          }
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#E8A020] text-white font-bold py-3 rounded-xl text-sm disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 size={14} className="animate-spin" />}
          {isSubmitting ? "Activating account..." : "Activate Account →"}
        </Button>
      </form>
    </div>
  );
}
