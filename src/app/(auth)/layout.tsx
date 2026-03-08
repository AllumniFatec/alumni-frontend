import React from "react";
import Image from "next/image";
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
        <Image
          src="/basic-name-logo.png"
          alt="FATEC Sorocaba"
          width={240}
          height={80}
          priority
          className="h-16 md:h-20"
          style={{ width: "auto" }}
        />
      </div>

      {/* Container do formulário */}
      <div className="w-full px-4 sm:max-w-3xl sm:mx-auto">{children}</div>
    </BaseContainerLayout>
  );
}
