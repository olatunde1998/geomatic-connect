"use client";
import GeomaticLogoWhite from "@/public/images/Geomatic-Connect-Logo2w.png";
import GeomaticLogo from "@/public/images/Geomatic-Connect-Logo2b.png";
import { ThemeToggle } from "@/app/components/theme-toggle/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { PencilLine } from "lucide-react";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { FaQ } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const routes = [
  {
    name: "FAQs",
    href: "faq-id",
    icon: FaQ,
  },
  // {
  //   name: "How it Works",
  //   href: "about-id",
  //   icon: Bookmark,
  // },
];

const mobileRoutes = [
  {
    name: "Log in",
    href: "/login",
  },
  {
    name: "Sign Up",
    href: "/signup",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

export default function Navbar() {
  const [dropNav, setDropNav] = useState(false);
  const pathname = usePathname();

  const handleSmoothScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav className="fixed w-full z-20 top-0 left-0 dark:bg-background/95 dark:backdrop-blur  py-2 md:py-2.5 border-b-[0.5px] bg-white shadow-[inset_-12px_-8px_40px_#46464620]">
        <div className="max-w-[1200px] mx-auto p-2 pr-4 md:px-2 flex justify-between items-center">
          {/* =======Company LOGO ==== */}
          <Link href="/" className="flex items-center">
            <Image
              src={GeomaticLogo}
              alt="Geomatic brand logo"
              width={200}
              height={100}
              priority
              quality={100}
              className="w-[109px] h-[46px] object-cover dark:hidden"
            />
            <Image
              src={GeomaticLogoWhite}
              alt="Geomatic brand logo"
              width={200}
              height={100}
              priority
              quality={100}
              className="w-[109px] h-[46px] object-cover hidden dark:block"
            />
          </Link>

          {/* ===== LINKS (about, FAQs, Contact-US) ===== */}
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto"
            id="navbar-sticky"
          >
            <ul
              className={`${pathname !== "/blog" && "lg:mr-"} p-2 md:p-0 mt-2  font-medium rounded-lg md:space-x-5 lg:space-x-8 md:mt-0 md:border-0 hidden md:flex flex-row`}
            >
              <Link
                href="/blog"
                className="relative group flex items-center gap-2 w-fit px-2.5 py-1.5 rounded-lg"
              >
                <PencilLine className="size-4" />
                <span>Blog</span>
                <span className="absolute left-0 -bottom-0.5 h-0.5 w-full scale-x-0 bg-muted-foreground origin-left transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
              {pathname !== "/blog" &&
                routes.map((route, index) => {
                  const Icon = route.icon;
                  return (
                    <li
                      key={index}
                      className="relative flex items-center gap-2 w-fit px-2.5 py-1.5 rounded-lg group cursor-pointer"
                      onClick={() => handleSmoothScroll(`${route.href}`)}
                    >
                      <Icon className="size-4" />
                      <span className="cursor-pointer">{route.name}</span>
                      <span className="absolute left-0 -bottom-0.5 h-0.5 w-full scale-x-0 bg-muted-foreground origin-left transition-transform duration-200 group-hover:scale-x-100" />
                    </li>
                  );
                })}
            </ul>
            <div className="ml-12">
              <ThemeToggle />
            </div>
            <Link
              href="/login"
              className="relative group p-3 font-medium rounded-md mx-2 hover:text-[#014751] dark:hover:text-secondary-foreground"
            >
              Login
              <span className="absolute left-0 -bottom-0.5 h-0.5 w-full scale-x-0 bg-muted-foreground origin-left transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="w-fit"
            >
              <Link
                href="/signup"
                className="bg-[#014751] hover:bg-[#014751]/90 dark:bg-muted dark:border px-3 py-2 text-sm font-normal text-[#FFFFFF] rounded-md"
              >
                Create free account
              </Link>
            </motion.div>
          </div>

          {/* ======= Menu button ======*/}

          {!dropNav && (
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <div className="flex lg:hidden bg-[#F2F6F6] dark:bg-secondary dark:border-muted-foreground dark:border-[0.1px]   border border-slate-200 p-2 rounded-lg">
                <HiMenu
                  className="text-lg transition text-[#014751] dark:text-secondary-foreground"
                  size={32}
                  onClick={() => {
                    setDropNav(true);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/*====== Mobile Side view ======*/}
        <section className="lg:hidden text-black dark:text-secondary-foreground">
          <AnimatePresence>
            {dropNav && (
              <motion.div
                initial={{ x: "90vw" }}
                animate={{ x: 0 }}
                exit={{ x: "90vw" }}
                transition={{ type: "spring", duration: 3 }}
                className="fixed top-0 right-0 w-[80%] min-h-screen z-30 bg-[#F6F8FD]  dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:0px_0px]"
              >
                <div className="flex justify-between p-3 pr-6">
                  <a href="#" className="flex items-center">
                    <Image
                      src={GeomaticLogo}
                      alt="Geomatic brand logo"
                      width={80}
                      height={80}
                      priority
                      className="w-[109px] h-[46px] object-cover dark:hidden"
                    />
                    <Image
                      src={GeomaticLogoWhite}
                      alt="Geomatic brand logo"
                      width={80}
                      height={80}
                      priority
                      quality={100}
                      className="w-[109px] h-[46px] object-cover hidden dark:block"
                    />
                  </a>
                  <HiX
                    className="text-lg transition mt-2 text-[#014751] dark:text-secondary-foreground"
                    size={32}
                    onClick={() => {
                      setDropNav(false);
                    }}
                  />
                </div>
                <ul className="flex flex-col p-2 font-medium rounded-lg space-y-2">
                  {mobileRoutes.map((route, index) => (
                    <li
                      key={index}
                      className="block py-2 pl-1.5 mx-4 pr-3 border-b border-slate-200 dark:border-muted"
                    >
                      <Link href={route.href} className="w-full block">
                        {route.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </nav>
    </>
  );
}
