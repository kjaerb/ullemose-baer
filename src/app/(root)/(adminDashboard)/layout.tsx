import { Nav } from "@/components/Dashboard/Nav";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboard({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <main className="mx-auto ">
      <Nav />
      {children}
    </main>
  );
}
