import { FirebaseOrder } from "@/validators/orderSchema";
import { ColumnDef } from "@tanstack/react-table";

export const orderIdColumn: ColumnDef<FirebaseOrder> = {
  accessorKey: "orderId",
  header: "Ordre nummer",
};
