"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LoginInUser } from "@/models/users";
import { AuthApi } from "@/apis/auth";

// Schema de validação para login
const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type SignInData = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInMutation = useMutation({
    mutationFn: (loginData: LoginInUser) => AuthApi.signIn(loginData),
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Erro no login:", error);
    },
  });

  const onSubmitLogin = (data: SignInData) => {
    const loginData: LoginInUser = {
      email: data.email,
      password: data.password,
    };

    signInMutation.mutate(loginData);
  };

  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg">
      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Alumni Fatec Sorocaba
      </h1>

      <form onSubmit={handleSubmit(onSubmitLogin)}>
        {/* Campo Email */}
        <div className="mb-4">
          <Input
            {...register("email")}
            type="email"
            placeholder="E-mail"
            error={errors.email?.message}
          />
        </div>

        {/* Campo Senha */}
        <div className="mb-6">
          <Input
            {...register("password")}
            type="password"
            placeholder="Senha"
            error={errors.password?.message}
          />
        </div>

        {/* Botão Entrar */}
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

export default SignInPage;
