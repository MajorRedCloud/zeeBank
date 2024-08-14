import { cn } from "@/lib/utils"
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
        {children}
        <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-sky-1 max-lg:hidden">
            <Image 
              src={'/icons/auth-image.svg'}
              alt="Auth Image"
              width={400}
              height={400}
            />
        </div>
    </main>
  );
}
