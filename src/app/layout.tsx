import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CivIQ - Modernizing Democracy",
  description: "Sign up to join the movement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
