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

const SEARCH_DEBOUNCE_MS = 320;

export default function NetworkPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, SEARCH_DEBOUNCE_MS);

  const searchTerm = debouncedSearch.trim();
  const isSearchMode = searchTerm.length > 0;

  const listQuery = useUsersPage(page, { enabled: !isSearchMode });
  const searchQuery = useUserSearch(searchTerm);

  const activeQuery = isSearchMode ? searchQuery : listQuery;
  const { data, isLoading, isError, refetch, isFetching } = activeQuery;

  const rows = data ?? [];
  const isEmpty = rows.length === 0;

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    setPage(1);
  }, []);

  const handleClear = useCallback(() => {
    setSearchInput("");
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
            isSearchMode={isSearchMode}
            onClear={handleClear}
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
            isSearchMode={isSearchMode}
            onClear={handleClear}
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
          isSearchMode={isSearchMode}
          onClear={handleClear}
        />

        {isFetching && (
          <p className="text-xs text-slate-400 mb-4">Atualizando…</p>
        )}

        {isEmpty ? (
          <p className="text-sm text-slate-500 py-8 text-center">
            {isSearchMode
              ? "Nenhum resultado para essa busca."
              : "Nenhum usuário encontrado nesta página."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {rows.map((u) => (
              <ProfileCard
                key={u.user_id}
                user={u}
                headlineWorkplace={u.workplace_history[0] ?? null}
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
