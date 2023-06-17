import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface PlusProps extends ComponentProps<"svg"> {}

export function Plus({ className, ...props }: PlusProps) {
  return (
    <svg
      {...props}
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={cn(
        "text-green-400 hover:text-green-500 transition-colors duration-200",
        className
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );
}
