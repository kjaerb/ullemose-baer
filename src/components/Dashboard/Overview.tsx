"use client";

import { FirebaseOrder } from "@/validators/orderSchema";
import { StatCard } from "./StatCard";
import { OrdersBarChart } from "./OrdersBarChart";
import { OrdersCardContainer } from "./OrdersCardContainer";

interface OverviewProps {
  orders: FirebaseOrder[];
}

export function Overview({ orders }: OverviewProps) {
  const totalOrders = orders.flatMap((order) => order.fruitOrder);
  const totalKilos = totalOrders.reduce((a, b) => a + b.kg, 0);
  const ordersToday = orders.filter((order) => {
    if (!order.createdAt) return false;
    const date = new Date(order.createdAt.seconds * 1000);
    const today = new Date();

    return date.getDate() === today.getDate();
  });
  const ordersYesterday = orders.filter((order) => {
    if (!order.createdAt) return false;
    const date = new Date(order.createdAt.seconds * 1000);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return date.getDate() === yesterday.getDate();
  });

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Bestillinger" description="Det totale antal af ordre">
          {orders.length}
        </StatCard>
        <StatCard
          title="Indtægt"
          description="Total indtægt fra alle bestillinger"
        >
          {totalKilos * 20} kr
        </StatCard>
        <StatCard title="Kilo" description="Hvor mange kg bær der er bestilt">
          <span className="flex flex-col">
            {totalKilos} kg
            <span className="text-sm text-gray-600 flex flex-col">
              <span>
                {totalOrders
                  .filter((order) => order.name === "Ribs")
                  .reduce((a, b) => a + b.kg, 0)}{" "}
                kg Ribs
              </span>
              <span>
                {totalOrders
                  .filter((order) => order.name === "Solbær")
                  .reduce((a, b) => a + b.kg, 0)}{" "}
                kg Solbær
              </span>
            </span>
          </span>
        </StatCard>
        <StatCard
          title="Bestillinger i dag"
          description="Antal bestillinger der har været i dag"
        >
          <span className="flex flex-col">
            {ordersToday.length > 0 && "+"}
            {ordersToday.length}
            <span className="text-base">
              {ordersYesterday.length > 0 ? (
                ordersToday.length - ordersYesterday.length > 0 ? (
                  <span className="text-green-500">
                    +{ordersToday.length - ordersYesterday.length} fra igår
                  </span>
                ) : (
                  <span className="text-red-500">
                    {ordersToday.length - ordersYesterday.length} fra igår
                  </span>
                )
              ) : (
                <span className="text-green-500">
                  +{ordersToday.length} fra igår
                </span>
              )}
            </span>
          </span>
        </StatCard>
      </div>
      <div className="flex flex-col md:flex-row my-8">
        <div className="flex-1 h-full">
          <OrdersBarChart orders={orders} />
        </div>
        <div className="pl-0 mt-4 sm:mt-0 sm:pl-4 flex-initial">
          <OrdersCardContainer orders={orders} />
        </div>
      </div>
    </div>
  );
}
