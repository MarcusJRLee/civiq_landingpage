import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        {/* Meta Pixel */}
        <MetaPixel />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1913736206159828&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
