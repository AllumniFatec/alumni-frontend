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
import { UserType, UserGender, NewUser } from "@/models/users";
import { AuthApi } from "@/apis/auth";
import { mapUserType, mapGender } from "@/hooks/mapUserType";
import { toast } from "sonner";
import { useCourses } from "@/hooks/useNetwork";

// Funçao refine permite validações adicionais em campos específicos, como o campo de senha ser igual ao confirmar senha
export const signUpSchema = z
  .object({
    fullName: z.string().min(4, "Nome completo é obrigatório"),
    email: z.email("E-mail inválido"),
    enrollmentYear: z.string().min(4, "Ano inválido").max(4, "Ano inválido"),
    course: z.string().nonempty("Selecione um curso"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(100, "A senha deve ter no máximo 100 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "Senha inválida",
      ),
    confirmPassword: z.string(),
    userType: z.enum(
      [UserType.STUDENT, UserType.ALUMNI, UserType.TEACHER, UserType.ADMIN],
      { message: "Selecione um tipo de usuário válido" },
    ),
    gender: z.enum([UserGender.MALE, UserGender.FEMALE, UserGender.OTHERS], {
      message: "Selecione um gênero válido",
    }),
    studentId: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpData = {
  fullName: string;
  email: string;
  enrollmentYear: string;
  course: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
  gender: UserGender;
  studentId?: string;
};

const SignUpPage = () => {
  const router = useRouter();

  const {
    data: courses,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
    refetch: isFetchingCourses,
  } = useCourses();

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      enrollmentYear: "",
      course: "",
      password: "",
      confirmPassword: "",
      userType: "" as any,
      gender: "" as any,
      studentId: "",
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (userData: NewUser) => AuthApi.signUp(userData),
    onSuccess: () => {
      router.push("/sign-in");
      toast.success("Usuário registrado com sucesso", {
        description: "Você já pode fazer login.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Erro ao registrar", {
        description: "Verifique os dados e tente novamente.",
        duration: 5000,
        position: "top-center",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });

  const onSubmit = (data: SignUpData) => {
    const newUser: NewUser = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      gender: data.gender as UserGender,
      userType: data.userType,
      course: data.course,
      enrollmentYear: data.enrollmentYear,
      ...(data.studentId && { studentId: data.studentId }),
    };

    signUpMutation.mutate(newUser);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {/* Título */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-primary">
        Criar Conta
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {/* COLUNA ESQUERDA */}
          <div className="flex flex-col">
            <Input
              {...register("fullName")}
              label="Nome completo"
              placeholder="Nome completo"
              error={errors.fullName?.message}
            />

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  label="Gênero"
                  error={errors.gender?.message}
                >
                  <SelectTrigger error={!!errors.gender}>
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserGender.MALE}>
                      {mapGender(UserGender.MALE)}
                    </SelectItem>
                    <SelectItem value={UserGender.FEMALE}>
                      {mapGender(UserGender.FEMALE)}
                    </SelectItem>
                    <SelectItem value={UserGender.OTHERS}>
                      {mapGender(UserGender.OTHERS)}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Input
              {...register("enrollmentYear")}
              label="Ano de ingresso"
              placeholder="2020"
              maxLength={4}
              error={errors.enrollmentYear?.message}
            />
          </div>

          {/* COLUNA DIREITA */}
          <div className="flex flex-col ">
            <Input
              {...register("email")}
              type="email"
              label="E-mail"
              placeholder="seu-email@exemplo.com"
              error={errors.email?.message}
            />

            <Controller
              name="userType"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  label="Tipo de usuário"
                  error={errors.userType?.message}
                >
                  <SelectTrigger error={!!errors.userType}>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserType.STUDENT}>
                      {mapUserType(UserType.STUDENT)}
                    </SelectItem>
                    <SelectItem value={UserType.TEACHER}>
                      {mapUserType(UserType.TEACHER)}
                    </SelectItem>
                    <SelectItem value={UserType.ALUMNI}>
                      {mapUserType(UserType.ALUMNI)}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  label="Curso"
                  error={errors.course?.message}
                >
                  <SelectTrigger error={!!errors.course}>
                    <SelectValue placeholder="Selecione seu curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses?.map((course) => (
                      <SelectItem
                        key={course.course_id}
                        value={course.course_id}
                      >
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Campo RA do estudante em 2 colunas */}
          <div className="md:col-span-2 ">
            <Input
              {...register("studentId")}
              label="RA do estudante"
              placeholder="Digite seu RA (opcional)"
              error={errors.studentId?.message}
            />
          </div>
        </div>

        {/* SENHAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <Input
            {...register("password")}
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            error={errors.password?.message}
          />

          <Input
            {...register("confirmPassword")}
            type="password"
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            error={errors.confirmPassword?.message}
          />
        </div>

        {/* BOTÕES */}
        <div className="flex flex-col gap-3 max-w-sm mx-auto mt-4">
          <Button
            type="submit"
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
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => {
              clearErrors();
              router.push("/sign-in");
            }}
          >
            Cancelar
          </Button>
        </div>
      </form>

      {/* LINKS */}
      <div className="flex justify-center gap-4 text-sm">
        <a href="/sign-in" className="text-primary">
          Login
        </a>
        <span>|</span>
        <a href="/forgot-password" className="text-primary">
          Esqueci a Senha
        </a>
      </div>
    </div>
  );
};

export default SignUpPage;
