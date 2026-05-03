"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { TextField } from "@/components/ui/textfield";
import { Eye, EyeClosed } from "lucide-react";
import { useAgentStep3 } from "../../hooks/agents/useAgentStep3";

export default function AgentStep3() {
  const { form, onSubmit, isLoading, goBack } = useAgentStep3();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="font-cabinet">
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold text-[#D4900A]">Security</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create a strong password for your account
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        noValidate
      >
        <FieldGroup>
          <TextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            onRightIconClick={() => setShowPassword((prev) => !prev)}
            rightIcon={
              showPassword ? (
                <EyeClosed className="text-[#6A6A6A]" />
              ) : (
                <Eye className="text-[#6A6A6A]" />
              )
            }
            error={errors.password?.message}
            {...register("password")}
          />

          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            required
            placeholder="••••••••"
            onRightIconClick={() => setShowConfirm((prev) => !prev)}
            rightIcon={
              showConfirm ? (
                <EyeClosed className="text-[#6A6A6A]" />
              ) : (
                <Eye className="text-[#6A6A6A]" />
              )
            }
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
         
        </FieldGroup>

        <div className="mt-10 flex gap-3">
          <Button type="button" onClick={goBack} className="w-full text-white">
            <span className="rotate-180">→</span> Back
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-white"
          >
            {isLoading ? "Creating account..." : "Finish"}
          </Button>
        </div>
      </form>
    </div>
  );
}
