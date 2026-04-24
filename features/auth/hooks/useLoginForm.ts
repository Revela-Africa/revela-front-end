import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { setAuthCookies } from "@/lib/auth/token";
import { useMutation } from "@apollo/client/react";
import { LoginDocument } from "@/graphql/generated/graphql";
import { appToast } from "@/lib/toast";

export function useLoginForm() {
  const router = useRouter();
  const [loginMutation, { loading }] = useMutation(LoginDocument);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const { data } = await loginMutation({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });

      if (data?.login) {
        await setAuthCookies(data.login.accessToken, {
          id: data.login.id,
          email: data.login.email,
          fullName: data.login.fullName,
          role: data.login.role,
        });

        
        const role = data.login.role;
        if (role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/home");
        }
      }
    } catch (error: any) {
      const message =
        error?.graphQLErrors?.[0]?.message ||
        error?.message ||
        "Invalid email or password";

      appToast.error({
        title: "Login failed",
        description: message,
      });
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: loading,
  };
}
