"use client";
import { companyNavItems } from "@/utils/sidebarLinks";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CompanySidebar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="grid items-start gap-2">
      {companyNavItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-[#F9FAFB] hover:text-accent-foreground",
              pathname === item.href ? "bg-gray-200" : "bg-transparent"
            )}
          >
            <item.icon className="mr-2 h-4 w-4 text-primary" />
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}