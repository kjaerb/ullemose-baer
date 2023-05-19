import { fruitNameArray } from "@/validators/fruitSchema";
import { ComponentPropsWithRef } from "react";
import { Trashcan } from "./svg/Trashcan";
import { cn } from "@/lib/cn";
import { UseFormRegister } from "react-hook-form";
import { Order } from "@/validators/orderSchema";

const kgRange = Array.from({ length: 7 }, (_, i) => i * 5).filter(
  (i) => i !== 0
);

interface FruitSelectorProps extends ComponentPropsWithRef<"select"> {
  register: UseFormRegister<Order>;
  handleDelete: () => void;
  canDeleteOrder: boolean;
  number: number;
}

export function FruitSelector({
  handleDelete,
  canDeleteOrder,
  number,
  register,
  ...props
}: FruitSelectorProps) {
  return (
    <div className={cn("grid grid-cols-2", props.className)}>
      <select
        className='fruit-selector flex-1'
        {...register(`fruitOrder.${number}.name`)}>
        {fruitNameArray.map((fruit, i) => (
          <option key={i}>{fruit}</option>
        ))}
      </select>
      <div className='flex items-center'>
        <select
          className='fruit-selector flex-1'
          {...register(`fruitOrder.${number}.kg`, { valueAsNumber: true })}>
          {kgRange.map((kg, i) => (
            <option key={i}>{kg}</option>
          ))}
        </select>
        <Trashcan
          onClick={handleDelete}
          className='mr-4'
          disabled={canDeleteOrder}
        />
      </div>
    </div>
  );
}
