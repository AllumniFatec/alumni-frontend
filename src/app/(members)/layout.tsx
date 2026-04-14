import React from "react";
import { MembersLayoutShell } from "@/components/MembersLayoutShell";

export default function MembersGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MembersLayoutShell>{children}</MembersLayoutShell>;
}
