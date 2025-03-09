// src/app/layout.tsx
import './globals.css';
import Navbar from '@/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-background text-foreground">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}