"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import GeomaticLogo from "@/public/images/geomatic-logo-white.png";
import { IoSparklesSharp } from "react-icons/io5";
import { Modal } from "@/app/components/modals/Modal";
import Chatbot from "@/app/components/chatbot/ChatBot";
import { ModeToggle } from "@/app/components/modeToggle/ModeToggle";

const routes = [
  {
    name: "How it Works",
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
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
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

  // toggleChat handler
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <nav className="fixed w-full z-20 top-0 left-0 border-b bg-[#F6F8FD] dark:bg-primary-foreground py-2.5 backdrop-blur-10">
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
            <p
              onClick={() => toggleChat()}
              className="hidden bg-[#F2F6F6] dark:bg-background dark:hover:bg-muted dark:border dark:border-muted border-[0.2px] border-[#014751] px-3 py-2 font-medium cursor-pointer rounded-md mx-4 hover:text-[#014751] dark:hover:text-accent-foreground lg:flex items-center gap-3"
            >
              <IoSparklesSharp /> <span>Ask AI</span>
            </p>
            <Link
              href="/signup"
              className="bg-[#014751] dark:bg-muted dark:hover:bg-background dark:border px-3 py-2 text-sm font-normal text-[#FFFFFF] rounded-md"
            >
              Create free account
            </Link>
            <div className="ml-4">
              <ModeToggle />
            </div>
          </div>

          {/* ======= Menu button ======*/}
          <div className="flex md:hidden">
            <p
              onClick={() => toggleChat()}
              className="md:hidden bg-[#F2F6F6] dark:bg-background dark:hover:bg-muted dark:border dark:border-muted border-[0.2px] border-[#014751] px-3 py-2 font-medium cursor-pointer rounded-sm mx-4 hover:text-[#014751] flex items-center gap-3"
            >
              <IoSparklesSharp /> <span>Ask AI</span>
            </p>
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
      {/* === MODALS === */}
      <Modal show={isChatOpen} onClose={() => setIsChatOpen(false)}>
        <Chatbot toggleChat={toggleChat} />
      </Modal>
    </>
  );
}
