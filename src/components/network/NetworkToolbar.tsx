"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NetworkToolbarProps = {
  searchInput: string;
  onSearchChange: (value: string) => void;
  isSearchMode: boolean;
  onClear: () => void;
};

export function NetworkToolbar({
  searchInput,
  onSearchChange,
  isSearchMode,
  onClear,
}: NetworkToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
        <input
          type="search"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nome, curso, empresa ou habilidades…"
          className={cn(
            "w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
          )}
          aria-label="Buscar na rede"
        />
      </div>
      {isSearchMode && (
        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          Limpar busca
        </Button>
      )}
    </div>
  );
}
