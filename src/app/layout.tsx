import type { Metadata } from "next";
import "./globals.css";
import { MetaPixel } from "@/components/meta_pixel";

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
      <body className="antialiased">
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
