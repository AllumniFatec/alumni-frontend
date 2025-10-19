"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/apis/auth";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(100, "A senha deve ter no máximo 100 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "senha inválida"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordTokenPage = () => {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Mutation para reset de senha
  const resetPasswordMutation = useMutation({
    mutationFn: ({
      newPassword,
      token,
    }: {
      newPassword: string;
      token: string;
    }) => AuthApi.resetPassword(newPassword, token),
    onSuccess: () => {
      router.push("/sign-in");
    },
    onError: (error: any) => {
      console.error("Erro ao redefinir senha:", error);
    },
  });

  const onSubmitResetPassword = (data: ResetPasswordData) => {
    if (!token) {
      console.error("Token não encontrado");
      router.push("/forgot-password");
      return;
    }

    resetPasswordMutation.mutate({
      newPassword: data.password,
      token: token,
    });
  };

  // Se não tem token, redireciona
  if (!token) {
    router.push("/forgot-password");
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg">
      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Redefinir Senha
      </h1>

      <form onSubmit={handleSubmit(onSubmitResetPassword)}>
        {/* Campo Nova Senha */}
        <div className="mb-4">
          <Input
            {...register("password")}
            type="password"
            placeholder="Digite sua nova senha"
            error={errors.password?.message}
          />
        </div>

        {/* Campo Confirmar Senha */}
        <div className="mb-6">
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirme a nova senha"
            error={errors.confirmPassword?.message}
          />
        </div>

        {/* Botão Confirmar */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending
              ? "Redefinindo..."
              : "Redefinir Senha"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => router.push("/sign-in")}
          >
            Voltar ao Login
          </Button>
        </div>
      </form>

      {/* Links */}
      <div className="flex items-center justify-center gap-4 text-sm">
        <a
          href="/sign-up"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Criar Conta
        </a>
        <span className="text-muted-foreground">|</span>
        <a
          href="/forgot-password"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Esqueci a Senha
        </a>
      </div>
    </div>
  );
};

export default ResetPasswordTokenPage;
