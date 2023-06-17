import { cn } from "@/lib/utils";
import { ComponentPropsWithRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ComponentPropsWithRef<"input"> {
  label?: string;
  error?: FieldError;
}

const Input = forwardRef<HTMLDivElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col mx-4 my-2" ref={ref}>
        {label && <label className="mb-2">{label}</label>}
        <input
          {...props}
          className={cn(
            "px-4 py-2 border border-gray-300 shadow-md rounded-lg",
            className,
            error?.message && "border-red-500 border rounded-none rounded-t-lg"
          )}
        />
        {error?.message && (
          <span className="error-message">{error.message}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
