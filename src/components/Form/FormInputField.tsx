import { FieldErrors, FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { cn, getPropertyByString } from "@/lib/utils";

interface FormInputFieldProps<TValue extends FieldValues> {
  form: UseFormReturn<TValue>;
  name: Path<TValue>;
  label: string;
  inputAutoComplete: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  inputPlaceholder: InputHTMLAttributes<HTMLInputElement>["placeholder"];
}

export function FormInputField<TValue extends FieldValues>({
  form,
  name,
  label,
  inputAutoComplete,
  inputPlaceholder,
}: FormInputFieldProps<TValue>) {
  const {
    formState: { errors },
  } = form;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="px-2">
          <FormLabel className="ml-2">{label}</FormLabel>
          <FormControl
            className={cn(
              getPropertyByString<FieldErrors<TValue>>(errors, name)?.message &&
                "rounded-br-none rounded-bl-none",
              "focus-visible:ring-none focus-visible:ring-0"
            )}
          >
            <Input
              autoComplete={inputAutoComplete}
              placeholder={inputPlaceholder}
              {...field}
            />
          </FormControl>
          <FormMessage
            className={cn(
              "border px-2 py-1 bg-red-100 border-red-300 !mt-0 rounded-md rounded-tl-none rounded-tr-none"
            )}
          />
        </FormItem>
      )}
    />
  );
}
