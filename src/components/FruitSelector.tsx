import { fruitNameArray } from "@/validators/fruitSchema";
import { ComponentPropsWithRef } from "react";
import { Trashcan } from "./svg/Trashcan";
import { cn } from "@/lib/utils";
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
    <div
      className={cn(
        "relative grid grid-cols-1 sm:grid-cols-2 border sm:border-none rounded-md shadow-md sm:shadow-none mt-4 mb-4 py-2 sm:mt-0 sm:mb-0 sm:py-0",
        props.className
      )}
    >
      <div className="flex flex-col">
        <select
          className="fruit-selector flex-1"
          {...register(`fruitOrder.${number}.name`)}
        >
          {fruitNameArray.map((fruit, i) => (
            <option key={i}>{fruit}</option>
          ))}
        </select>
        {errors?.error1?.message && (
          <span className="error-message">{errors.error1.message}</span>
        )}
      </div>
      <div className="flex items-center">
        <div className="flex flex-col w-full">
          <select
            className="fruit-selector flex-1"
            {...register(`fruitOrder.${number}.kg`, { valueAsNumber: true })}
          >
            {kgRange.map((kg, i) => (
              <option key={i}>{kg}</option>
            ))}
          </select>
          {errors?.error2?.message && (
            <span className="error-message">{errors.error2.message}</span>
          )}
        </div>
        <Trashcan
          onClick={handleDelete}
          className={cn(
            "sm:mr-4 absolute sm:relative right-0 top-0 bg-white sm:bg-none border rounded-full w-10 h-10 p-2 translate-x-3 -translate-y-4 sm:border-none sm:p-0 sm:translate-x-0 sm:-translate-y-0 sm:w-6 sm:h-6",
            canDeleteOrder && "hidden sm:visible"
          )}
          disabled={canDeleteOrder}
        />
      </div>
    </div>
  );
}
