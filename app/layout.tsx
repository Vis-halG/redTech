import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RedTech | Practical Digital Systems",
  description:
    "RedTech builds dependable websites, apps, and automation systems for growing businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
