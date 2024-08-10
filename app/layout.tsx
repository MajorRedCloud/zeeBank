import type { Metadata } from "next";
import { Inter as FontSans} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "zeeBank",
  description: "A Banking System for all your payments.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        {children}
      </body>
    </html>
  );
}
