import { Header } from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <main className="mx-auto max-w-3xl shadow-lg border rounded-md min-h-screen px-6">
      <Header />
      {children}
    </main>
  );
}
