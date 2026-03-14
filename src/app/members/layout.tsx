"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { AuthStorage } from "@/store/auth";
import { isDevelopment } from "@/config/env";
import { AuthRoutes } from "@/config/routes";

export default function MembersGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!AuthStorage.getToken() && !isDevelopment) {
      router.replace(AuthRoutes.SignIn);
    }
  }, [router]);

  return (
    <>
      <Header />
      <div className="flex justify-center w-full">
        <div className="max-w-5xl w-full px-4 py-6">{children}</div>
      </div>
    </>
  );
}
