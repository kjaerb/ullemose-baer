import { Plus } from "./svg/Plus";

interface AddMoreProps extends React.ComponentProps<"button"> {}

export function AddMore({ ...props }: AddMoreProps) {
  return (
    <button {...props}>
      <Plus />
    </button>
  );
}
