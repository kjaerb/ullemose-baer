import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";

export const fruitOrderColumn: ColumnDef<FirebaseOrder> = {
  accessorKey: "fruitOrder",
  header: "Bestilling",
  cell: ({ row }) => {
    const original = row.original;
    const order = original.fruitOrder;

    return (
      <div>
        {order.map((fruit, i) => {
          return (
            <p key={fruit.name + i}>
              {fruit.name}: {fruit.kg} kg
            </p>
          );
        })}
      </div>
    );
  },
};
