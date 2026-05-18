"use client";

import { usePathname } from "next/navigation";
import { MembersRoutes } from "@/config/routes";
import Footer from "@/components/Footer";

export function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname.startsWith(MembersRoutes.Messages)) {
    return null;
  }

  return <Footer />;
}
