"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/apis/auth";
import { toast } from "sonner";

// Schema de validação para forgot password
const forgotPasswordSchema = z.object({
  email: z.email("E-mail inválido"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  // Mutation para forgot password
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => AuthApi.forgotPassword(email),
    onSuccess: () => {
      router.push("/sucess-reset-send-password");
    },
    onError: (error: any) => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
      console.error("Erro ao enviar e-mail:", error);
    },
  });

  const onSubmitForgotPassword = (data: ForgotPasswordData) => {
    forgotPasswordMutation.mutate(data.email);
  };
  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg">
      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Recuperar senha
      </h1>

      <form onSubmit={handleSubmit(onSubmitForgotPassword)}>
        {/* Campo Email */}
        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Informe seu email para recuperar a senha"
            error={errors.email?.message}
            label="E-mail"
          />
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending
              ? "Enviando..."
              : "Enviar E-mail de Recuperação"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => router.push("/sign-in")}
          >
            Cancelar
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

export default ForgotPasswordPage;
