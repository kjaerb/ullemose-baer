"use client";

import { FirebaseOrder } from "@/validators/orderSchema";
import { KPICard } from "./KPICard";
import { Table } from "./Table";
import { useMemo } from "react";
import { Separator } from "../ui/Separator";
import { getLastNDays, getYYMMDD } from "@/lib/date";
import React from "react";
import useOrderStore from "@/store/orderStore";

interface OverviewProps {
  orders: FirebaseOrder[];
}

export function Overview({ orders }: OverviewProps) {
  const { period } = useOrderStore();

  const totalOrders = orders.flatMap((order) => order.fruitOrder);
  const totalKilos = totalOrders.reduce((a, b) => a + b.kg, 0);

  const ordersThisWeek = useMemo(() => {
    const lastNDays = getLastNDays(period);

    const ordersStart: {
      name: string;
      Bestillinger: number;
      Indtægt: number;
      "Kilo Ribs": number;
      "Kilo Solbær": number;
    }[] = lastNDays.map((day) => {
      const ordersOnDay = orders.filter(
        // @ts-ignore
        (order) => getYYMMDD(order.createdAt.toDate()) === getYYMMDD(day)
      );

      return {
        name: day.toLocaleDateString(),
        Bestillinger: ordersOnDay.length,
        Indtægt: ordersOnDay.reduce((total, order) => {
          const kgSum = order.fruitOrder.reduce(
            (sum, fruit) => sum + fruit.kg * 30,
            0
          );
          return total + kgSum;
        }, 0),
        "Kilo Ribs": ordersOnDay.reduce((totalKg, order) => {
          const ribsKg = order.fruitOrder
            .filter((fruit) => fruit.name === "Ribs")
            .reduce((total, fruit) => total + fruit.kg, 0);
          return totalKg + ribsKg;
        }, 0),
        "Kilo Solbær": ordersOnDay.reduce((totalKg, order) => {
          const ribsKg = order.fruitOrder
            .filter((fruit) => fruit.name === "Solbær")
            .reduce((total, fruit) => total + fruit.kg, 0);
          return totalKg + ribsKg;
        }, 0),
      };
    });

    return ordersStart;
  }, [orders]);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          title="Bestillinger"
          description="Det totale antal af ordre"
          barChart="true"
          categories={["Bestillinger"]}
          data={ordersThisWeek}
          index="name"
          barChartProps={{
            className: "h-36",
          }}
        >
          {orders.length}
        </KPICard>
        <KPICard
          title="Indtægt"
          description="Total indtægt fra alle bestillinger"
          barChart="true"
          categories={["Indtægt"]}
          data={ordersThisWeek}
          index="name"
          barChartProps={{
            className: "h-36",
          }}
        >
          {totalKilos * 30} kr
        </KPICard>
        <KPICard
          title="Kilo"
          description="Hvor mange kg bær der er bestilt"
          barChart="true"
          categories={["Kilo Ribs", "Kilo Solbær"]}
          data={ordersThisWeek}
          index="name"
          barChartProps={{
            className: "h-36",
          }}
        >
          <span className="flex space-x-4">
            <span>{totalKilos} kg</span>
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
        </KPICard>
      </div>
      <Separator className="my-4" />
      <Table orders={orders} />
    </div>
  );
}

export const MemoizedOverview = React.memo(Overview);
