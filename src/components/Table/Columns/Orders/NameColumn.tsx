import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";

export const nameColumn: ColumnDef<FirebaseOrder> = {
  id: "name",
  header: "Navn",
  accessorKey: "name",
  accessorFn: (order) =>
    `${order.contactInfo.firstName} ${order.contactInfo.lastName}`,
  cell: (info) => info.getValue(),
};
