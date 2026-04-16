"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthApi } from "@/apis/auth";
import { AuthRoutes } from "@/config/routes";
import { useAuth } from "@/context/AuthContext";

export function useLogout() {
  const router = useRouter();
  const { clearUser } = useAuth();

  return useMutation({
    mutationFn: () => AuthApi.logout(),
    onSuccess: () => {
      clearUser();
      router.push(AuthRoutes.SignIn);
    },
    onError: () => {
      // Even if API logout fails, clear client auth state.
      clearUser();
      router.push(AuthRoutes.SignIn);
    },
  });
}
