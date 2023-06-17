import { cn } from "@/lib/utils";
import { Plus } from "./svg/Plus";

interface AddMoreProps extends React.ComponentProps<"div"> {}

export function AddMore({ ...props }: AddMoreProps) {
  return (
    <div
      {...props}
      className={cn("flex justify-center items-center", props.className)}
    >
      <Plus />
      <p className="text-green-500">Tilføj bestilling</p>
    </div>
  );
}
