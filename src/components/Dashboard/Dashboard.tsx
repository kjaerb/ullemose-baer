"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table } from "./Table";
import { useEffect, useState } from "react";
import { FirebaseOrder } from "@/validators/orderSchema";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { Overview } from "./Overview";

interface DashboardProps {}

export function Dashboard({}: DashboardProps) {
  const [orders, setOrders] = useState<FirebaseOrder[]>([]);

  useEffect(() => {
    const docRef = collection(firestore, "orders");
    const queryOrders = query(docRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(queryOrders, (snapshot) => {
      const ordersList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;

        return { id, ...data } as FirebaseOrder;
      });
      setOrders(() => {
        return ordersList;
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <Tabs defaultValue="overview" className="px-4 sm:px-10">
      <TabsList className="mb-4 w-full grid grid-cols-2 sm:w-fit">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="table">Table</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Overview orders={orders} />
      </TabsContent>
      <TabsContent value="table">
        <Table orders={orders} />
      </TabsContent>
    </Tabs>
  );
}
