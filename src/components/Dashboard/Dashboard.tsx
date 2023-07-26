"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table } from "./Table";
import { useEffect, useState } from "react";
import { FirebaseOrder } from "@/validators/orderSchema";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { Overview } from "./Overview";
import { SendEmail } from "./SendEmail";
import { Separator } from "../ui/Separator";
import { useCollection } from "react-firebase-hooks/firestore";

interface DashboardProps {}

export function Dashboard({}: DashboardProps) {
  const [orders, setOrders] = useState<FirebaseOrder[]>([]);

  const [ordersCollection, ordersLoading, ordersError] = useCollection(
    query(collection(firestore, "orders"), orderBy("createdAt", "desc"))
  );

  useEffect(() => {
    setOrders(() => {
      if (!ordersCollection) return [];

      return ordersCollection.docs.map((doc) => doc.data() as FirebaseOrder);
    });
  }, [ordersCollection, ordersLoading, ordersError]);

  return (
    <>
      <Tabs defaultValue="overview" className="px-4 sm:px-10">
        <TabsList className="mb-4 w-full grid grid-cols-3 sm:w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="overview">
          <Overview orders={orders} />
        </TabsContent>
        <TabsContent value="table">
          <Table orders={orders} />
        </TabsContent>
        <TabsContent value="emails">
          <SendEmail orders={orders} />
        </TabsContent>
      </Tabs>
    </>
  );
}
