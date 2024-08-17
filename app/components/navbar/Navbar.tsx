"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white fixed px-6  lg:px-12 xl:px-20 py-[20px] top-0 left-0 right-0 border-b border-accent ">
      <div className="md:flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="font-bold ">
            <div className="flex items-center">
              <Image
                src="/images/geomatic-logo.svg"
                alt="profile image"
                width={100}
                height={100}
                priority
                className="w-[150px] h-[50px] object-cover"
              />
            </div>
          </Link>
          <div className="border-l-2 border-slate-300 pl-3 ml-3 space-y-3">
            <p className="text-xs font-light">Hi Rasheed</p>
            <p>Welcome 👋</p>
          </div>
        </div>
        <div className="flex gap-x-2 cursor-pointer font-light">
          <p className="text-[#33A852] underline">See more Profiles</p>
          <p className="text-red-600">Logout</p>
        </div>
      </div>
    </nav>
  );
}
