import clsx from "clsx";

interface AddMoreProps extends React.ComponentProps<"button"> {}

export function AddMore({ ...props }: AddMoreProps) {
  return (
    <button
      {...props}
      className={clsx([
        "rounded-md shadow-md border px-4 py-2 mx-4",
        props.className,
      ])}>
      Tilføj ordre
    </button>
  );
}
