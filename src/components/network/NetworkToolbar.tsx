"use client";

import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type NetworkToolbarProps = {
  searchInput: string;
  onSearchChange: (value: string) => void;
  selectedCourse: string;
  onCourseChange: (value: string) => void;
  selectedWorkplace: string;
  onWorkplaceChange: (value: string) => void;
  courses: Array<{ course_id: string; name: string }>;
  workplaces: Array<{ workplace_id: string; company: string }>;
};

export function NetworkToolbar({
  searchInput,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  selectedWorkplace,
  onWorkplaceChange,
  courses,
  workplaces,
}: NetworkToolbarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between mb-8">
      <div className="relative w-full md:max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
        <input
          type="search"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nome, ano de matrícula ou habilidade…"
          className={cn(
            "w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 bg-muted text-sm text-foreground shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
          )}
          aria-label="Buscar na rede"
        />
      </div>

      <div className="flex flex-col gap-3 w-full md:flex-row md:w-auto md:items-center">
        <Select value={selectedCourse} onValueChange={onCourseChange}>
          <SelectTrigger className="h-10 min-w-[180px] bg-muted">
            <SelectValue placeholder="Todos os cursos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os cursos</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course.course_id} value={course.name}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedWorkplace} onValueChange={onWorkplaceChange}>
          <SelectTrigger className="h-10 min-w-[180px] bg-muted">
            <SelectValue placeholder="Todas as empresas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as empresas</SelectItem>
            {workplaces.map((workplace) => (
              <SelectItem
                key={workplace.workplace_id}
                value={workplace.company}
              >
                {workplace.company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
