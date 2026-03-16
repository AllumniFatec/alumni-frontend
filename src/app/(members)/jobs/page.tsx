"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Section } from "@/components/Section";
import { JobCard } from "@/components/JobCard";
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
  WorkModel,
  WorkModelLabel,
} from "@/models/job";

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

  return (
    <div>
      <Section title="Vagas">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-700">
              {isLoading
                ? "Carregando..."
                : `${filteredJobs.length} vaga${filteredJobs.length !== 1 ? "s" : ""}`}
            </h2>
            <Link href="/jobs/new">
              <Button size="sm">Publicar Vaga</Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Buscar por título ou empresa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select value={workModel} onValueChange={setWorkModel}>
                <SelectTrigger>
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
            <div className="w-48">
              <Select value={employmentType} onValueChange={setEmploymentType}>
                <SelectTrigger>
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

          {isError && <ErrorState onRetry={refetch} />}

          {isLoading && (
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
          )}

          {!isLoading && !isError && filteredJobs.length === 0 && (
            <EmptyState
              title="Nenhuma vaga encontrada"
              description="Tente ajustar os filtros ou seja o primeiro a publicar!"
            />
          )}

          {!isLoading && !isError && filteredJobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

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
        </div>
      </Section>
    </div>
  );
}
