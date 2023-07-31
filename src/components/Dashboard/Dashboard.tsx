"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Overview } from "./Overview";
import { SendEmail } from "./SendEmail";
import { Separator } from "../ui/Separator";
import { useGetOrders } from "@/hooks/useOrders";

interface DashboardProps {}

export function Dashboard({}: DashboardProps) {
  const orders = useGetOrders();

  return (
    <Tabs defaultValue="overview" className="px-4 sm:px-10">
      <TabsList className="mb-4 w-full grid grid-cols-2 sm:w-fit">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="emails">Emails</TabsTrigger>
      </TabsList>
      <Separator />
      <TabsContent value="overview">
        <Overview orders={orders} />
      </TabsContent>
      <TabsContent value="emails">
        <SendEmail orders={orders} />
      </TabsContent>
    </Tabs>
  );
}
