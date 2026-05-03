"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/apis/auth";
import { AuthRoutes, MembersRoutes } from "@/config/routes";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type SignInData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const signInMutation = useMutation({
    mutationFn: (loginData: SignInData) => AuthApi.signIn(loginData),
    onSuccess: async () => {
      //await new Promise((resolve) => setTimeout(resolve, 100));
      //router.replace(MembersRoutes.Members);
      await refreshUser();
      window.location.assign(MembersRoutes.Members);
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const statusCode =
          error.response?.data?.statusCode ?? error.response?.status;
        if (statusCode === 423) {
          router.replace(AuthRoutes.PendingApproval);
          return;
        }
        if (statusCode === 403) {
          router.replace(AuthRoutes.BannedUser);
          return;
        }
        if (statusCode === 422) {
          router.replace(AuthRoutes.RefusedUser);
          return;
        }
        if (statusCode === 409) {
          const suspendedName = error.response?.data?.name;
          const deletedAt = error.response?.data?.deleted_at;
          const params = new URLSearchParams();

          if (suspendedName) {
            params.set("name", String(suspendedName));
          }
          if (deletedAt) {
            params.set("deleted_at", String(deletedAt));
          }

          const suspendedRoute = params.toString()
            ? `${AuthRoutes.SuspendedUser}?${params.toString()}`
            : AuthRoutes.SuspendedUser;

          router.replace(suspendedRoute);
          return;
        }
      }
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
      console.error("Erro no login:", error);
    },
  });

  const onSubmitLogin = (data: SignInData) => {
    signInMutation.mutate({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <Input
        required
        {...register("email")}
        type="email"
        placeholder="E-mail"
        error={errors.email?.message}
        label="E-mail"
      />

      <div className="mb-6">
        <Input
          required
          {...register("password")}
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          label="Senha"
        />
      </div>

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full mb-6"
        disabled={signInMutation.isPending}
      >
        {signInMutation.isPending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};
