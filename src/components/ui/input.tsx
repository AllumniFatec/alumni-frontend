import * as React from "react";
import { useState, useId } from "react";

import { cn } from "@/lib/utils";
import { BaseLabel } from "@/components/BaseLabel";
import { Eye, EyeOff } from "lucide-react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useWorkplaces } from "@/hooks/useNetwork";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  label?: string;
  dataList?: boolean;
}

function Input({
  className,
  type,
  error,
  label,
  dataList,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const {
    data: workplacesData,
    isLoading: isLoadingWorkplaces,
    isError: isErrorWorkplaces,
  } = useWorkplaces();

  return (
    <div className="w-full">
      {label && <BaseLabel htmlFor={inputId}>{label}</BaseLabel>}
      {dataList ? (
        <Combobox
          items={workplacesData?.map((workplace) => workplace.company) ?? []}
        >
          <ComboboxInput
            placeholder="Selecione uma empresa"
            className="mt-4 rounded-lg border-0"
          />
          <ComboboxContent className=" bg-white rounded-lg border border-gray-200 shadow-lg">
            <ComboboxEmpty>Nenhum empresa encontrada</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      ) : (
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
            className,
          )}
          {...props}
        />
      )}
      <div className="h-4 mt-1">
        {error && <p className="text-red-500 text-xs leading-none">{error}</p>}
      </div>
    </div>
  );
}

export { Input };
