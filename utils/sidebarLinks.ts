import {
  CreditCard,
  Home,
  BellRing,
  PencilLine,
  LayoutGrid,
  ChartNoAxesCombined,
  User,
} from "lucide-react";
import { FaQ } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { MdOutlinePayment, MdSupportAgent } from "react-icons/md";

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
    name: "Overview",
    href: "/student-dashboard/overview",
    icon: LayoutGrid,
  },
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
    href: "/student-dashboard/billing",
  },
];

// Admin Bottom Navbar Route Links
export const adminBottomRouteLinks = [
  {
    name: "Home",
    href: "",
    key: "home",
    icon: GoHome,
  },
  {
    name: "Billing",
    href: "/billing",
    key: "billing",
    icon: MdOutlinePayment,
  },
  {
    name: "Blog",
    href: "/blog",
    key: "blog",
    icon: PencilLine,
  },
  {
    name: "Requests",
    href: "/requests",
    key: "requests",
    icon: MdSupportAgent,
  },
];

// Bottom Navbar Route Links
export const bottomRouteLinks = [
  {
    name: "Home",
    href: "",
    key: "home",
    icon: GoHome,
  },
  {
    name: "Blog",
    href: "/blog",
    key: "blog",
    icon: PencilLine,
  },
  // {
  //   name: "Billing",
  //   href: "/billing",
  //   key: "billing",
  //   icon: MdOutlinePayment,
  // },
  {
    name: "Overview",
    href: "/overview",
    key: "overview",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Settings",
    href: "/settings",
    key: "settings",
    icon: User,
  },
];

// Bottom Navbar Route Links
export const bottomLinks = [
  {
    name: "Home",
    href: "/",
    key: "home",
    icon: GoHome,
  },
  {
    name: "Blog",
    href: "/blog",
    key: "blog",
    icon: PencilLine,
  },
  {
    name: "FAQs",
    href: "/",
    icon: FaQ,
    key: "faq",
  },
  {
    name: "Support",
    href: "/",
    icon: MdSupportAgent,
    key: "support",
  },
];
