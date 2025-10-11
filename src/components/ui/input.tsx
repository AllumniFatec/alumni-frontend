import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "w-full h-10 px-3 py-2 border-0 rounded-lg text-foreground placeholder-muted-foreground",
        "bg-primary-foreground sm:bg-muted",
        "focus:outline-none focus:ring-2 focus:ring-primary",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        "transition-colors",
        className
      )}
      {...props}
    />
  );
}

export { Input };
