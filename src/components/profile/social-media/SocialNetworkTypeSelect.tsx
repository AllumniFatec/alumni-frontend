"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { SocialMediaType } from "@/models/users";
import { getSocialMediaUi } from "@/hooks/socialMedia";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SocialNetworkTypeSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  id?: string;
}

export function SocialNetworkTypeSelect<T extends FieldValues>({
  control,
  name,
  id,
}: SocialNetworkTypeSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger id={id} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-[min(50vh,280px)]">
            {Object.values(SocialMediaType).map((t) => (
              <SelectItem key={t} value={t}>
                {getSocialMediaUi(t).label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
