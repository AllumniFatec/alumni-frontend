import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-transparent items-center justify-center h-screen sm:bg-background ">
      <div>
        {/* Logo FATEC */}
        <div className="w-full border border-fuchsia-900">
          <img src="/basic-name-logo.png" alt="FATEC Sorocaba" />
        </div>

        <div className="items-center justify-between h-full">{children}</div>
      </div>
    </div>
  );
}
