"use client";
import { bottomLinks } from "@/utils/sidebarLinks";
import { usePathname } from "next/navigation";
import React from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const basePath = pathname.split("/")[1] || "";

  const handleSmoothScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <ul className="fixed bottom-0 left-0 w-full flex items-center justify-between bg-white/50 backdrop-blur-md border-t-[0.5px] border-slate-100 px-7 py-3 md:hidden">
      {bottomLinks.map((item, index) => {
        const Icon = item.icon;
        const linkHref = basePath ? `/${basePath}${item.href}` : item.href;
        return (
          <li
            onClick={() => handleSmoothScroll(`${item.href}`)}
            key={index}
            className={`${
              pathname === linkHref ? "text-[#014751]" : "#828282"
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
