import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The First Six Months | North and Nimble",
  description: "A reflective check-in for leaders in their first six months.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
