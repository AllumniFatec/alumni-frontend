import React from "react";
import { Header } from "@/components/Header";

export default function MembersGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex justify-center w-full">
        <div className="max-w-5xl w-full px-4 py-6">{children}</div>
      </div>
    </>
  );
}
