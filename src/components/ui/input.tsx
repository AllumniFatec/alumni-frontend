import * as React from "react";
import { useState, useId, useRef, useMemo, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils";
import { BaseLabel } from "@/components/BaseLabel";
import { Eye, EyeOff, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type InputOption = { id: string | number; name: string };

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  label?: string;
  tooltip?: string;
  description?: string;
  options?: InputOption[];
}

function Input({
  className,
  type,
  error,
  label,
  tooltip,
  description,
  options,
  id,
  ref: externalRef,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const listboxId = `${inputId}-listbox`;

  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState(
    () => (props.value as string) ?? (props.defaultValue as string) ?? "",
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const mergedRef = useCallback(
    (node: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof externalRef === "function") externalRef(node);
      else if (externalRef) (externalRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
    },
    [externalRef],
  );

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const hasOptions = Array.isArray(options) && options.length > 0 && !isPassword;

  useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(String(props.value));
    }
  }, [props.value]);

  const filteredOptions = useMemo(() => {
    if (!hasOptions || !internalValue) return [];
    const query = internalValue.toLowerCase();
    const matches = options!.filter((opt) =>
      opt.name.toLowerCase().includes(query),
    );
    if (matches.length === 1 && matches[0].name.toLowerCase() === query) {
      return [];
    }
    return matches;
  }, [hasOptions, options, internalValue]);

  const commitSelection = useCallback((name: string) => {
    const el = inputRef.current;
    if (!el) return;
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;
    setter?.call(el, name);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    setInternalValue(name);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  useEffect(() => {
    if (!hasOptions) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [hasOptions]);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (hasOptions && internalValue.length > 0) setIsOpen(true);
      onFocus?.(e);
    },
    [hasOptions, internalValue, onFocus],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInternalValue(val);
      if (hasOptions) {
        setIsOpen(val.length > 0);
        setHighlightedIndex(-1);
      }
      onChange?.(e);
    },
    [hasOptions, onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (hasOptions && isOpen && filteredOptions.length > 0) {
        switch (e.key) {
          case "ArrowDown": {
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0,
            );
            return;
          }
          case "ArrowUp": {
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1,
            );
            return;
          }
          case "Enter": {
            if (highlightedIndex >= 0) {
              e.preventDefault();
              commitSelection(filteredOptions[highlightedIndex].name);
            }
            return;
          }
          case "Escape": {
            e.preventDefault();
            setIsOpen(false);
            setHighlightedIndex(-1);
            return;
          }
        }
      }
      onKeyDown?.(e);
    },
    [hasOptions, isOpen, filteredOptions, highlightedIndex, commitSelection, onKeyDown],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    },
    [onBlur],
  );

  const activeDescendant =
    hasOptions && highlightedIndex >= 0
      ? `${listboxId}-option-${filteredOptions[highlightedIndex]?.id}`
      : undefined;

  return (
    <div className="w-full" ref={wrapperRef}>
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
          {...props}
          ref={mergedRef}
          required={props.required ?? false}
          id={inputId}
          type={inputType}
          autoComplete={hasOptions ? "off" : undefined}
          {...(hasOptions && {
            role: "combobox",
            "aria-autocomplete": "list" as const,
            "aria-expanded": isOpen && filteredOptions.length > 0,
            "aria-controls": listboxId,
            "aria-activedescendant": activeDescendant,
          })}
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
            isPassword && "pr-10",
            className,
          )}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
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
        {hasOptions && isOpen && filteredOptions.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            className={cn(
              "absolute left-0 right-0 top-full mt-1 z-50",
              "max-h-56 overflow-auto rounded-lg border bg-white dark:bg-slate-900 shadow-md",
              "py-1 text-sm",
            )}
          >
            {filteredOptions.map((opt, idx) => (
              <li
                key={opt.id}
                id={`${listboxId}-option-${opt.id}`}
                role="option"
                aria-selected={idx === highlightedIndex}
                onMouseDown={(e) => {
                  e.preventDefault();
                  commitSelection(opt.name);
                }}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={cn(
                  "px-3 py-2 cursor-pointer transition-colors",
                  idx === highlightedIndex
                    ? "bg-muted text-foreground"
                    : "text-foreground/80 hover:bg-muted/50",
                )}
              >
                {opt.name}
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

export { Input };
export type { InputOption };
