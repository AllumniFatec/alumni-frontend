"use client";

import type { AuthUser } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";

/** Dono do conteúdo ou administrador — mesma regra que `useCanManageContent`. */
export function canUserManageContent(
  user: AuthUser | null | undefined,
  authorId: string,
) {
  return Boolean(user && (user.id === authorId || user.admin));
}

/** Dono do conteúdo ou administrador — editar/excluir posts (e outros conteúdos) com a mesma regra. */
export function useCanManageContent(authorId: string) {
  const { user } = useAuth();
  const canManageContent = canUserManageContent(user, authorId);
  return { canManageContent };
}
