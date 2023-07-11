import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function StatCard({ title, description, children }: StatCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm min-h-[40px]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-3xl font-bold">{children}</CardContent>
    </Card>
  );
}
