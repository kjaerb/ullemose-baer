import { cn } from "@/lib/cn";

interface ButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "px-4 py-2 border  rounded-md font-bold bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white mx-auto m-4",
        props.className
      )}>
      {children}
    </button>
  );
}
