import { FirebaseOrder, Order } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";

export const fruitOrderColumn: ColumnDef<FirebaseOrder> = {
  accessorKey: "fruitOrder",
  header: "Bestilling",
  cell: ({ row }) => {
    const order: Order["fruitOrder"] = row.getValue("fruitOrder");

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
