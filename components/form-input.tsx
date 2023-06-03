'use client'

import { useFormContext } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";

import type { Path, FieldValues } from "react-hook-form";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>
  label?: ReactNode
} & ComponentPropsWithoutRef<'input'>

export function FormInput<T extends FieldValues>({ name, label, ...props }: FormInputProps<T>) {
  const { control } = useFormContext<T>()
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="py-2">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
