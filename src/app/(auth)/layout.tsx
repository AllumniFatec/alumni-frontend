import React from "react";
import { BaseContainerLayout } from "../../components/BaseContainerLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseContainerLayout>
      {/* Logo Container */}
      <div className="w-full mb-8 flex justify-center pt-10">
        <img
          src="/basic-name-logo.png"
          alt="FATEC Sorocaba"
          className="h-16 md:h-20"
        />
      </div>

      {/* Container do formulário */}
      <div className="w-full px-4 sm:max-w-3xl sm:mx-auto">{children}</div>
    </BaseContainerLayout>
  );
}
