import React from "react";
import { cn } from "@/lib/utils";

interface BaseLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

export const BaseLabel = ({
  children,
  className,
  ...props
}: BaseLabelProps) => {
  return (
    <label
      className={cn(
        "text-sm font-medium text-foreground mb-1.5 block",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};
