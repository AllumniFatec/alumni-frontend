"use client";

import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { Section } from "@/components/Section";
import { ErrorState } from "@/components/ErrorState";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { NetworkToolbar } from "@/components/network/NetworkToolbar";
import { ProfileCard } from "@/components/users/ProfileCard";
import { useUsersPage, useUserSearch } from "@/hooks/useUsers";
import { useCourses, useWorkplaces } from "@/hooks/useNetwork";

const SEARCH_DEBOUNCE_MS = 320;

export default function NetworkPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedWorkplace, setSelectedWorkplace] = useState("all");
  const [debouncedSearch] = useDebounce(searchInput, SEARCH_DEBOUNCE_MS);

  const searchTerm = debouncedSearch.trim();
  const isSearchMode = searchTerm.length > 0;
  const hasActiveFilter =
    selectedCourse !== "all" || selectedWorkplace !== "all";

  const listQuery = useUsersPage(page, { enabled: !isSearchMode });
  const searchQuery = useUserSearch(searchTerm);

  const activeQuery = isSearchMode ? searchQuery : listQuery;
  const { data, isLoading, isError, refetch, isFetching } = activeQuery;

  const courses = useCourses();
  const workplaces = useWorkplaces();

  const rows = data ?? [];

  const filteredRows = rows.filter((user) => {
    const courseMatches =
      selectedCourse === "all" ||
      user.courses.some((course) => course.course_name === selectedCourse);
    const workplaceMatches =
      selectedWorkplace === "all" ||
      user.workplace_history.some(
        (entry) => entry.workplace.company === selectedWorkplace,
      );
    return courseMatches && workplaceMatches;
  });

  const isEmpty = filteredRows.length === 0;

  const handleSearchChange = useCallback((search: string) => {
    setSearchInput(search);
    setPage(1);
  }, []);

  const handleCourseChange = useCallback((course: string) => {
    setSelectedCourse(course);
    setPage(1);
  }, []);

  const handleWorkplaceChange = useCallback((workplace: string) => {
    setSelectedWorkplace(workplace);
    setPage(1);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Section title="Rede de Alumni">
          <p className="text-slate-500 text-sm mb-6">
            Conecte-se com egressos da FATEC Sorocaba
          </p>
          <NetworkToolbar
            searchInput={searchInput}
            onSearchChange={handleSearchChange}
            selectedCourse={selectedCourse}
            onCourseChange={handleCourseChange}
            selectedWorkplace={selectedWorkplace}
            onWorkplaceChange={handleWorkplaceChange}
            courses={courses ?? []}
            workplaces={workplaces ?? []}
          />
          <div className="flex justify-center py-16">
            <Spinner className="size-8 text-primary" />
          </div>
        </Section>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Section title="Rede de Alumni">
          <p className="text-slate-500 text-sm mb-6">
            Conecte-se com egressos da FATEC Sorocaba
          </p>
          <NetworkToolbar
            searchInput={searchInput}
            onSearchChange={handleSearchChange}
            selectedCourse={selectedCourse}
            onCourseChange={handleCourseChange}
            selectedWorkplace={selectedWorkplace}
            onWorkplaceChange={handleWorkplaceChange}
            courses={courses ?? []}
            workplaces={workplaces ?? []}
          />
          <ErrorState
            title="Não foi possível carregar a rede"
            description="Verifique sua conexão ou tente novamente."
            onRetry={() => refetch()}
          />
        </Section>
      </div>
    );
  }

  return (
    <div>
      <Section title="Rede de Alumni">
        <p className="text-slate-500 text-sm mb-6">
          Conecte-se com egressos da FATEC Sorocaba
        </p>
        <NetworkToolbar
          searchInput={searchInput}
          onSearchChange={handleSearchChange}
          selectedCourse={selectedCourse}
          onCourseChange={handleCourseChange}
          selectedWorkplace={selectedWorkplace}
          onWorkplaceChange={handleWorkplaceChange}
          courses={courses ?? []}
          workplaces={workplaces ?? []}
        />

        {isFetching && (
          <p className="text-xs text-slate-400 mb-4">Atualizando…</p>
        )}

        {isEmpty ? (
          <p className="text-sm text-slate-500 py-8 text-center">
            {isSearchMode || hasActiveFilter
              ? "Nenhum resultado para essa busca."
              : "Nenhum usuário encontrado nesta página."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRows.map((user) => (
              <ProfileCard
                key={user.user_id}
                user={user}
                headlineWorkplace={user.workplace_history[0] ?? null}
              />
            ))}
          </div>
        )}

        {!isSearchMode && listQuery.hasNextPage && (
          <div className="flex justify-center gap-2 mt-10">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Anterior
            </Button>
            <span className="flex items-center px-3 text-sm text-slate-600">
              Página {page}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!listQuery.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Próxima
            </Button>
          </div>
        )}
      </Section>
    </div>
  );
}
