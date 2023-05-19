import clsx from "clsx";

interface ButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx([
        "px-4 py-2 border border-gray-400 rounded-md font-bold bg-green-500 text-white mx-auto m-4",
        props.className,
      ])}>
      {children}
    </button>
  );
}
