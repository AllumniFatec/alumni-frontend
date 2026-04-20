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
      await refreshUser();
      router.push(MembersRoutes.Members);
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.error;
        if (errorMsg === "Usuário em análise") {
          router.push(AuthRoutes.PendingApproval);
          return;
        }
        if (errorMsg === "Usuário banido permanentemente") {
          router.push(AuthRoutes.BannedUser);
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
        {...register("email")}
        type="email"
        placeholder="E-mail"
        error={errors.email?.message}
        label="E-mail"
      />

      <div className="mb-6">
        <Input
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
