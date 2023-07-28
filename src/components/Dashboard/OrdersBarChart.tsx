"use client";

import { FirebaseOrder } from "@/validators/orderSchema";
import { Bar } from "react-chartjs-2";
import { registerables, Chart } from "chart.js/auto";
import { useMemo } from "react";
Chart.register(...registerables);

interface OrdersBarChartProps {
  orders: FirebaseOrder[];
}

export function OrdersBarChart({ orders }: OrdersBarChartProps) {
  function createDataset() {
    const currentDate = new Date();

    const last7Days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(currentDate.getDate() - index);
      return {
        date: date.toISOString().split("T")[0],
        orderCount: 0,
      };
    });

    orders.forEach((order) => {
      const createdAtDate = order.createdAt.toDate();
      const orderDate = createdAtDate.toISOString().split("T")[0];

      const dayObject = last7Days.find((day) => day.date === orderDate);

      if (dayObject) {
        dayObject.orderCount++;
      }
    });

    return {
      dataSet: last7Days.flatMap((day) => day.orderCount).reverse(),
      labels: Array.from(Array(7).keys())
        .map((day) => {
          const date = new Date();
          date.setDate(date.getDate() - day);

          return `${date.getDate()} / ${date.getMonth() + 1}`;
        })
        .reverse(),
    };
  }

  const { dataSet, labels } = useMemo(() => createDataset(), [orders]);

  const ordersData = {
    labels: labels,
    datasets: [
      {
        label: "Antal bestillinger",
        data: dataSet,
        backgroundColor: "rgb(34 197 94)",
        borderRadius: 10,
      },
    ],
  };

  return (
    <Bar
      className="border shadow-md rounded-md p-4 h-full"
      data={ordersData}
      options={{
        indexAxis: "x",

        plugins: {
          title: {
            display: true,
            text: "Antal bestillinger de sidste 7 dage",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 1,
            },
            suggestedMin: 0, // Set the minimum value for the y-axis
            suggestedMax: Math.max(...ordersData.datasets[0].data) * 1.2,
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
}
