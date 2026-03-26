"use client";

import { GraduationCap } from "lucide-react";
import type { ProfileCourse } from "@/models/profile";

export function ProfileCoursesSection({ courses }: { courses: ProfileCourse[] }) {
  if (courses.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <GraduationCap className="h-4 w-4" />
        Cursos
      </h3>
      <div className="space-y-2">
        {courses.map((c, i) => (
          <div
            key={`${c.course_name}-${c.enrollmentYear}-${i}`}
            className="rounded-xl border border-border/60 bg-card/50 p-4"
          >
            <p className="font-medium text-foreground">{c.course_name}</p>
            <p className="text-sm text-muted-foreground">
              Ingresso em {c.enrollmentYear}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
