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

// função refine permite validações adicionais em campos específicos, como o campo de senha ser igual ao confirmar senha
export const signUpSchema = z
  .object({
    fullName: z.string({ message: "Nome completo é obrigatório" }),
    email: z.email("E-mail inválido"),
    entryYear: z
      .string()
      .min(4, "Ano de ingresso inválido")
      .max(4, "Ano de ingresso inválido"),
    course: z.string().nonempty("Selecione um curso"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(100, "A senha deve ter no máximo 100 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
//export type SignUpData = z.infer<typeof signUpSchema>;

export type SignUpData = {
  fullName: string;
  email: string;
  entryYear: string;
  course: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      entryYear: "",
      course: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onClickRegister = (data: SignUpData) => {
    console.warn("Register clicked", data);
  };

  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:min-w-lg md:min-w-2xl">
      {/* Título */}
      <h1 className="text-primary text-2xl font-bold text-center mb-6 md:text-3xl">
        Criar Conta
      </h1>
      <form onSubmit={handleSubmit(onClickRegister)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Primeira Coluna */}
          <div className="flex flex-col gap-4">
            {/* Nome completo */}
            <div>
              <Input
                {...register("fullName")}
                type="text"
                placeholder="Nome completo"
              />
            </div>
            {/* Ano de ingresso */}
            <div>
              <Input
                {...register("entryYear")}
                placeholder="Ano de ingresso na universidade"
              />
            </div>

            {/* Criar senha */}
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Crie uma senha"
              />
            </div>
          </div>

          {/* Segunda Coluna */}
          <div className="flex flex-col gap-4">
            {/* Email de acesso */}
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="E-mail de acesso"
              />
            </div>

            {/* Curso realizado */}
            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Curso realizado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ads">
                      Análise e Desenvolvimento de Sistemas
                    </SelectItem>
                    <SelectItem value="gestao-ti">
                      Gestão da Tecnologia da Informação
                    </SelectItem>
                    <SelectItem value="logistica">Logística</SelectItem>
                    <SelectItem value="processos-gerenciais">
                      Processos Gerenciais
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {/* Confirmar senha */}
            <div>
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirme a senha"
              />
            </div>
          </div>
        </div>

        {/* Botões - Um embaixo do outro */}
        <div className="flex flex-col gap-3 mt-4 w-full max-w-sm mx-auto">
          <Button type="submit" variant="default" size="lg" className="w-full">
            Realizar Cadastro
          </Button>

          <Button variant="secondary" size="lg" className="w-full">
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
