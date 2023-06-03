"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";

import type { FieldValues, Path } from 'react-hook-form'

export type DatePickerProps<T extends FieldValues> = {
  name: Path<T>
  label: string
};

export function DatePicker<T extends FieldValues>({ name, label }: DatePickerProps<T>) {
  const { control } = useFormContext<T>()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full py-2">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
