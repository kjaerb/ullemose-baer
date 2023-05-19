import clsx from "clsx";
import { Fruit } from "@/validators/fruitSchema";
import { ComponentProps } from "react";

type FruitName = Fruit["name"];

interface FruitSelectorProps extends ComponentProps<"div"> {
  order: Fruit;
  handleSelectChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => void;
  index: number;
}

export function FruitSelector({
  order,
  handleSelectChange,
  index,
  ...props
}: FruitSelectorProps) {
  const kgRange = Array.from({ length: 7 }, (_, i) => i * 5).filter(
    (i) => i !== 0
  );

  const fruitNames: FruitName[] = ["-", "Solbær", "Ribs"];

  return (
    <div {...props} className={clsx(["grid grid-cols-2", props.className])}>
      <select
        className='fruit-selector'
        name='name'
        value={order.name}
        onChange={(e) => handleSelectChange(e, index)}>
        {fruitNames.map((fruit) => (
          <option key={fruit}>{fruit}</option>
        ))}
      </select>

      <select
        className='fruit-selector'
        name='kg'
        value={order.kg}
        onChange={(e) => handleSelectChange(e, index)}>
        {kgRange.map((kg) => (
          <option key={kg}>{kg}</option>
        ))}
      </select>
    </div>
  );
}
