import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Board",
  description: "Job Board",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
