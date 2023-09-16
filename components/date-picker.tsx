"use client";

import { format, type Locale } from "date-fns";
import { th, enUS } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";

import type { FieldValues, Path } from "react-hook-form";

type DatePickerLocaleProps = "th" | "en";

const LOCALE_MAP: Record<DatePickerLocaleProps, Locale> = {
  th,
  en: enUS,
};

export type DatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  locale: DatePickerLocaleProps;
  isLoading?: boolean;
};

export function DatePicker<T extends FieldValues>({
  name,
  label,
  locale = "th",
  isLoading = false,
}: DatePickerProps<T>) {
  const { control, formState } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="py-2">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  isLoading={
                    isLoading || formState.isLoading || formState.isSubmitting
                  }
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP", { locale: LOCALE_MAP[locale] })
                  ) : (
                    <span>เลือกวัน</span>
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
                locale={LOCALE_MAP[locale]}
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
