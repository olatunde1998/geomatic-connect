"use client";
import Image from "next/image";
import ConnectService from "@/public/images/connect-service-1.png";
import ConnectServiceTwo from "@/public/images/connect-service-2.png";

export default function ConnectServices() {
  return (
    <>
      <main className="pt-10 md:pt-10 md:px-6 w-full md:flex">
        <div className="hidden md:flex items-center justify-center">
          <Image
            src={ConnectService}
            alt="Connect Service picture"
            width={500}
            height={500}
            priority
            className="md:w-[259px] md:h-[435px]"
          />
        </div>
        <div className="text-[#FFFFFF] md:mt-12 px-6 md:pl-10 ">
          <p className="text-xl text-center md:text-left font-bold lg:text-3xl md:max-w-[400px]">
            We&apos;re Providing the Best Connection Services
          </p>
          <p className="mt-4 text-center md:text-left md:mt-8 md:text-lg max-w-[480px] text-[#F0F0F0]">
            Make a type specimen book. It has survived not only five centuries,
            but also the leap into.
          </p>
        </div>
        <div className="ml-8">
          <Image
            src={ConnectServiceTwo}
            alt="Talent picture"
            width={500}
            height={500}
            priority
            className=" md:w-[478px] md:h-[388px]"
          />
        </div>
      </main>
    </>
  );
}
