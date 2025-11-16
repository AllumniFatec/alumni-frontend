import * as React from "react";

import { cn } from "@/lib/utils";
import { BaseLabel } from "@/components/BaseLabel";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  label?: string;
}

function Input({ className, type, error, label, id, ...props }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && <BaseLabel htmlFor={inputId}>{label}</BaseLabel>}
      <input
        id={inputId}
        type={type}
        className={cn(
          "w-full h-10 px-3 py-2 border-0 rounded-lg text-sm text-foreground",
          "placeholder:text-xs placeholder:text-muted-foreground/60",
          "bg-primary-foreground sm:bg-muted",
          "focus:outline-none focus:ring-2",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors",
          error
            ? "focus:ring-red-500 bg-red-50 border border-red-500"
            : "focus:ring-primary",
          className
        )}
        {...props}
      />
      <div className="h-4 mt-1">
        {error && <p className="text-red-500 text-xs leading-none">{error}</p>}
      </div>
    </div>
  );
}

export { Input };
