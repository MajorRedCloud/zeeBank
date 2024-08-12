"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href={"/"}
          className="mb-12 cursor-pointer items-center flex flex-row gap-2"
        >
          <Image
            src={"/icons/logo.svg"}
            width={32}
            height={32}
            alt="logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", isActive ? "bg-bank-gradient" : "")}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt="icon"
                  fill
                  className={cn(isActive ? "brightness-[3] invert-0" : "")}
                />
              </div>
              <p className={cn("sidebar-label", isActive ? "!text-white" : "")}>
                {item.label}
              </p>
            </Link>
          );
        })}
        user
      </nav>
        footer
    </section>
  );
};

export default Sidebar;
