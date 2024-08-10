import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "zeeBank",
  description: "A Banking System for all your payments.",
  icons:{
    icon: "/icons/logo.svg"
  }
};

const inter = Inter({subsets: ["latin"], variable: "--font-inter"});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={cn(
          "",
          `${inter.variable} ${ibmPlexSerif.variable}`
        )}>
        {children}
      </body>
    </html>
  );
}
