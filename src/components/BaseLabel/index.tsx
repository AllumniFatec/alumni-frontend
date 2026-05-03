import React from "react";
import { cn } from "@/lib/utils";

interface BaseLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
  /** Asterisco vermelho de obrigatoriedade (após o texto do label). */
  required?: boolean;
  /** Texto "(opcional)" em tom muted (após o texto; ignorado se `required` for true). */
  optional?: boolean;
}

export const BaseLabel = ({
  children,
  className,
  required,
  optional,
  ...props
}: BaseLabelProps) => {
  const showOptional = optional && !required;

  return (
    <label
      className={cn(
        "mb-1.5 block text-sm font-medium text-foreground",
        (required || showOptional) && "flex flex-wrap items-center gap-x-1.5 gap-y-0.5",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-destructive" aria-hidden="true">
          *
        </span>
      )}
      {showOptional && (
        <span className="text-xs font-normal text-muted-foreground">
          (opcional)
        </span>
      )}
    </label>
  );
};
