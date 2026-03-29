"use client";

import { useAuth } from "@/context/AuthContext";

/** Dono do conteúdo ou administrador — editar/excluir posts (e outros conteúdos) com a mesma regra. */
export function useCanManageContent(authorId: string) {
  const { user } = useAuth();
  const canManageContent = Boolean(
    user && (user.id === authorId || user.admin),
  );
  return { canManageContent };
}
