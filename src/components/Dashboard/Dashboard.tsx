"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Overview } from "./Overview";
import { SendEmail } from "./SendEmail";
import { Separator } from "@/components/ui/Separator";
import { useGetOrders } from "@/hooks/useOrders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import useOrderStore, { periodOptions, years } from "@/store/orderStore";

interface DashboardProps {}

export function Dashboard({}: DashboardProps) {
  const { period, setPeriod, year, setYear } = useOrderStore();

  const orders = useGetOrders();

  return (
    <Tabs defaultValue="overview" className="px-4 sm:px-10">
      <TabsList className="mb-4 w-full grid grid-cols-2 sm:w-fit">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="emails">Emails</TabsTrigger>
      </TabsList>
      <div className="grid grid-cols-2 gap-4 mb-4 w-fit">
        <Select
          value={year.toString()}
          onValueChange={(e) => setYear(parseInt(e))}
        >
          <SelectTrigger>
            <SelectValue placeholder="År" defaultValue={year} />
          </SelectTrigger>
          <SelectContent>
            {years.map((option) => (
              <SelectItem value={option.toString()}>
                {option.toString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={period.toString()}
          onValueChange={(e) => setPeriod(parseInt(e))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Periode" defaultValue={period} />
          </SelectTrigger>
          <SelectContent>
            {periodOptions.map((option) => (
              <SelectItem value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
