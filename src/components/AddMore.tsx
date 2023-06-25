import { cn } from "@/lib/utils";
import { Plus } from "./svg/Plus";
import {
  FieldArrayWithId,
  FieldValues,
  UseFieldArrayAppend,
} from "react-hook-form";
import { Fruit, fruitNameArray } from "@/validators/fruitSchema";
import { Order } from "@/validators/orderSchema";

interface AddMoreProps extends React.ComponentProps<"div"> {
  orders: FieldArrayWithId<Order>[];
  append: UseFieldArrayAppend<Order>;
}

export function AddMore({ orders, append, ...props }: AddMoreProps) {
  return (
    <div
      {...props}
      className={cn("flex justify-center items-center", props.className)}
      onClick={addOrder}
    >
      <Plus />
      <p className="text-green-500">Tilføj bestilling</p>
    </div>
  );

  function findFirstMissingName(orders: Fruit[]) {
    const existingNames = orders.map((order) => order.name);

    for (let name of fruitNameArray) {
      if (!existingNames.includes(name)) {
        return name;
      }
    }

    return null;
  }

  function addOrder() {
    const missingName = findFirstMissingName(orders);

    const obj = { name: missingName ? missingName : "Solbær", kg: 5 };

    append(obj);
  }
}
