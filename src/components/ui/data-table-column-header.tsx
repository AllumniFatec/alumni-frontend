"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          "text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground",
          className,
        )}
      >
        {title}
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn(
        "-ml-2 h-8 px-2 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground",
        className,
      )}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      {column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-1 size-3.5 shrink-0" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-1 size-3.5 shrink-0" />
      ) : (
        <ChevronsUpDown className="ml-1 size-3.5 shrink-0 opacity-50" />
      )}
    </Button>
  );
}
