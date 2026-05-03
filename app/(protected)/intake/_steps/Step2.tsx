"use client";

import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { IntakeHeader } from "../_components/IntakeHeader";
import { useIntakeStep2 } from "@/features/intake/hooks/useIntakeStep2";
import { cn } from "@/lib/utils";
import { DRIVETRAIN_OPTIONS, ENGINE_OPTIONS, TRANSMISSION_OPTIONS } from "..";

export default function IntakeStep2() {
  const { form, onNext, goBack } = useIntakeStep2();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className="font-cabinet">
      <IntakeHeader
        title="Engine & Performance"
        percent={66}
        onExit={goBack}
        exitText="←  Back to Basics"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        noValidate
        className="space-y-8"
      >
        {/* Engine Configuration */}
        <div className="space-y-3">
          <label className="text-sm tracking-[1.4px] font-bold  mb-4 block  text-(--ink-secondary) uppercase">
            Engine Configuration
          </label>
          <Controller
            name="engineType"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-3">
                {ENGINE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const active = field.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => field.onChange(opt.value)}
                      className={cn(
                        "p-4 rounded-xl text-left border transition-all",
                        field.value === opt.value
                          ? "border-[#E8A020]  bg-[#FFFFFF]"
                          : "border-[#FFF7E6]  bg-[#FFF7E6] hover:border-[#E8A020]/40",
                      )}
                    >
                      <span className="text-2xl mb-2 block"></span>
                      <Icon active={active} className="w-6 h-6 mb-4" />
                      <p className="text-base font-bold text-(--ink-secondary) ">
                        {opt.label}
                      </p>
                      <p className="text-xs text-[#6A6A6A] mt-0.5">
                        {opt.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.engineType && (
            <p className="text-xs text-destructive">
              {errors.engineType.message}
            </p>
          )}
        </div>

        {/* Transmission */}
        <div className="space-y-3">
          <label className="text-sm tracking-[1.4px] font-bold  mb-4 block  text-(--ink-secondary) uppercase">
            Transmission Type
          </label>
          <Controller
            name="transmission"
            control={control}
            render={({ field }) => (
              <div className="space-y-3">
                {TRANSMISSION_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const active = field.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => field.onChange(opt.value)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
                        field.value === opt.value
                          ? "border-[#E8A02040] bg-[#FFF7E6]"
                          : " bg-[#FFFFFF] border-white hover:border-[#E8A020]/40",
                      )}
                    >
                      <div className="bg-white p-3 rounded-[8px]">
                        <Icon active={active} className="w-6 h-6 " />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">
                          {opt.label}
                        </p>
                        <p className="text-xs max-w-50 text-[#6A6A6A]">
                          {opt.subtitle}
                        </p>
                      </div>
                      {/* Radio indicator */}
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2 shrink-0 transition-all",
                          field.value === opt.value
                            ? "border-[#E8A020] bg-[#E8A020]"
                            : "border-border",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.transmission && (
            <p className="text-xs text-destructive">
              {errors.transmission.message}
            </p>
          )}
        </div>

        {/* Drivetrain */}
        <div className="space-y-3">
          <label className="text-sm tracking-[1.4px] font-bold  mb-4 block  text-(--ink-secondary) uppercase">
            Drivetrain
          </label>
          <Controller
            name="drivetrain"
            control={control}
            render={({ field }) => (
              <div className="flex gap-3">
                {DRIVETRAIN_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => field.onChange(opt.value)}
                    className={cn(
                      "flex-1 h-16 rounded-xl border text-sm font-bold transition-all",
                      field.value === opt.value
                        ? "border-[#E8A02040] bg-white text-[#D4900A]"
                        : "border-[#FFCC7240] bg-[#FFCC7240] text-foreground hover:border-[#E8A020]/40",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          />
          {errors.drivetrain && (
            <p className="text-xs text-destructive">
              {errors.drivetrain.message}
            </p>
          )}
        </div>

        <div className="flex  p">
          <Button type="submit" className="w-full text-white normal-case">
            Next: Condition Assessment<span>→</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
