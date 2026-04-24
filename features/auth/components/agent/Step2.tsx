"use client";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { TextField } from "@/components/ui/textfield";
import { Building2 } from "lucide-react";
import { useAgentStep2 } from "../../hooks/agents/useAgentStep2";
import { FileDropzone } from "@/components/ui/file-dropzone";

export default function AgentStep2() {
  const { form, onNext, goBack } = useAgentStep2();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <div className="font-cabinet">
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold text-[#D4900A]">
          Business Context
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Help us verify your agency credentials
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        noValidate
      >
        <FieldGroup>
          <TextField
            id="agencyName"
            label="Agency Name"
            placeholder="Revela Motors Ltd"
            rightIcon={<Building2 size={20} className="text-[#BDCABB]" />}
            error={errors.agencyName?.message}
            {...register("agencyName")}
          />

          {/* License upload */}
          <FileDropzone
            label="Driver's License"
            selectedFile={watch("license")}
            onFileChange={(file) => {
              setValue("license", file as File, { shouldValidate: true });
            }}
            error={errors.license?.message}
          />
        </FieldGroup>

        <div className="mt-10 flex gap-3">
          <Button type="button" onClick={goBack} className="w-full text-white">
            <span className="rotate-180">→</span> Back
          </Button>
          <Button type="submit" className="w-full text-white">
            Continue <span>→</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
