import { fruitNameArray } from "@/validators/fruitSchema";
import { ComponentPropsWithRef } from "react";
import { Trashcan } from "./svg/Trashcan";
import { cn } from "@/lib/cn";
import { FieldError, UseFormRegister } from "react-hook-form";
import { Order } from "@/validators/orderSchema";

const kgRange = Array.from({ length: 7 }, (_, i) => i * 5).filter(
  (i) => i !== 0
);

interface FruitSelectorProps extends ComponentPropsWithRef<"select"> {
  register: UseFormRegister<Order>;
  handleDelete: () => void;
  canDeleteOrder: boolean;
  number: number;
  errors?: {
    error1?: FieldError;
    error2?: FieldError;
  };
}

export function FruitSelector({
  handleDelete,
  canDeleteOrder,
  number,
  register,
  errors,
  ...props
}: FruitSelectorProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2", props.className)}>
      <div className='flex flex-col'>
        <select
          className='fruit-selector flex-1'
          {...register(`fruitOrder.${number}.name`)}>
          {fruitNameArray.map((fruit, i) => (
            <option key={i}>{fruit}</option>
          ))}
        </select>
        {errors?.error1?.message && (
          <span className='error-message'>{errors.error1.message}</span>
        )}
      </div>
      <div className='flex items-center'>
        <div className='flex flex-col w-full'>
          <select
            className='fruit-selector flex-1'
            {...register(`fruitOrder.${number}.kg`, { valueAsNumber: true })}>
            {kgRange.map((kg, i) => (
              <option key={i}>{kg}</option>
            ))}
          </select>
          {errors?.error2?.message && (
            <span className='error-message'>{errors.error2.message}</span>
          )}
        </div>
        <Trashcan
          onClick={handleDelete}
          className='mr-4'
          disabled={canDeleteOrder}
        />
      </div>
    </div>
  );
}
