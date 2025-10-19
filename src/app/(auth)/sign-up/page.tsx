"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { UserType, NewUser } from "@/models/users";
import { AuthApi } from "@/apis/auth";

// função refine permite validações adicionais em campos específicos, como o campo de senha ser igual ao confirmar senha
export const signUpSchema = z
  .object({
    fullName: z.string().min(4, "Nome completo é obrigatório"),
    email: z.email("E-mail inválido"),
    enrollmentYear: z
      .string()
      .min(4, "Ano de ingresso inválido")
      .max(4, "Ano de ingresso inválido"),
    course: z.string().nonempty("Selecione um curso"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(100, "A senha deve ter no máximo 100 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "senha inválida"
      ),
    confirmPassword: z.string(),
    userType: z.enum(UserType, {
      message: "Selecione um tipo de usuário válido",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
//export type SignUpData = z.infer<typeof signUpSchema>;

export type SignUpData = {
  fullName: string;
  email: string;
  enrollmentYear: string;
  course: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
};

const SignUpPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      email: "",
      enrollmentYear: "",
      course: "",
      password: "",
      confirmPassword: "",
      userType: "" as UserType,
    },
  });

  // Mutation para registro de usuário
  const signUpMutation = useMutation({
    mutationFn: (userData: NewUser) => AuthApi.signUp(userData),
    onSuccess: () => {
      console.warn("Usuário registrado com sucesso");
      router.push("/sign-in");
    },
    onError: (error: any) => {
      console.error("Erro ao registrar usuário:", error);
    },
  });

  const onClickRegister = (data: SignUpData) => {
    const newUser: NewUser = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      enrollmentYear: parseInt(data.enrollmentYear),
      userType: data.userType,
      course: data.course,
    };

    signUpMutation.mutate(newUser);
  };

  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg md:min-w-2xl">
      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Criar Conta
      </h1>

      <form onSubmit={handleSubmit(onClickRegister)}>
        <div className="space-y-4">
          {/* Grid com duas colunas em desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Primeira Coluna */}
            <div className="flex flex-col gap-2">
              {/* Nome completo */}
              <Input
                {...register("fullName")}
                type="text"
                placeholder="Nome completo"
                error={errors.fullName?.message}
              />
              {/* Ano de ingresso */}
              <Input
                {...register("enrollmentYear")}
                placeholder="Ano de ingresso na universidade"
                error={errors.enrollmentYear?.message}
              />

              {/* Criar senha */}
              <Input
                {...register("password")}
                type="password"
                placeholder="Crie uma senha"
                error={errors.password?.message}
              />
            </div>

            {/* Segunda Coluna */}
            <div className="flex flex-col gap-2">
              {/* Email de acesso */}
              <Input
                {...register("email")}
                type="email"
                placeholder="E-mail de acesso"
                error={errors.email?.message}
              />

              {/* Curso realizado */}
              <Controller
                name="course"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    error={errors.course?.message}
                  >
                    <SelectTrigger error={!!errors.course}>
                      <SelectValue placeholder="Curso realizado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Análise e Desenvolvimento de Sistemas">
                        Análise e Desenvolvimento de Sistemas
                      </SelectItem>
                      <SelectItem value="Gestão da Tecnologia da Informação">
                        Gestão da Tecnologia da Informação
                      </SelectItem>
                      <SelectItem value="Logística">Logística</SelectItem>
                      <SelectItem value="Processos Gerenciais">
                        Processos Gerenciais
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {/* Tipo de usuário */}
              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    error={errors.userType?.message}
                  >
                    <SelectTrigger error={!!errors.userType}>
                      <SelectValue placeholder="Tipo de usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserType.STUDENT}>
                        {UserType.STUDENT}
                      </SelectItem>
                      <SelectItem value={UserType.TEACHER}>
                        {UserType.TEACHER}
                      </SelectItem>
                      <SelectItem value={UserType.ALUMNI}>
                        {UserType.ALUMNI}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Campo Confirmar senha - Centralizado e full-width */}
          <div className="w-full max-w-md mx-auto">
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirme a senha"
              error={errors.confirmPassword?.message}
            />
          </div>
        </div>

        {/* Botões - Um embaixo do outro */}
        <div className="flex flex-col gap-3 mt-4 w-full max-w-sm mx-auto">
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            disabled={signUpMutation.isPending}
          >
            {signUpMutation.isPending
              ? "Criando conta..."
              : "Realizar Cadastro"}
          </Button>

          <Button
            type="button"
            onClick={() => {
              clearErrors();
              router.push("/sign-in");
            }}
            variant="secondary"
            size="lg"
            className="w-full"
            disabled={signUpMutation.isPending}
          >
            Cancelar
          </Button>
        </div>
      </form>
      <div className="flex items-center justify-center gap-4 text-sm">
        <a href="/sign-in" className="text-primary hover:text-primary ">
          Login
        </a>
        <span className="text-muted-foreground">|</span>
        <a href="/forgot-password" className="text-primary hover:text-primary">
          Esqueci a Senha
        </a>
      </div>
    </div>
  );
};

export default SignUpPage;
