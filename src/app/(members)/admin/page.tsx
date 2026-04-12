"use client";

import Link from "next/link";
import { type ComponentType } from "react";
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
  useApproveUser,
  useRefuseUser,
} from "@/hooks/useAdmin";
import type { AdminPendingUserRow } from "@/models/admin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getUserInitials } from "@/lib/utils";

function formatCourses(row: AdminPendingUserRow) {
  if (!row.courses?.length) return "—";
  return row.courses.map((c) => c.course_name).join(", ");
}

export default function AdminPage() {
  const { data, isLoading, isError, error, refetch } = useAdminDashboard();
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

      {isError && (
        <div
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error instanceof Error ? error.message : "Erro ao carregar dashboard."}
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

      <section
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        aria-label="Indicadores"
      >
        <KpiCard
          icon={Clock}
          label="Usuários em análise"
          badge="Pendente"
          value={data?.countUsersInAnalysis ?? "—"}
          iconClass="bg-primary/10 text-primary"
        />
        <KpiCard
          icon={UserCheck}
          label="Usuários ativos"
          badge="Total"
          value={data?.countUsersActive ?? "—"}
          iconClass="bg-secondary/15 text-secondary"
        />
        <KpiCard
          icon={Briefcase}
          label="Vagas ativas"
          badge="Oportunidades"
          value={data?.countJobsActive ?? "—"}
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
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                  Nome
                </TableHead>
                <TableHead className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                  E-mail
                </TableHead>
                <TableHead className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                  RA
                </TableHead>
                <TableHead className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                  Gênero
                </TableHead>
                <TableHead className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                  Tipo
                </TableHead>
                <TableHead className="min-w-[12rem] px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                  Curso
                </TableHead>
                <TableHead className="px-6 py-3 text-right text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="px-6 py-10 text-center">
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="size-5 animate-spin" />
                      A carregar…
                    </span>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                data?.usersInAnalysis &&
                data.usersInAnalysis.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="px-6 py-10 text-center text-muted-foreground"
                    >
                      Nenhum usuário em análise.
                    </TableCell>
                  </TableRow>
                )}
              {!isLoading &&
                data?.usersInAnalysis?.map((row) => (
                  <TableRow key={row.user_id} className="hover:bg-muted/30">
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
                          aria-hidden
                        >
                          {getUserInitials(row.name)}
                        </div>
                        <span className="font-medium text-foreground">
                          {row.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[14rem] truncate px-6 py-4 text-sm text-muted-foreground">
                      {row.email}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-mono text-sm text-muted-foreground">
                      {row.student_id ?? "—"}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                      {row.gender}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                        {row.user_type}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs whitespace-normal px-6 py-4 text-sm text-foreground">
                      {formatCourses(row)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-950/40"
                          title="Aprovar"
                          disabled={busy}
                          onClick={() => approveUser(row.user_id)}
                        >
                          {approvePending && approveUserId === row.user_id ? (
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
                          onClick={() => refuseUser(row.user_id)}
                        >
                          {refusePending && refuseUserId === row.user_id ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <XCircle className="size-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {data && (
          <div className="flex flex-col items-start justify-between gap-3 border-t border-border bg-muted/20 px-6 py-4 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              Mostrando {data.usersInAnalysis.length} de{" "}
              {data.countUsersInAnalysis} em análise
              {data.usersInAnalysis.length < data.countUsersInAnalysis
                ? " (amostra no painel)"
                : ""}
            </p>
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
