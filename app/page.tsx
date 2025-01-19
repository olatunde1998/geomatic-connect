import Navbar from "@/app/components/navbar/Navbar";
// import Hero from "@/app/components/landing-page-components/Hero";
import HeroTwo from "@/app/components/landing-page-components/HeroTwo";
import HowItWorks from "@/app/components/landing-page-components/HowItWorks";
import WhoWeAre from "@/app/components/landing-page-components/WhoWeAre";
import Testimonial from "@/app/components/landing-page-components/Testimonial";
import Pricing from "@/app/components/landing-page-components/Pricing";
import Faq from "@/app/components/landing-page-components/Faq";
import ContactUs from "@/app/components/landing-page-components/ContactUs";
import { Footer } from "@/app/components/landing-page-components/Footer";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16 bg-[#F6F8FD]">
      <div className="w-full  flex-col items-center text-sm lg:flex">
        {/* === HERO SECTION === */}
        <div className="bg-[#F2F6F6] lg:pt-8 w-full text-sm">
          <div className="max-w-[1300px] mx-auto text-sm md:px-6">
            <Navbar />
            {/* <Hero /> */}
            <HeroTwo />
          </div>
        </div>
        {/* === WHO WE ARE SECTION === */}
        <div className="w-full text-sm  max-w-[1200px] mx-auto px-6 pb-16 md:px-10 md:pt-16 lg:py-20">
          <WhoWeAre />
        </div>

        {/* === HOW IT WORKS SECTION === */}
        <div id="about-id" className="w-full text-sm bg-[#014751] opacity-80">
          <div className="max-w-[1200px] mx-auto text-sm px-6 md:px-10 py-10">
            <HowItWorks />
          </div>
        </div>

        {/* === Testimonial === */}
        <div className="w-full  flex-col items-center text-sm lg:flex">
          <div className="w-full max-w-[1200px] text-sm ">
            <Testimonial />
          </div>
        </div>

        {/* === PRICING SECTION === */}
        <div className="bg-[#F2F6F6] w-full text-sm">
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

        {/* === CHAT-BOT (Whatsapp) === */}
        <div className="fixed bottom-[40px] right-[20px] z-[1000] rounded-full">
          <a
            href="https://api.whatsapp.com/send/?phone=2348133642798&text=Welcome+to+Geomatic+Connect%2C+please+ask+me+any+question+regarding+our+products+and+services&type=phone_number&app_absent=0"
            target="_blank"
          >
            <span className="bg-[#019734] p-2.5 rounded-full flex items-center">
              <FaWhatsapp color="#FFFFFF" size={42} className="" />
            </span>
          </a>
        </div>

        {/* === FOOTER SECTION === */}
        <div className="bg-[#014751] w-full text-sm lg:flex flex-col items-center relative">
          {/* === Background Image === */}
          <div className="absolute inset-0 bg-center bg-no-repeat bg-cover bg-[url(/images/globe-refine.png)] "></div>
          {/* ===Overlay with color and opacity=== */}
          <div className="absolute inset-0 bg-[#014751] opacity-80 rounded-tl-[32px] rounded-br-[32px]"></div>
          <div className="relative w-full max-w-[1200px] text-sm">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
