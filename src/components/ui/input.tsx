import * as React from "react";

import { cn } from "@/lib/utils";
import { BaseLabel } from "@/components/BaseLabel";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  label?: string;
}

function Input({ className, type, error, label, id, ...props }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && <BaseLabel htmlFor={inputId}>{label}</BaseLabel>}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
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
            isPassword && "pr-10",
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      <div className="h-4 mt-1">
        {error && <p className="text-red-500 text-xs leading-none">{error}</p>}
      </div>
    </div>
  );
}

export { Input };
