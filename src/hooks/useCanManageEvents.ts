"use client";

import { useAuth } from "@/context/AuthContext";

const BLOCKED_USER_TYPES = new Set(["Student", "Alumni"]);

/** Espelha eventService (backend): criar/editar/excluir/encerrar eventos só para quem não é aluno nem ex-aluno. */
export function useCanManageEvents() {
  const { user } = useAuth();

  const canManageEvents = Boolean(
    user?.user_type && !BLOCKED_USER_TYPES.has(user.user_type),
  );

  return { canManageEvents };
}
