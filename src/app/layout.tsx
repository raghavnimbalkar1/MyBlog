// src/app/layout.tsx
import '../globals.css';
import Navbar from '@/components/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />
        <main className="pt-20"> {/* Extra padding for the fixed Navbar */}
          {children}
        </main>
      </body>
    </html>
  );
}