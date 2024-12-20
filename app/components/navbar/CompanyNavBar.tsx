"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Modal } from "@/app/components/modals/Modal";
import Logout from "@/app/components/auth-components/Logout";
import { GetUserByIdRequest } from "@/app/services/request.request";
import { useQuery } from "@tanstack/react-query";
import { HiMenu, HiX } from "react-icons/hi";
import { Bell, Mail, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GeomaticLogo from "@/public/images/geomatic-logo.svg";
import { useRouter } from "next/navigation";
import { companyMobileRoutes } from "@/utils/sidebarLinks";
import { GetUserProfileRequest } from "@/app/services/users.request";

export default function CompanyNavBar({ session }: { session: any }) {
  const userId = session?.user?._id;
  const token = session?.user?.token;
  const [dropNav, setDropNav] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ["getUserProfileApi"],
    queryFn: () => GetUserProfileRequest(userId, token),
  });

  // Handle click outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Trigger subscription modal
  // useEffect(() => {
  //   const MAX_COUNT = 3;
  //   const INTERVAL = 60000;
  //   let count = 0;

  //   const showModal = () => {
  //     if (count < MAX_COUNT) {
  //       setShowSubscribe(true);
  //       count += 1;
  //       setTimeout(showModal, INTERVAL);
  //     }
  //   };
  //   const timeoutId = setTimeout(showModal, INTERVAL);
  //   return () => clearTimeout(timeoutId);
  // }, []);

  return (
    <>
      <nav className="bg-white fixed px-6 z-[1000] lg:px-12 xl:px-20 py-[20px] top-0 left-0 right-0 border-b border-accent ">
        <div className="flex justify-between items-center lg:block ">
          <div className="lg:flex justify-between items-center">
            <div className="flex items-center">
              <span onClick={() => router.back()} className="font-bold">
                <div className="flex items-center">
                  <Image
                    src={GeomaticLogo}
                    alt="profile image"
                    width={100}
                    height={100}
                    priority
                    className="w-[80px] h-[40px] md:w-[150px] md:h-[50px] object-contain md:object-cover"
                  />
                </div>
              </span>
              <div className="border-l border-slate-300 pl-3 ml-3 space-y-3 hidden md:inline-block">
                <p className="text-xs font-light">
                  Hi {userData?.data?.companyName ?? "Geomatician"}
                </p>
                <p>Welcome 👋</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-x-2 text-sm md:text-base cursor-pointer font-light w-fit">
              <Link
                href={`/company-dashboard/notifications`}
                className="text-[#33A852] ml-4"
              >
                Notifications
              </Link>
              <p className="text-[#33A852] underline ml-3">See more Profiles</p>

              <div className="flex items-center space-x-3 ml-4">
                <div className="bg-slate-300 p-2 rounded-lg flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <Link
                  href={`/company-dashboard/notifications`}
                  className="bg-slate-300 p-2 rounded-lg flex items-center justify-center"
                >
                  <Bell size={14} />
                </Link>
                <Link
                  href={`/company-dashboard/settings`}
                  className="bg-slate-300 p-2 rounded-lg flex items-center justify-center"
                >
                  <Settings size={14} />
                </Link>

                <div
                  onClick={() => setShowActions((prevState) => !prevState)}
                  className="flex justify-start"
                >
                  <div className="relative cursor-pointer">
                    {!userData?.data?.avatarImage ? (
                      <div className="w-[50px] h-[50px] border-[1.3px] border-slate-200 items-center justify-center flex rounded-full text-[20px] bg-[#524A4C] text-white font-bold">
                        {userData?.data?.fullName?.charAt(0)?.toUpperCase() ??
                          "N/A"}
                      </div>
                    ) : (
                      <Image
                        src={userData?.data?.avatarImage}
                        alt="user avatar pics"
                        width={42}
                        height={42}
                        className="w-[42px] h-[42px] border-[1.3px] border-slate-200 items-center justify-center flex rounded-full object-cover"
                      />
                    )}
                    <div
                      ref={dropdownRef}
                      className={`${
                        showActions === true ? "block" : "hidden"
                      } bg-white py-3 shadow-md rounded-lg text-sm border border-[#213f7d0f]  space-y-2 absolute right-[-1px] lg:right-[-18px] z-[1] top-[50px]`}
                    >
                      <Link
                        href={`/company-dashboard/settings`}
                        className="hover:bg-gray-100 flex items-center gap-x-2 cursor-pointer p-2 pr-10 pl-4"
                      >
                        <Settings size={18} className="text-gray-600" />
                        Settings
                      </Link>
                      <div
                        className="hover:bg-gray-100 flex items-center gap-x-2 cursor-pointer text-red-600 p-2 pr-20 pl-4"
                        onClick={() => {
                          setShowActions(false);
                          setShowLogOut(true);
                        }}
                      >
                        <LogOut size={20} />
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ======= Menu button (Hamburger button) ======*/}
          <div className="lg:hidden flex space-x-3">
            <div className="bg-slate-300 p-2 rounded-lg flex items-center justify-center">
              <Mail size={16} />
            </div>
            <Link
              href={`/company-dashboard/notifications`}
              className="bg-slate-300 p-2 rounded-lg flex items-center justify-center"
            >
              <Bell size={14} />
            </Link>

            <HiMenu
              className="transition"
              size={32}
              onClick={() => {
                setDropNav(true);
              }}
            />
          </div>
        </div>

        {/*====== Mobile view ======*/}
        <section className="lg:hidden text-black">
          <AnimatePresence>
            {dropNav && (
              <motion.div
                initial={{ x: "90vw" }}
                animate={{ x: 0 }}
                exit={{ x: "90vw" }}
                transition={{ type: "spring", duration: 3 }}
                className="fixed top-0 right-0 w-[80%] min-h-screen bg-[#F6F8FD] z-30 pl-4"
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
                <ul className="flex flex-col mt-4 font-light text-sm rounded-lg space-y-3">
                  {companyMobileRoutes.map((route, index) => (
                    <li key={index} className="block py-1 pl-2 pr-3">
                      <Link
                        onClick={() => {
                          setDropNav(false);
                        }}
                        href={route.href}
                        className="w-full inline-block"
                      >
                        {route.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div
                  onClick={() => setShowLogOut(true)}
                  className="mt-10 ml-3 text-sm flex items-center space-x-4 hover:bg-[#EDEDF1] p-2 pr-3  cursor-pointer bg-[#524A4C] rounded-lg w-fit font-light text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
                >
                  <LogOut size={16} />
                  <p>Log out</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </nav>

      <Modal show={showLogOut} onClose={() => setShowLogOut(false)}>
        <Logout setShowLogOut={setShowLogOut} />
      </Modal>
    </>
  );
}
