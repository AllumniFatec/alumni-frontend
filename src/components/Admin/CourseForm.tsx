"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateCourse,
  useUpdateCourse,
} from "@/hooks/useCourses";
import type { Course } from "@/models/course";

export type CourseFormValues = {
  courseName: string;
  courseAbbreviation: string;
};

const defaultValues: CourseFormValues = {
  courseName: "",
  courseAbbreviation: "",
};

export function CourseForm({
  mode,
  course,
  open,
  onSuccess,
  onPendingChange,
}: {
  mode: "create" | "edit";
  course: Course | null;
  open: boolean;
  onSuccess: () => void;
  onPendingChange?: (pending: boolean) => void;
}) {
  const { mutateAsync: createCourse, isPending: createPending } =
    useCreateCourse();
  const { mutateAsync: updateCourse, isPending: updatePending } =
    useUpdateCourse();

  const form = useForm<CourseFormValues>({
    defaultValues,
    mode: "onTouched",
  });

  const { register, handleSubmit, reset, formState } = form;
  const pending = createPending || updatePending;
  const onPendingChangeRef = useRef(onPendingChange);
  onPendingChangeRef.current = onPendingChange;

  useEffect(() => {
    onPendingChangeRef.current?.(pending);
  }, [pending]);

  useEffect(() => {
    if (open) {
      reset({
        courseName: course?.name ?? "",
        courseAbbreviation: course?.abbreviation ?? "",
      });
    }
  }, [open, course, reset]);

  async function onSubmit(values: CourseFormValues) {
    const courseName = values.courseName.trim();
    const courseAbbreviation = values.courseAbbreviation.trim();

    if (mode === "edit" && course) {
      await updateCourse({
        courseId: course.course_id,
        body: { courseName, courseAbbreviation },
      });
    } else {
      await createCourse({ courseName, courseAbbreviation });
    }
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nome do curso"
        autoComplete="off"
        disabled={pending}
        error={formState.errors.courseName?.message}
        {...register("courseName", {
          required: "Informe o nome do curso.",
          minLength: {
            value: 3,
            message: "O nome deve ter pelo menos 3 caracteres.",
          },
          maxLength: {
            value: 100,
            message: "O nome pode ter no máximo 100 caracteres.",
          },
        })}
      />
      <Input
        label="Sigla"
        autoComplete="off"
        disabled={pending}
        error={formState.errors.courseAbbreviation?.message}
        {...register("courseAbbreviation", {
          required: "Informe a sigla.",
          minLength: {
            value: 1,
            message: "A sigla é obrigatória.",
          },
          maxLength: {
            value: 10,
            message: "A sigla pode ter no máximo 10 caracteres.",
          },
        })}
      />
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              A guardar…
            </>
          ) : mode === "create" ? (
            "Cadastrar"
          ) : (
            "Guardar alterações"
          )}
        </Button>
      </div>
    </form>
  );
}
