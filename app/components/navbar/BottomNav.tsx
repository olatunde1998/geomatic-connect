"use client";
import { bottomLinks } from "@/utils/sidebarLinks";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <ul className="fixed bottom-0 left-0 w-full flex items-center justify-between bg-white/50 backdrop-blur-md border-t-[0.5px] border-slate-100 px-7 py-3 md:hidden">
      {bottomLinks.map((item, index) => {
        const Icon = item.icon;
        return (
          <li
            onClick={() => router.push(item.href)}
            key={index}
            className={`${
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href))
                ? "text-[#014751]"
                : "text-[#515151]"
            } flex flex-col items-center cursor-pointer`}
          >
            <Icon size={24} />
            <p className="font-normal text-xs leading-6">{item.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
