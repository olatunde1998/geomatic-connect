import type { Metadata } from "next";
import Navbar from "@/app/components/navbar/Navbar";
import Hero from "@/app/components/landing-page-components/Hero";
import HowItWorks from "@/app/components/landing-page-components/HowItWorks";
import WhoWeAre from "@/app/components/landing-page-components/WhoWeAre";
import Testimonial from "@/app/components/landing-page-components/Testimonial";
import Pricing from "@/app/components/landing-page-components/Pricing";
import Faq from "@/app/components/landing-page-components/Faq";
import ContactUs from "@/app/components/landing-page-components/ContactUs";
import { Footer } from "@/app/components/landing-page-components/Footer";
import TawkChat from "@/app/components/chatbot/TawkChat";
// import BottomNav from "@/app/components/navbar/BottomNav";

export const metadata: Metadata = {
  title: "Home | Geomatic Connect",
  description:
    "Geomatic Connect  is a platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.",
};

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between pt-16 bg-[#F6F8FD]">
        <div className="w-full  flex-col items-center text-sm lg:flex">
          {/* === HERO SECTION === */}
          <div className="bg-primary-foreground lg:pt-8 w-full text-sm h-full  bg-[linear-gradient(to_top_left,#F2F6F6_0%,transparent_100%),linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24rem_18rem]">
            <div className="max-w-[1300px] mx-auto text-sm md:px-6">
              <Navbar />
              <Hero />
            </div>
          </div>
          {/* === WHO WE ARE SECTION === */}
          <div
            id="whoWeAre-id"
            className="w-full text-sm  max-w-[1200px] mx-auto px-6 pb-24 md:px-10 md:pt-16 lg:py-20"
          >
            <WhoWeAre />
          </div>

          {/* === HOW IT WORKS SECTION === */}
          <div
            id="about-id"
            className="w-full text-sm bg-[#014751] dark:bg-primary-foreground dark:opacity-100 opacity-95"
          >
            <div className="max-w-[1200px] mx-auto text-sm px-6 md:px-10 py-10">
              <HowItWorks />
            </div>
          </div>
          {/* === Testimonial === */}
          <div
            id="testimonial-id"
            className="w-full  flex-col items-center text-sm lg:flex"
          >
            <div className="w-full max-w-[1200px] text-sm ">
              <Testimonial />
            </div>
          </div>
          {/* === PRICING SECTION === */}
          <div id="pricing-id" className="bg-[#F2F6F6] w-full text-sm">
            <div className="max-w-[1200px] mx-auto text-sm md:px-6">
              <Pricing />
            </div>
          </div>
          {/* === FAQs === */}
          <div id="faq-id" className="w-full text-sm pb-20 md:py-20">
            <div className="w-full max-w-[1150px] mx-auto">
              <Faq />
            </div>
          </div>
          {/* === CONTACT US SECTION === */}
          <div id="contactUs-id" className="bg-[#F2F6F6] text-sm w-full">
            <div className="max-w-[1200px] mx-auto text-sm ">
              <ContactUs />
            </div>
          </div>
          {/* === FOOTER SECTION === */}
          <div className="bg-[#014751] pb-24 md:pb-0  w-full text-sm lg:flex flex-col items-center relative">
            {/* === Background Image === */}
            <div className="absolute inset-0 bg-center bg-no-repeat bg-cover bg-[url(/images/globe-refine.png)] "></div>
            {/* ===Overlay with color and opacity=== */}
            <div className="absolute inset-0 bg-[#014751] dark:bg-primary-foreground dark:opacity-100 opacity-80 dark:rounded-none rounded-tl-[32px] rounded-br-[32px]"></div>
            <div className="relative w-full max-w-[1200px] text-sm">
              <Footer />
            </div>
          </div>
        </div>
      </main>
      <TawkChat />
      {/* <BottomNav /> */}
    </>
  );
}
