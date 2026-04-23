"use client";

import Link from "next/link";
import {
  startTransition,
  useCallback,
  useMemo,
  useState,
  type ComponentType,
} from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type Updater,
} from "@tanstack/react-table";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Loader2,
  UserCheck,
  XCircle,
} from "lucide-react";
import {
  useAdminDashboard,
  useAdminPendingUsers,
  useApproveUser,
  useRefuseUser,
} from "@/hooks/useAdmin";
import type { AdminPendingUserRow } from "@/models/admin";
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
import { cn, getUserInitials } from "@/lib/utils";
import { mapGender, mapUserType } from "@/hooks/mapUserType";
import { UserGender, UserType } from "@/models/users";

function formatCourses(row: AdminPendingUserRow) {
  if (!row.courses?.length) return "—";
  return row.courses.map((c) => c.course_name).join(", ");
}

export default function AdminPage() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    data: dashboardData,
    isError: dashboardIsError,
    error: dashboardError,
    refetch: refetchDashboard,
  } = useAdminDashboard();
  const {
    data: pendingData,
    isLoading: pendingIsLoading,
    isError: pendingIsError,
    error: pendingError,
    refetch: refetchPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminPendingUsers();
  const {
    mutate: approveUser,
    isPending: approvePending,
    variables: approveUserId,
  } = useApproveUser();
  const {
    mutate: refuseUser,
    isPending: refusePending,
    variables: refuseUserId,
  } = useRefuseUser();

  const busy = approvePending || refusePending;

  const pendingRows = useMemo(
    () => pendingData?.pages.flatMap((page) => page.users) ?? [],
    [pendingData],
  );

  const onSortingChange = useCallback((updater: Updater<SortingState>) => {
    startTransition(() => {
      setSorting(updater);
    });
  }, []);

  const columns = useMemo<ColumnDef<AdminPendingUserRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nome" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
              aria-hidden
            >
              {getUserInitials(row.original.name)}
            </div>
            <span className="font-medium text-foreground">
              {row.original.name}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="E-mail" />
        ),
        cell: ({ row }) => (
          <span className="block max-w-[14rem] truncate text-sm text-muted-foreground">
            {row.original.email}
          </span>
        ),
      },
      {
        id: "student_id",
        accessorFn: (row) => row.student_id ?? "",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="RA" />
        ),
        cell: ({ row }) => (
          <span className="font-mono text-sm text-muted-foreground">
            {row.original.student_id ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "gender",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Gênero" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {mapGender(row.original.gender as UserGender) ||
              row.original.gender}
          </span>
        ),
      },
      {
        accessorKey: "user_type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tipo" />
        ),
        cell: ({ row }) => (
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
            {mapUserType(row.original.user_type as UserType) ||
              row.original.user_type}
          </span>
        ),
      },
      {
        id: "courses",
        accessorFn: (row) => formatCourses(row),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Curso" />
        ),
        cell: ({ row }) => (
          <span className="max-w-xs whitespace-normal text-sm text-foreground">
            {formatCourses(row.original)}
          </span>
        ),
        sortingFn: "alphanumeric",
      },
      {
        id: "actions",
        enableSorting: false,
        header: () => (
          <div className="flex w-full justify-end text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
            Ações
          </div>
        ),
        cell: ({ row }) => {
          const id = row.original.user_id;
          return (
            <div className="flex justify-end gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-950/40"
                title="Aprovar"
                disabled={busy}
                onClick={() => approveUser(id)}
              >
                {approvePending && approveUserId === id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="size-4" />
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-destructive hover:bg-destructive/10"
                title="Recusar"
                disabled={busy}
                onClick={() => refuseUser(id)}
              >
                {refusePending && refuseUserId === id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <XCircle className="size-4" />
                )}
              </Button>
            </div>
          );
        },
      },
    ],
    [
      busy,
      approveUser,
      refuseUser,
      approvePending,
      refusePending,
      approveUserId,
      refuseUserId,
    ],
  );

  const table = useReactTable({
    data: pendingRows,
    columns,
    state: { sorting },
    onSortingChange,
    getRowId: (row) => row.user_id,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-10">
      <header>
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Visão geral
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-roboto-slab)] text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Dashboard
        </h1>
      </header>

      {(dashboardIsError || pendingIsError) && (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {dashboardError instanceof Error
            ? dashboardError.message
            : "Erro ao carregar dashboard."}
          {pendingError instanceof Error
            ? pendingError.message
            : "Error ao carregar usuários em análise"}
          <Button
            variant="outline"
            size="sm"
            className="ml-3"
            onClick={() => {
              void refetchDashboard();
              void refetchPending();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      )}

      <section
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        aria-label="Indicadores"
      >
        <KpiCard
          icon={Clock}
          label="Usuários em análise"
          badge="Pendente"
          value={dashboardData?.countUsersInAnalysis ?? "—"}
          iconClass="bg-primary/10 text-primary"
        />
        <KpiCard
          icon={UserCheck}
          label="Usuários ativos"
          badge="Total"
          value={dashboardData?.countUsersActive ?? "—"}
          iconClass="bg-secondary/15 text-secondary"
        />
        <KpiCard
          icon={Briefcase}
          label="Vagas ativas"
          badge="Oportunidades"
          value={dashboardData?.countJobsActive ?? "—"}
          iconClass="bg-tertiary/10 text-tertiary"
        />
      </section>

      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_12px_32px_rgba(174,12,13,0.06)]">
        <div className="flex flex-col gap-4 border-b border-border px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-roboto-slab)] text-xl font-bold text-foreground">
              Usuários em análise
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Aprovações pendentes de novos cadastros
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/users">Ver todos os usuários</Link>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
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
                      className={cn(
                        "min-w-0 px-6 py-3 align-middle",
                        header.column.id === "actions" && "text-right",
                        header.column.id === "courses" && "min-w-[12rem]",
                      )}
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
              {pendingIsLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="px-6 py-10 text-center">
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="size-5 animate-spin" />A carregar…
                    </span>
                  </TableCell>
                </TableRow>
              )}
              {!pendingIsLoading && pendingRows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="px-6 py-10 text-center text-muted-foreground"
                  >
                    Nenhum usuário em análise.
                  </TableCell>
                </TableRow>
              )}
              {!pendingIsLoading &&
                pendingRows.length > 0 &&
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.original.user_id}
                    className="hover:bg-muted/30"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "min-w-0 px-6 py-4 align-middle",
                          cell.column.id === "actions" && "text-right",
                        )}
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
        </div>

        {pendingData?.pages[0] && (
          <div className="flex flex-col items-start justify-between gap-3 border-t border-border bg-muted/20 px-6 py-4 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              Página{" "}
              {pendingData.pages[pendingData.pages.length - 1].pagination.page}{" "}
              de{" "}
              {
                pendingData.pages[pendingData.pages.length - 1].pagination
                  .totalPages
              }{" "}
              · {pendingRows.length} de{" "}
              {pendingData.pages[0].pagination.totalItems} em análise
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
                    <Loader2 className="size-4 animate-spin" />A carregar…
                  </>
                ) : (
                  "Carregar mais"
                )}
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  badge,
  value,
  iconClass,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  badge: string;
  value: number | string;
  iconClass: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow",
        "hover:shadow-md",
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-lg",
            iconClass,
          )}
        >
          <Icon className="size-5" />
        </div>
        <span className="rounded bg-muted px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-muted-foreground">
          {badge}
        </span>
      </div>
      <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="font-[family-name:var(--font-roboto-slab)] text-4xl font-black text-foreground transition-colors group-hover:text-primary">
        {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
      </p>
    </div>
  );
}
