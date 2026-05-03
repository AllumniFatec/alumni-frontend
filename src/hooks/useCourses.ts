import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { CoursesApi } from "@/apis/courses";

function courseMutationErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { error?: string; message?: string }
      | undefined;
    if (data?.error) return data.error;
    if (data?.message) return data.message;
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Não foi possível concluir a operação.";
}

const toastSuccessOpts = {
  duration: 5000,
  position: "top-right" as const,
  className:
    "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
};

const toastErrorOpts = {
  duration: 5000,
  position: "top-right" as const,
  className:
    "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
};

export const COURSES_LIST_QUERY_KEY = ["courses", "list"] as const;

export function useCourses() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: COURSES_LIST_QUERY_KEY,
    queryFn: () => CoursesApi.getCourses(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export function useCreateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Parameters<typeof CoursesApi.createCourse>[0]) =>
      CoursesApi.createCourse(body),
    onSuccess: (data) => {
      toast.success("Curso cadastrado", {
        description: data.message,
        ...toastSuccessOpts,
      });
      qc.invalidateQueries({ queryKey: COURSES_LIST_QUERY_KEY });
    },
    onError: (error) => {
      toast.error("Erro ao cadastrar curso", {
        description: courseMutationErrorMessage(error),
        ...toastErrorOpts,
      });
    },
  });
}

export function useUpdateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      courseId: string;
      body: Parameters<typeof CoursesApi.updateCourse>[1];
    }) => CoursesApi.updateCourse(vars.courseId, vars.body),
    onSuccess: (data) => {
      toast.success("Curso atualizado", {
        description: data.message,
        ...toastSuccessOpts,
      });
      qc.invalidateQueries({ queryKey: COURSES_LIST_QUERY_KEY });
    },
    onError: (error) => {
      toast.error("Erro ao atualizar curso", {
        description: courseMutationErrorMessage(error),
        ...toastErrorOpts,
      });
    },
  });
}
