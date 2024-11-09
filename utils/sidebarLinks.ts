import { CreditCard, Home, BellRing } from "lucide-react";

export const navItems = [
    {
      name: "Home",
      href: "/admin-dashboard",
      icon: Home,
    },
    {
      name: "Requests",
      href: "/admin-dashboard/requests",
      icon: BellRing,
    },
    {
      name: "Billing",
      href: "/admin-dashboard/billing",
      icon: CreditCard,
    },
  ];