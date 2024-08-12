"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section className="w-full items-center max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-slate-50">
          <Link
            href={"/"}
            className="cursor-pointer items-center flex flex-row gap-1 px-4"
          >
            <Image src={"/icons/logo.svg"} width={32} height={32} alt="logo" />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.label}>
                    <Link
                      href={item.route}
                      key={item.label}
                      className={cn(
                        "mobilenav-sheet_close w-full",
                        isActive ? "bg-bank-gradient" : ""
                      )}
                    >
                      
                        <Image
                          src={item.imgURL}
                          alt="icon"
                          width={20}
                          height={20}
                          className={cn(
                            isActive ? "brightness-[3] invert-0" : ""
                          )}
                        />
                    
                      <p
                        className={cn(
                          "text-16 font-semibold text-black-2",
                          isActive ? "!text-white" : ""
                        )}
                      >
                        {item.label}
                      </p>
                    </Link>
                    </SheetClose>
                  );
                })}

                User
              </nav>
            </SheetClose>
            footer
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
