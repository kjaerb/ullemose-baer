import { ScrollArea } from "@/components/ui/ScrollArea";
import { FirebaseOrder } from "@/validators/orderSchema";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
import { OrdersCard } from "./OrdersCard";

interface OrdersCardContainerProps {
  orders: FirebaseOrder[];
}

export function OrdersCardContainer({ orders }: OrdersCardContainerProps) {
  return (
    <ScrollArea className="shadow-md border rounded-md min-w-[20rem] h-[24rem]">
      <Card>
        <CardHeader>
          <CardTitle>Bestillinger</CardTitle>
          <CardDescription>{orders.length} bestillinger i alt</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.map((order) => {
            return <OrdersCard order={order} key={order.orderId} />;
          })}
          {orders.map((order) => {
            return <OrdersCard order={order} key={order.orderId} />;
          })}
          {orders.map((order) => {
            return <OrdersCard order={order} key={order.orderId} />;
          })}
          {orders.map((order) => {
            return <OrdersCard order={order} key={order.orderId} />;
          })}
          {orders.map((order) => {
            return <OrdersCard order={order} key={order.orderId} />;
          })}
          {orders.map((order) => {
            return <OrdersCard order={order} key={order.orderId} />;
          })}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
