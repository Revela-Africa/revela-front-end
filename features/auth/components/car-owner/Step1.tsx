"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { TextField } from "@/components/ui/textfield";

import { AtSign, User, Phone, } from "lucide-react";
import { useCarOwnerStep1 } from "../../hooks/carOwner/useCarOwnerStep1";

export default function CarOwnerStep1() {
  const { form, onNext } = useCarOwnerStep1();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className=" font-cabinet">
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold text-[#D4900A]">
          Personal Details
        </h1>
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
            id="name"
            label="Full Name"
            required
            placeholder="Enter your full legal name"
            rightIcon={<User size={20} className="text-[#BDCABB]" />}
            error={errors.name?.message}
            {...register("name")}
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
        </FieldGroup>

        <div className="mt-10">
          <Button type="submit" className="w-full text-white">
            Continue<span>→</span>
          </Button>
        </div>
      </form>

     
    </div>
  );
}
