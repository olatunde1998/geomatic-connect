import Testimonial from "@/app/components/landing-page-components/Testimonial";
import HowItWorks from "@/app/components/landing-page-components/HowItWorks";
import ContactUs from "@/app/components/landing-page-components/ContactUs";
import { Footer } from "@/app/components/landing-page-components/Footer";
import Pricing from "@/app/components/landing-page-components/Pricing";
import Hero from "@/app/components/landing-page-components/Hero";
import Faq from "@/app/components/landing-page-components/Faq";
import Navbar from "@/app/components/navbar/Navbar";
import type { Metadata } from "next";
// import TawkChat from "@/app/components/chatbot/TawkChat";
// import BottomNav from "@/app/components/navbar/BottomNav";

export const metadata: Metadata = {
  title: "Home | Geomatic Connect",
  description:
    "Register, Make Request and got accepted into your desired company!",
};

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between pt-16 bg-[#F6F8FD]">
        <div className="w-full  flex-col items-center text-sm lg:flex">
          {/* === HERO SECTION === */}
          <div className="bg-primary-foreground pt-10 md:pt-12 w-full text-sm h-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]    dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:1500px_100px]">
            <div className="max-w-[1300px] mx-auto text-sm md:px-6">
              <Navbar />
              <Hero />
            </div>
          </div>
          {/* === HOW IT WORKS SECTION === */}
          <div
            id="about-id"
            className="w-full text-sm bg-[#F2F6F6] opacity-95 dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:0px_0px]"
          >
            <div className="max-w-[1200px] mx-auto text-sm px-6 md:px-10 py-10">
              <HowItWorks />
            </div>
          </div>
          {/* === Testimonial === */}
          <div
            id="testimonial-id"
            className="w-full  flex-col items-center text-sm lg:flex bg-primary-foreground bg-neutral-950 bg-[radial-gradient(ellipse_120%_120%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]  dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:100px_135px]"
          >
            <div className="w-full max-w-[1200px] text-sm ">
              <Testimonial />
            </div>
          </div>
          {/* === PRICING SECTION === */}
          <div
            id="pricing-id"
            className="bg-[#F2F6F6] w-full text-sm dark:opacity-95 dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:0px_0px]"
          >
            <div className="max-w-[1200px] mx-auto text-sm md:px-6">
              <Pricing />
            </div>
          </div>
          {/* === FAQs === */}
          <div
            id="faq-id"
            className="w-full text-sm pb-20 md:py-20 dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:6px_135px]"
          >
            <div className="w-full max-w-[1150px] mx-auto">
              <Faq />
            </div>
          </div>
          {/* === CONTACT US SECTION === */}
          <div
            id="contactUs-id"
            className="bg-[#F2F6F6] text-sm w-full dark:opacity-95 dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:0px_0px]"
          >
            <div className="max-w-[1200px] mx-auto text-sm ">
              <ContactUs />
            </div>
          </div>
          {/* === FOOTER SECTION === */}
          <div className="bg-[#014751] dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:6px_135px] dark:opacity-100 dark:rounded-none pb-10 md:pb-0  w-full text-sm lg:flex flex-col items-center relative">
            {/* === Background Image === */}
            <div className="absolute inset-0 bg-center bg-no-repeat bg-cover bg-[url(/images/globe-refine.png)] dark:hidden"></div>
            {/* ===Overlay with color and opacity=== */}
            <div className="absolute inset-0 bg-[#014751] dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:6px_135px] opacity-80 dark:rounded-none rounded-tl-[32px] rounded-br-[32px]"></div>
            <div className="relative w-full max-w-[1200px] text-sm">
              <Footer />
            </div>
          </div>
        </div>
      </main>
      {/* <TawkChat /> */}
      {/* <BottomNav /> */}
    </>
  );
}
