"use client";

import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Section } from "@/components/Section";
import { ErrorState } from "@/components/ErrorState";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { NetworkToolbar } from "@/components/network/NetworkToolbar";
import { ProfileCard } from "@/components/users/ProfileCard";
import { useUsersList, useUserSearch, usersQueryKeys } from "@/hooks/useUsers";
import { useCourses, useWorkplaces } from "@/hooks/useNetwork";

const SEARCH_DEBOUNCE_MS = 320;

export default function NetworkPage() {
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedWorkplace, setSelectedWorkplace] = useState("all");
  const [debouncedSearch] = useDebounce(searchInput, SEARCH_DEBOUNCE_MS);

  const searchTerm = debouncedSearch.trim();
  const isSearchMode = searchTerm.length > 0;
  const hasActiveFilter =
    selectedCourse !== "all" || selectedWorkplace !== "all";

  const listQuery = useUsersList({ enabled: !isSearchMode });
  const searchQuery = useUserSearch(searchTerm);

  const activeQuery = isSearchMode ? searchQuery : listQuery;
  const { isLoading, isError, refetch, isFetching } = activeQuery;

  const allUsers = useMemo(
    () =>
      (listQuery.data?.pages ?? []).flatMap((page) => page.users),
    [listQuery.data?.pages],
  );

  const allSearchUsers = useMemo(
    () =>
      (searchQuery.data?.pages ?? []).flatMap((page) => page.users),
    [searchQuery.data?.pages],
  );

  const {
    data: coursesData,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
  } = useCourses();
  const {
    data: workplacesData,
    isLoading: isLoadingWorkplaces,
    isError: isErrorWorkplaces,
  } = useWorkplaces();

  const rows = isSearchMode ? allSearchUsers : allUsers;

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

  const loadMoreQuery = isSearchMode ? searchQuery : listQuery;

  const handleSearchChange = useCallback(
    (search: string) => {
      setSearchInput(search);
      if (search.trim() === "") {
        void queryClient.resetQueries({ queryKey: usersQueryKeys.list });
        void queryClient.resetQueries({ queryKey: ["users", "search"] });
      }
    },
    [queryClient],
  );

  const handleCourseChange = useCallback(
    (course: string) => {
      setSelectedCourse(course);
      void queryClient.resetQueries({ queryKey: usersQueryKeys.list });
      void queryClient.resetQueries({ queryKey: ["users", "search"] });
    },
    [queryClient],
  );

  const handleWorkplaceChange = useCallback(
    (workplace: string) => {
      setSelectedWorkplace(workplace);
      void queryClient.resetQueries({ queryKey: usersQueryKeys.list });
      void queryClient.resetQueries({ queryKey: ["users", "search"] });
    },
    [queryClient],
  );

  if (isLoading || isLoadingCourses || isLoadingWorkplaces) {
    return (
      <div>
        <Section title="Rede de Alumni">
          <p className="text-info text-sm mb-6">
            Faça uma busca por nome, ano de matrícula ou habilidades
          </p>
          <NetworkToolbar
            searchInput={searchInput}
            onSearchChange={handleSearchChange}
            selectedCourse={selectedCourse}
            onCourseChange={handleCourseChange}
            selectedWorkplace={selectedWorkplace}
            onWorkplaceChange={handleWorkplaceChange}
            courses={coursesData ?? []}
            workplaces={workplacesData ?? []}
          />
          <div className="flex justify-center py-16">
            <Spinner className="size-8 text-primary" />
          </div>
        </Section>
      </div>
    );
  }

  if (isError || isErrorCourses || isErrorWorkplaces) {
    return (
      <div>
        <Section title="Rede de Alumni">
          <p className="text-info text-sm mb-6">
            Faça uma busca por nome, ano de matrícula ou habilidades
          </p>
          <NetworkToolbar
            searchInput={searchInput}
            onSearchChange={handleSearchChange}
            selectedCourse={selectedCourse}
            onCourseChange={handleCourseChange}
            selectedWorkplace={selectedWorkplace}
            onWorkplaceChange={handleWorkplaceChange}
            courses={coursesData ?? []}
            workplaces={workplacesData ?? []}
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
        <p className="text-info text-sm mb-6">
          Faça uma busca por nome, ano de matrícula ou habilidades
        </p>
        <NetworkToolbar
          searchInput={searchInput}
          onSearchChange={handleSearchChange}
          selectedCourse={selectedCourse}
          onCourseChange={handleCourseChange}
          selectedWorkplace={selectedWorkplace}
          onWorkplaceChange={handleWorkplaceChange}
          courses={coursesData ?? []}
          workplaces={workplacesData ?? []}
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

        {loadMoreQuery?.hasNextPage ? (
          <div className="flex justify-center mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => loadMoreQuery.fetchNextPage()}
              disabled={loadMoreQuery.isFetchingNextPage}
            >
              {loadMoreQuery.isFetchingNextPage
                ? "Carregando..."
                : "Carregar mais"}
            </Button>
          </div>
        ) : null}
      </Section>
    </div>
  );
}
