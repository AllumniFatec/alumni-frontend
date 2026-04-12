"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useAdminUsers } from "@/hooks/useAdmin";
import type { PublicUserListItem } from "@/models/userPublic";
import type { ProfilePhoto } from "@/models/profile";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminUsers();

  const users =
    data?.pages.flatMap((page) => page.users) ?? [];

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
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="px-4 py-3 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                Utilizador
              </TableHead>
              <TableHead className="px-4 py-3 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                Tipo
              </TableHead>
              <TableHead className="min-w-[14rem] px-4 py-3 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
                Cursos
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="px-4 py-12 text-center">
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
                  colSpan={3}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  Nenhum utilizador encontrado.
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              users.map((user) => {
                const src = profilePhotoSrc(user.perfil_photo);
                return (
                  <TableRow key={user.user_id} className="hover:bg-muted/30">
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                          {src ? (
                            <Image
                              src={src}
                              alt={user.name}
                              width={40}
                              height={40}
                              className="size-full object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center text-xs font-bold text-muted-foreground">
                              {user.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-foreground">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="inline-flex rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary">
                        {user.user_type}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-normal px-4 py-3 text-sm text-foreground">
                      {formatCourses(user)}
                    </TableCell>
                  </TableRow>
                );
              })}
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
    </div>
  );
}
