"use client";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { TextField } from "@/components/ui/textfield";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { AtSign, Eye, EyeClosed, LogIn } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const { form, onSubmit, isLoading } = useLoginForm();
  const [show, setShow] = useState(false);

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="mt-7 font-cabinet">
      <div className="mb-14">
        <h1 className="text-2xl font-extrabold text-[#171D17]">Welcome</h1>
        <p className="text-base font-normal text-[#3E4A3E] mt-1">
          Kindly enter your login details
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate={true}>
        <FieldGroup>
          <TextField
            id="email"
            label={"Email Address"}
            required={true}
            rightIcon={<AtSign color="#BDCABB" />}
            placeholder="name@revelaafrica.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <TextField
            id="password"
            label={"Password"}
            type={show ? "text" : "password"}
            required={true}
            onRightIconClick={() => setShow((prev) => !prev)}
            rightIcon={
              show ? (
                <EyeClosed className=" text-[#6A6A6A]" />
              ) : (
                <Eye className=" text-[#6A6A6A]" />
              )
            }
            error={errors.password?.message}
            {...register("password")}
          />
          
        </FieldGroup>
        <span className="w-full flex justify-end pr-4 uppercase font-normal text-[12px] tracking-[1.2px] text-[#3A3A3A]  mb-10">
          {" "}
          <span className="border-b">Forgot Password?</span>
        </span>
        <Button loading={isLoading} className="text-white w-full">
          Log In  <LogIn />
        </Button>
      </form>

      <p className="text-center text-[14px] text-muted-foreground mt-6">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="text-[#E8A020] ml-2 font-bold hover:underline"
        >
          Create an account
        </a>
      </p>
    </div>
  );
}
