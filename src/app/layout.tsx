import { Header } from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='dk'>
      <body>
        <main className='mx-auto max-w-3xl shadow-lg border rounded-md min-h-screen px-6'>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
