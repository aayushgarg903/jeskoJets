import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JESKO JETS | Transcend The Clouds",
  description: "Ultra-luxury private jet charters and bespoke aviation experiences across the globe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={syne.variable}>
      <body className={`${syne.className} antialiased selection:bg-[#1c1c1c] selection:text-white`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
