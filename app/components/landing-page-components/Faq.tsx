"use client";
import { Minus } from "lucide-react";

export default function Faq() {
  return (
    <>
      <main className="relative py-8 px-6   w-full rounded-tl-[32px] rounded-br-[32px]">
        {/* ===== Background Image ===== */}
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover bg-[url(/images/globe.png)] "></div>
        {/* =====Overlay with color and opacity==== */}
        <div className="absolute inset-0 bg-[#014751] opacity-80 rounded-tl-[32px] rounded-br-[32px]"></div>
        {/* ====Section One (CONTENT)==== */}
        <div className="relative">
          <p className="text-center text-xl uppercase  font-extrabold lg:text-3xl text-[#FFFFFF]">
            faq<span className="lowercase">s</span>
          </p>
          <p className="text-center text-md lg:text-lg mt-3 text-[#FFFFFF]">
            Frequently Asked Questions About Us!
          </p>
          <div className="flex justify-between mt-10 text-[#014751] bg-[#FFFFFF] p-4 md:p-8 lg:p-10 rounded-tl-[32px] rounded-br-[32px] max-w-6xl mx-auto">
            <div>
              <p className="text-base lg:text-xl font-medium">
                Q1-{" "}
                <span className="ml-4">
                  I need to sell my house quickly! How fast can HouseCashin
                  complete the sale?
                </span>
              </p>
              <p className="text-sm lg:text-base mt-4">
                Generally, we can buy your home in 3 to 30 days. In many cases
                we can provide you with a cash offer the same day over the
                phone, schedule a closing ASAP and have your cash ready within
                72 hours after you
              </p>
            </div>
            <div className="cursor-pointer">
              <Minus />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
