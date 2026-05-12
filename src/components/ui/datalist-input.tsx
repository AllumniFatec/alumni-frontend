import { useState, useId } from "react";

import { cn } from "@/lib/utils";
import { BaseLabel } from "@/components/BaseLabel";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type InputDatalist = { id: string | number; name: string };

interface DatalistInputProps {
  value: string;
  onChange: (value: string) => void;
  datalist?: InputDatalist[];
  error?: string;
  label?: string;
  tooltip?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  autoComplete?: string;
}

function DatalistInput({
  value,
  onChange,
  datalist,
  error,
  label,
  tooltip,
  description,
  placeholder,
  required = false,
  disabled = false,
  id,
  className,
  autoComplete = "off",
}: DatalistInputProps) {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const [isOpen, setIsOpen] = useState(false);

  const q = (value ?? "").trim().toLowerCase();
  const filtered = q
    ? (datalist ?? []).filter((o) => o.name.toLowerCase().includes(q))
    : (datalist ?? []);

  return (
    <div className="w-full">
      {label && (
        <BaseLabel htmlFor={inputId} className="flex items-center gap-1">
          <span>{label}</span>
          {required && (
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
          required={required}
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={cn(
            "w-full h-10 px-3 py-2 border-0 rounded-lg text-sm text-foreground",
            "placeholder:text-xs placeholder:text-muted-foreground/60",
            "bg-muted",
            "focus:outline-none focus:ring-2",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors",
            error
              ? "focus:ring-red-500 bg-red-50 border border-red-500"
              : "focus:ring-primary",
            className,
          )}
        />
        {isOpen && filtered.length > 0 && (
          <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border bg-white dark:bg-zinc-900 shadow-lg">
            {filtered.map((item) => (
              <li
                key={item.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(item.name);
                  setIsOpen(false);
                }}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                {item.name}
              </li>
            ))}
          </ul>
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

export { DatalistInput };
