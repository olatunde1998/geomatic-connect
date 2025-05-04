"use client";
import GeomaticLogo from "@/public/images/Geomatic-Connect-Logo2b.png";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, PencilLine } from "lucide-react";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { FaQ } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { ModeToggle } from "@/app/components/modeToggle/ModeToggle";

const routes = [
  {
    name: "FAQs",
    href: "faq-id",
    icon: FaQ,
  },
  {
    name: "How it Works",
    href: "about-id",
    icon: Bookmark,
  },
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
      <nav className="fixed w-full z-20 top-0 left-0 bg-[#F6F8FD] dark:bg-primary-foreground py-2 md:py-2.5 backdrop-blur-10 border-b-[0.5px] backdrop-blur-10 backdrop-blur-md">
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
              className="w-[109px] h-[46px] object-cover"
            />
          </Link>

          {/* ===== LINKS (about, FAQs, Contact-US) ===== */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul
              className={`${pathname !== "/blog" && "lg:mr-10"}p-2 md:p-0 mt-2  font-medium rounded-lg md:space-x-5 lg:space-x-8 md:mt-0 md:border-0 hidden md:flex flex-row`}
            >
              <Link
                href="/blog"
                className="flex items-center gap-2 hover:bg-white w-fit px-2.5 py-1.5 rounded-lg"
              >
                <PencilLine className="size-4" />
                Blog
              </Link>
              {pathname !== "/blog" &&
                routes.map((route, index) => {
                  const Icon = route.icon;
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-2 hover:bg-white w-fit px-2.5 py-1.5 rounded-lg"
                      onClick={() => handleSmoothScroll(`${route.href}`)}
                    >
                      <Icon className="size-4 text-gray-600" />
                      <span className="cursor-pointer">{route.name}</span>
                    </li>
                  );
                })}
            </ul>

            <Link
              href="/login"
              className="p-3 font-medium rounded-md mx-4 hover:text-[#014751]"
            >
              Login
            </Link>
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              className="w-fit"
            >
              <Link
                href="/signup"
                className="bg-[#014751] hover:bg-[#014751]/90 dark:bg-muted dark:hover:bg-background dark:border px-3 py-2 text-sm font-normal text-[#FFFFFF] rounded-md"
              >
                Create free account
              </Link>
            </motion.div>
            <div className="ml-4">{/* <ModeToggle /> */}</div>
          </div>

          {/* ======= Menu button ======*/}
          <div className="flex md:hidden bg-[#F2F6F6] border border-slate-200 p-2 rounded-lg">
            {!dropNav && (
              <HiMenu
                className="text-lg transition text-[#014751]"
                size={32}
                onClick={() => {
                  setDropNav(true);
                }}
              />
            )}
          </div>
        </div>

        {/*====== Mobile Side view ======*/}
        <section className="md:hidden text-black">
          <AnimatePresence>
            {dropNav && (
              <motion.div
                initial={{ x: "90vw" }}
                animate={{ x: 0 }}
                exit={{ x: "90vw" }}
                transition={{ type: "spring", duration: 3 }}
                className="fixed top-0 right-0 w-[80%] min-h-screen bg-[#F6F8FD] z-30"
              >
                <div className="flex justify-between p-3 pr-6">
                  <a href="#" className="flex items-center">
                    <Image
                      src={GeomaticLogo}
                      alt="Geomatic brand logo"
                      width={80}
                      height={80}
                      priority
                      className="w-[109px] h-[46px] object-cover"
                    />
                  </a>
                  <HiX
                    className="text-lg transition mt-2 text-[#014751]"
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
                      className="block py-2 pl-1.5 mx-4 pr-3 border-b border-slate-200"
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
