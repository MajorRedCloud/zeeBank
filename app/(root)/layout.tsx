import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions";
import { cn } from "@/lib/utils"
import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // demo data
  const loggedInUser = await getLoggedInUser()

  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedInUser}/>

        <div className="flex flex-col size-full">
          <div className="root-layout">
            <Image 
              src={"/icons/logo.svg"}
              width={32}
              height={32}
              alt="logo"
            />
            <div>
              <MobileNav user={loggedInUser}/>
            </div>
          </div>
        {children}
        </div>
    </main>
  );
}
