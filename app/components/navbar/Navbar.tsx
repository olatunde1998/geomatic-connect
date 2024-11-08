"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import GeomaticLogo from "@/public/images/geomatic-logo.png";

const routes = [
  {
    name: "About us",
    href: "about-id",
  },
  {
    name: "FAQs",
    href: "faq-id",
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
  const [showActions, setShowActions] = useState(false);

  // Refs
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<HTMLSpanElement | null>(null);

  // Handle click outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        viewRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !viewRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSmoothScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav className="fixed w-full z-20 top-0 left-0 border-b bg-[#F6F8FD] py-2.5 backdrop-blur-10">
        <div className="max-w-[1100px] xl:max-w-7xl mx-auto p-2 px-6 flex justify-between">
          {/* =======Company LOGO ==== */}
          <Link href="/" className="flex items-center">
            <Image
              src={GeomaticLogo}
              alt="Geomatic brand logo"
              width={100}
              height={100}
              priority
            />
          </Link>

          {/* ===== LINKS (about, FAQs, Contact-US) ===== */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="p-2 md:p-0 mt-2 font-medium rounded-lg md:space-x-4 md:mt-0 md:border-0 hidden md:flex flex-row">
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
            <Globe color="#014751" className="cursor-pointer mx-6" />
            <Link
              href="/signup"
              className="bg-[#014751] p-3 font-bold text-[#FFFFFF] rounded-md"
            >
              Register an account
            </Link>
          </div>

          {/* ======= Menu button ======*/}
          <div className="md:hidden">
            {!dropNav && (
              <HiMenu
                className="text-lg transition"
                size={32}
                onClick={() => {
                  setDropNav(true);
                }}
              />
            )}
          </div>
        </div>

        {/*====== Mobile view ======*/}
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
                    className="text-lg transition mt-2"
                    size={32}
                    onClick={() => {
                      setDropNav(false);
                    }}
                  />
                </div>
                <ul className="flex flex-col p-2 font-medium rounded-lg space-y-2">
                  {mobileRoutes.map((route, index) => (
                    <li key={index} className="block py-1 pl-2 pr-3">
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
