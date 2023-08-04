"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";

import type { Path, FieldValues } from "react-hook-form";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: ReactNode;
  isLoading?: boolean;
} & ComponentPropsWithoutRef<"input">;

export function FormInput<T extends FieldValues>({
  name,
  label,
  isLoading = false,
  ...props
}: FormInputProps<T>) {
  const { control, formState } = useFormContext<T>();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="py-2">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...props}
              {...field}
              disabled={
                isLoading || formState.isLoading || formState.isSubmitting
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
