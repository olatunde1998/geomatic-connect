import { CreditCard, Home, BellRing } from "lucide-react";

export const adminNavItems = [
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

export const companyNavItems = [
  {
    name: "Home",
    href: "/company-dashboard",
    icon: Home,
  },
  {
    name: "Requests",
    href: "/company-dashboard/requests",
    icon: BellRing,
  },
  {
    name: "Billing",
    href: "/company-dashboard/billing",
    icon: CreditCard,
  },
];

export const studentNavItems = [
  {
    name: "Home",
    href: "/student-dashboard",
    icon: Home,
  },
  {
    name: "Requests",
    href: "/student-dashboard/requests",
    icon: BellRing,
  },
  {
    name: "Billing",
    href: "/student-dashboard/billing",
    icon: CreditCard,
  },
];

// MobileLinks (Navbar)
export const adminMobileRoutes = [
  {
    name: "Dashboard",
    href: `/admin-dashboard`,
  },
  {
    name: "Notifications",
    href: "/admin-dashboard/requests",
  },
  {
    name: "Settings",
    href: "/admin-dashboard/settings",
  },
];

export const companyMobileRoutes = [
  {
    name: "Dashboard",
    href: "/company-dashboard",
  },
  {
    name: "Notifications",
    href: "/company-dashboard/requests",
  },
  {
    name: "Settings",
    href: "/company-dashboard/settings",
  },
  {
    name: "Pricing",
    href: "/company-dashboard/pricing",
  },
];

export const studentMobileRoutes = [
  {
    name: "Dashboard",
    href: "/student-dashboard",
  },
  {
    name: "Notifications",
    href: "/student-dashboard/requests",
  },
  {
    name: "Settings",
    href: "/student-dashboard/settings",
  },
  {
    name: "Pricing",
    href: "/student-dashboard/pricing",
  },
];
