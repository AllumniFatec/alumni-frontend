"use client";

import { useAuth } from "@/context/AuthContext";

/** Dono do perfil ou administrador (alinhado a outras secções do perfil). */
export function useCanManageProfile(profileUserId: string) {
  const { user } = useAuth();
  return Boolean(
    user && (user.id === profileUserId),
  );
}
