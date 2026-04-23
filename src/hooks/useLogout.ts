"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthApi } from "@/apis/auth";
import { AuthRoutes } from "@/config/routes";
// import { useAuth } from "@/context/AuthContext"; // removido por enquanto, token é enviado no cookie httpOnly

export function useLogout() {
  const router = useRouter();
  // const { clearUser } = useAuth(); // removido por enquanto, token é enviado no cookie httpOnly

  return useMutation({
    mutationFn: () => AuthApi.logout(),
    onSuccess: () => {
      // clearUser(); // removido por enquanto, token é enviado no cookie httpOnly
      router.replace(AuthRoutes.SignIn);
    },
    onError: () => {
      // Even if API logout fails, clear client auth state.
      // clearUser(); // removido por enquanto, token é enviado no cookie httpOnly
      router.replace(AuthRoutes.SignIn);
    },
  });
}
