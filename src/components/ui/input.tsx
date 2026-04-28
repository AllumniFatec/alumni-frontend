import * as React from "react";
import { useState, useId } from "react";

import { cn } from "@/lib/utils";
import { BaseLabel } from "@/components/BaseLabel";
import { Eye, EyeOff, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  label?: string;
  tooltip?: string;
  description?: string;
}

function Input({
  className,
  type,
  error,
  label,
  tooltip,
  description,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && (
        <BaseLabel
          htmlFor={inputId}
          className="flex items-center gap-1"
        >
          <span>{label}</span>
          {props.required && (
            <span className="text-destructive" aria-hidden="true">
              *
            </span>
          )}
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="Mais informações"
                  className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          )}
        </BaseLabel>
      )}
      <div className="relative">
        <input
          required={props.required ?? false}
          id={inputId}
          type={inputType}
          className={cn(
            "w-full h-10 px-3 py-2 border-0 rounded-lg text-sm text-foreground",
            "placeholder:text-xs placeholder:text-muted-foreground/60",
            // AQUI ESTAVA O ERRO: mudamos de "bg-primary-foreground sm:bg-muted" para apenas "bg-muted"
            "bg-muted",
            "focus:outline-none focus:ring-2",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors",
            error
              ? "focus:ring-red-500 bg-red-50 border border-red-500"
              : "focus:ring-primary",
            isPassword && "pr-10",
            className,
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
      {description && (
        <p className="mt-1 text-xs text-muted-foreground leading-snug">
          {description}
        </p>
      )}
      <div className="mt-1 min-h-4">
        {error && (
          <p className="text-red-500 text-xs leading-snug break-words">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export { Input };
