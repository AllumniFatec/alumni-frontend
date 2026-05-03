"use client";

import { useState } from "react";
import { GraduationCap, Loader2, Plus } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import type { Course } from "@/models/course";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CourseCard } from "@/components/Admin/CourseCard";
import { CourseForm } from "@/components/Admin/CourseForm";

export default function AdminCoursesPage() {
  const { data: courses, isLoading, isError, error, refetch } = useCourses();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formPending, setFormPending] = useState(false);

  const mode = selectedCourse ? "edit" : "create";

  function openCreate() {
    setSelectedCourse(null);
    setDialogOpen(true);
  }

  function openEdit(course: Course) {
    setSelectedCourse(course);
    setDialogOpen(true);
  }

  function handleDialogOpenChange(next: boolean) {
    if (!next && formPending) return;
    setDialogOpen(next);
    if (!next) setSelectedCourse(null);
  }

  function handleFormSuccess() {
    setDialogOpen(false);
    setSelectedCourse(null);
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Administração
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-roboto-slab)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Cursos
          </h1>
        </div>
        <Button
          type="button"
          className="shrink-0 gap-2"
          onClick={openCreate}
        >
          <Plus className="size-4" />
          Cadastrar curso
        </Button>
      </header>

      {isError && (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error instanceof Error ? error.message : "Erro ao carregar cursos."}
          <Button
            variant="outline"
            size="sm"
            className="ml-3"
            onClick={() => void refetch()}
          >
            Tentar novamente
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-16 text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Loader2 className="size-6 animate-spin" />
            A carregar cursos…
          </span>
        </div>
      )}

      {!isLoading && !isError && courses?.length === 0 && (
        <p className="rounded-xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center text-sm text-muted-foreground">
          Nenhum curso cadastrado. Utilize &quot;Cadastrar curso&quot; para
          adicionar.
        </p>
      )}

      {!isLoading && !isError && (courses?.length ?? 0) > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {courses!.map((course) => (
            <li key={course.course_id}>
              <CourseCard
                title={course.name}
                abbreviation={course.abbreviation}
                icon={GraduationCap}
                onClick={() => openEdit(course)}
              />
            </li>
          ))}
        </ul>
      )}

      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent
          showCloseButton={!formPending}
          className="sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle className="text-left">
              {mode === "create" ? "Cadastrar curso" : "Editar curso"}
            </DialogTitle>
            <DialogDescription className="text-left text-sm">
              {mode === "create"
                ? "Preencha o nome e a sigla do novo curso."
                : "Atualize o nome ou a sigla do curso."}
            </DialogDescription>
          </DialogHeader>
          <CourseForm
            mode={mode}
            course={selectedCourse}
            open={dialogOpen}
            onSuccess={handleFormSuccess}
            onPendingChange={setFormPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
