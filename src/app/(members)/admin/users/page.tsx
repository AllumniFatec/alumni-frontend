"use client";

import { startTransition, useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type Updater,
} from "@tanstack/react-table";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import {
  ADMIN_USERS_LIST_QUERY_KEY,
  useAdminSearchUsers,
  useAdminUsers,
} from "@/hooks/useAdmin";
import type { PublicUserListItem } from "@/models/userPublic";
import type { ProfilePhoto } from "@/models/profile";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mapUserType } from "@/hooks/mapUserType";
import { cn, getUserInitials } from "@/lib/utils";
import type { UserType } from "@/models/users";
import { ChangeUserTypeDialog } from "@/components/Admin/ChangeUserTypeDialog";
import { BanUserDialog } from "@/components/Admin/BanUserDialog";

const SEARCH_DEBOUNCE_MS = 600;

function profilePhotoSrc(
  photo: PublicUserListItem["perfil_photo"],
): string | undefined {
  if (!photo) return undefined;
  if (typeof photo === "string") return photo;
  return (photo as ProfilePhoto).url;
}

function formatCourses(user: PublicUserListItem) {
  if (!user.courses?.length) return "—";
  return user.courses.map((c) => c.course_name).join(", ");
}

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, SEARCH_DEBOUNCE_MS);
  const [changeTypeOpen, setChangeTypeOpen] = useState(false);
  const [banOpen, setBanOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PublicUserListItem | null>(
    null,
  );

  const isSearchMode = debouncedSearch.trim().length > 0;

  const listQuery = useAdminUsers({ enabled: !isSearchMode });
  const searchQuery = useAdminSearchUsers(debouncedSearch);

  const activeQuery = isSearchMode ? searchQuery : listQuery;
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = activeQuery;

  /** Referência estável: evita que o TanStack Table trate os dados como “novos” a cada render. */
  const users = useMemo(
    () => data?.pages.flatMap((page) => page.users) ?? [],
    [data],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      if (value.trim() === "") {
        void queryClient.resetQueries({ queryKey: ADMIN_USERS_LIST_QUERY_KEY });
        void queryClient.resetQueries({ queryKey: ["admin", "users", "search"] });
      }
    },
    [queryClient],
  );

  const onSortingChange = useCallback((updater: Updater<SortingState>) => {
    startTransition(() => {
      setSorting(updater);
    });
  }, []);

  const columns = useMemo<ColumnDef<PublicUserListItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Utilizador" />
        ),
        cell: ({ row }) => {
          const user = row.original;
          const src = profilePhotoSrc(user.perfil_photo);
          return (
            <div className="flex items-center gap-3">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                {src ? (
                  <Image
                    src={src}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="size-full rounded-full border border-border object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex size-full items-center justify-center rounded-full border-2 border-white bg-primary/10 text-sm font-black text-primary shadow-sm">
                    {getUserInitials(user.name)}
                  </div>
                )}
              </div>
              <span className="font-medium text-foreground">{user.name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "user_type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tipo" />
        ),
        cell: ({ row }) => (
          <span className="inline-flex rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary">
            {mapUserType(row.original.user_type as UserType) ||
              row.original.user_type}
          </span>
        ),
      },
      {
        id: "courses",
        accessorFn: (row) => formatCourses(row),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Cursos" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-foreground">
            {formatCourses(row.original)}
          </span>
        ),
        sortingFn: "alphanumeric",
      },
      {
        id: "changeType",
        header: () => <span className="text-xs font-semibold">Tipo de Usuário</span>,
        cell: ({ row }) => (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedUser(row.original);
              setChangeTypeOpen(true);
            }}
          >
            Alterar 
          </Button>
        ),
      },
      {
        id: "ban",
        header: () => <span className="text-xs font-semibold">Banir Usuário</span>,
        cell: ({ row }) => (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => {
              setSelectedUser(row.original);
              setBanOpen(true);
            }}
          >
            Banir
          </Button>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting },
    onSortingChange,
    getRowId: (row) => row.user_id,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Administração
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-roboto-slab)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Usuários
        </h1>
      </header>

      <div className="relative max-w-lg">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar por nome"
          className={cn(
            "h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground shadow-sm",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30",
          )}
          aria-label="Buscar utilizadores"
        />
      </div>

      {isFetching && !isLoading && (
        <p className="text-xs text-muted-foreground">A atualizar…</p>
      )}

      {isError && (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error instanceof Error ? error.message : "Erro ao carregar utilizadores."}
          <Button
            variant="outline"
            size="sm"
            className="ml-3"
            onClick={() => refetch()}
          >
            Tentar novamente
          </Button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/40 hover:bg-muted/40"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 text-left align-middle"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="px-4 py-12 text-center">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="size-5 animate-spin" />
                    A carregar…
                  </span>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && users.length === 0 && !isError && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  {isSearchMode
                    ? "Nenhum resultado para essa busca."
                    : "Nenhum utilizador encontrado."}
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              users.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original.user_id}
                  className="hover:bg-muted/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-normal px-4 py-3 align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {data?.pages[0] && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-border bg-muted/20 px-4 py-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              Página {data.pages[data.pages.length - 1].pagination.page} de{" "}
              {data.pages[data.pages.length - 1].pagination.totalPages} ·{" "}
              {users.length} de{" "}
              {data.pages[0].pagination.totalItems} utilizadores
            </p>
            {hasNextPage && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    A carregar…
                  </>
                ) : (
                  "Carregar mais"
                )}
              </Button>
            )}
          </div>
        )}
      </div>

      <ChangeUserTypeDialog
        open={changeTypeOpen}
        onOpenChange={setChangeTypeOpen}
        user={
          selectedUser
            ? {
                user_id: selectedUser.user_id,
                name: selectedUser.name,
                user_type: selectedUser.user_type,
              }
            : null
        }
      />

      <BanUserDialog
        open={banOpen}
        onOpenChange={setBanOpen}
        user={
          selectedUser
            ? { user_id: selectedUser.user_id, name: selectedUser.name }
            : null
        }
      />
    </div>
  );
}
