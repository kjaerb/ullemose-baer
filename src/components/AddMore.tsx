import { cn } from "@/lib/cn";
import { Plus } from "./svg/Plus";

interface AddMoreProps extends React.ComponentProps<"button"> {}

export function AddMore({ ...props }: AddMoreProps) {
  return (
    <button
      {...props}
      className={cn("flex justify-center items-center", props.className)}>
      <Plus />
      <p className='text-green-500'>Tilføj bestilling</p>
    </button>
  );
}
