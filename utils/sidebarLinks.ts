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
    name: "Notifications",
    href: "/company-dashboard/notifications",
    icon: BellRing,
  },
  {
    name: "Subscribe",
    href: "/company-dashboard/subscribe",
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
    name: "Notifications",
    href: "/student-dashboard/notifications",
    icon: BellRing,
  },
  {
    name: "Billing",
    href: "/student-dashboard/pricing",
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
    name: "Billings",
    href: "/admin-dashboard/billing",
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
    href: "/company-dashboard/notifications",
  },
  {
    name: "Settings",
    href: "/company-dashboard/settings",
  },
  {
    name: "Subscribe",
    href: "/company-dashboard/subscribe",
  },
];

export const studentMobileRoutes = [
  {
    name: "Dashboard",
    href: "/student-dashboard",
  },
  {
    name: "Notifications",
    href: "/student-dashboard/notifications",
  },
  {
    name: "Settings",
    href: "/student-dashboard/settings",
  },
  {
    name: "Billing",
    href: "/student-dashboard/pricing",
  },
];
