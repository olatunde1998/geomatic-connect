"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import GeomaticLogo from "@/public/images/geomatic-logo-white.png";
import { useRouter } from "next/navigation";
// import { ModeToggle } from "@/app/components/modeToggle/ModeToggle";

const routes = [
  {
    name: "FAQs",
    href: "faq-id",
  },
  {
    name: "How it Works",
    href: "about-id",
  },
  {
    name: "Contact us",
    href: "contactUs-id",
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
];

export default function Navbar() {
  const [dropNav, setDropNav] = useState(false);
  const router = useRouter();

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
              className="w-[109px] h-[46px] object-cover"
            />
          </Link>

          {/* ===== LINKS (about, FAQs, Contact-US) ===== */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="p-2 md:p-0 mt-2 font-medium rounded-lg md:space-x-4 md:mt-0 md:border-0 hidden md:flex flex-row">
              <li
                className="block py-1 pl-2 pr-3"
                onClick={() => router.push("/blog")}
              >
                <span className="cursor-pointer">Blog</span>
              </li>
              {routes.map((route, index) => (
                <li
                  key={index}
                  className="block py-1 pl-2 pr-3"
                  onClick={() => handleSmoothScroll(`${route.href}`)}
                >
                  <span className="cursor-pointer">{route.name}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/login"
              className="p-3 font-medium rounded-md mx-4 hover:text-[#014751]"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#014751] hover:bg-[#014751]/90 dark:bg-muted dark:hover:bg-background dark:border px-3 py-2 text-sm font-normal text-[#FFFFFF] rounded-md"
            >
              Create free account
            </Link>
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
                      <Link href={route.href}>{route.name}</Link>
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
