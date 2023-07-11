import { ordersColumns } from "@/components/Table/Columns/Orders/Columns";
import { OrdersTable } from "@/components/Table/OrdersTable";
import { FirebaseOrder } from "@/validators/orderSchema";

interface TableProps {
  orders: FirebaseOrder[];
}

export function Table({ orders }: TableProps) {
  return <OrdersTable columns={ordersColumns} data={orders} />;
}
