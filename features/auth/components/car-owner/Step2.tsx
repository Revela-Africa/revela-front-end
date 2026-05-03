"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { TextField } from "@/components/ui/textfield";

import { MapPin, } from "lucide-react";
import { useCarOwnerStep2 } from "../../hooks/carOwner/useCarOwnerStep2";
import { NIGERIA_STATES } from "@/shared/constants/nigeria-states";
import FormSelect from "@/components/ui/form-select";

export default function CarOwnerStep2() {
  const { form, onNext, goBack } = useCarOwnerStep2();

  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="font-cabinet">
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold text-[#D4900A]">Location</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        noValidate
      >
        <FieldGroup>
          <FormSelect
            name="state"
            id="state"
            control={control}
            label={"STATE"}
            placeholder={"Select state"}
            options={NIGERIA_STATES.map((s) => ({
              label: s,
              value: s,
            }))}
            error={errors.state?.message}
          />

          <TextField
            id="address"
            label="Address"
            required
            placeholder="12 Adeola Odeku Street, Victoria Island"
            rightIcon={<MapPin size={20} className="text-[#BDCABB]" />}
            error={errors.address?.message}
            {...register("address")}
          />
        </FieldGroup>

        <div className="mt-10 flex gap-3">
          <Button type="button" onClick={goBack} className="w-full text-white">
             <span className="rotate-180">→</span> Back
          </Button>
          <Button type="submit" className="w-full text-white">
            Continue  <span>→</span>
          </Button>
        </div>
      </form>


    </div>
  );
}
