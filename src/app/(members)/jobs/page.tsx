"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Section } from "@/components/Section";
import { JobCard } from "@/components/Jobs/JobCard";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobs } from "@/hooks/useJobs";
import {
  EmploymentType,
  EmploymentTypeLabel,
  JobListItem,
  WorkModel,
  WorkModelLabel,
} from "@/models/job";

function JobsFilters({
  search,
  onSearchChange,
  workModel,
  onWorkModelChange,
  employmentType,
  onEmploymentTypeChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  workModel: string;
  onWorkModelChange: (value: string) => void;
  employmentType: string;
  onEmploymentTypeChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="w-full sm:flex-1 sm:min-w-[200px]">
        <Input
          className="bg-muted"
          placeholder="Buscar por título ou empresa..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-48">
        <Select value={workModel} onValueChange={onWorkModelChange}>
          <SelectTrigger className="bg-muted">
            <SelectValue placeholder="Modelo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os modelos</SelectItem>
            {Object.values(WorkModel).map((v) => (
              <SelectItem key={v} value={v}>
                {WorkModelLabel[v]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-48">
        <Select value={employmentType} onValueChange={onEmploymentTypeChange}>
          <SelectTrigger className="bg-muted">
            <SelectValue placeholder="Contratação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {Object.values(EmploymentType).map((v) => (
              <SelectItem key={v} value={v}>
                {EmploymentTypeLabel[v]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function JobsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center p-3 rounded-xl border border-slate-100"
        >
          <Skeleton className="w-12 h-12 rounded-lg mr-4 shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function JobsGrid({ jobs }: { jobs: JobListItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [workModel, setWorkModel] = useState<string>("all");
  const [employmentType, setEmploymentType] = useState<string>("all");

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useJobs();

  const allJobs = useMemo(
    () => data?.pages.flatMap((page) => page) ?? [],
    [data],
  );

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.workplace.toLowerCase().includes(search.toLowerCase());
      const matchesWorkModel =
        workModel === "all" || job.work_model === workModel;
      const matchesEmploymentType =
        employmentType === "all" || job.employment_type === employmentType;
      return matchesSearch && matchesWorkModel && matchesEmploymentType;
    });
  }, [allJobs, search, workModel, employmentType]);

  const headerText = isLoading
    ? "Carregando..."
    : `${filteredJobs.length} vaga${filteredJobs.length !== 1 ? "s" : ""}`;

  const baseContent = (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-700">{headerText}</h2>
        <Link href="/jobs/new">
          <Button size="sm" variant="destructive">
            Publicar Vaga
          </Button>
        </Link>
      </div>

      <JobsFilters
        search={search}
        onSearchChange={setSearch}
        workModel={workModel}
        onWorkModelChange={setWorkModel}
        employmentType={employmentType}
        onEmploymentTypeChange={setEmploymentType}
      />

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <JobsSkeleton />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          title="Nenhuma vaga encontrada"
          description="Tente ajustar os filtros ou seja o primeiro a publicar!"
        />
      ) : (
        <>
          <JobsGrid jobs={filteredJobs} />

          {hasNextPage && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div>
      <Section title="Vagas">{baseContent}</Section>
    </div>
  );
}
