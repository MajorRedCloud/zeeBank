import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils"
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // demo data
  const loggedIn = {firstname: 'John', lastname: 'Doe'}

  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedIn}/>

        <div className="flex flex-col size-full">
          <div className="root-layout">
            <Image 
              src={"/icons/logo.svg"}
              width={32}
              height={32}
              alt="logo"
            />
            <div>
              <MobileNav user={loggedIn}/>
            </div>
          </div>
        {children}
        </div>
    </main>
  );
}
