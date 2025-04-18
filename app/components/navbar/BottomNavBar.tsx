"use client";
import { bottomRouteLinks, adminBottomRouteLinks } from "@/utils/sidebarLinks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function BottomNavBar() {
  const pathname = usePathname();
  const basePath = pathname.split("/")[1] || "";

  const linksToUse =
    basePath === "admin-dashboard" ? adminBottomRouteLinks : bottomRouteLinks;

  // modified list based on whether the user is in company-dashboard
  const updatedLinks = linksToUse.map((item) => {
    if (basePath === "company-dashboard" && item.key === "billing") {
      return {
        ...item,
        name: "Subscribe",
        href: "/subscribe",
      };
    }
    return item;
  });

  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-between bg-white/50 backdrop-blur-md border-t border-slate-200 px-7 py-3 md:hidden">
      {updatedLinks.map((item, index) => {
        const Icon = item.icon;
        const linkHref =
          item.key === "blog" && basePath === "company-dashboard"
            ? item.href
            : basePath
              ? `/${basePath}${item.href}`
              : item.href;
        return (
          <Link
            href={linkHref}
            key={index}
            className={`${
              pathname === linkHref ? "text-[#33A852]" : "#828282"
            } flex flex-col items-center cursor-pointer`}
          >
            <Icon size={24} />
            <p className="font-normal text-xs leading-6">{item.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
