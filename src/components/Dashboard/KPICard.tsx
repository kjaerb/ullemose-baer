import { AreaChart, BarChartProps } from "@tremor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Loading } from "../Loading";
import useLoadingStore from "@/store/loadingStore";

type ExtractKeysFromArray<T> = T extends Array<infer Item> ? keyof Item : never;

export type InlineBarChartProps<TData extends any[]> = {
  barChart: "true";
  data: TData;
  index: keyof TData[0];
  categories: ExtractKeysFromArray<TData>[];
  barChartProps: Omit<BarChartProps, "data" | "index" | "categories">;
};

type KPICardProps<T extends any[]> = {
  title: string;
  description?: string;
  children?: React.ReactNode;
} & (
  | InlineBarChartProps<T>
  | {
      barChart: "false";
    }
);

export function KPICard<T extends any[]>(props: KPICardProps<T>) {
  const { ordersLoading } = useLoadingStore();

  const { title, description, children, barChart } = props;

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-0">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold">
        <div>
          {description && (
            <p className="text-sm text-gray-600 pb-2">{description}</p>
          )}
          {children}
          {barChart === "true" ? (
            !ordersLoading ? (
              <AreaChart
                className={cn("", props.barChartProps.className)}
                data={props.data}
                index={props.index as string}
                categories={props.categories}
                {...props.barChartProps}
              />
            ) : (
              <Loading />
            )
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
