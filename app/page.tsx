import { auth } from "@/auth";
import Navbar from "@/app/components/navbar/Navbar";
import Hero from "@/app/components/landing-page-components/Hero";
import HowItWorks from "@/app/components/landing-page-components/HowItWorks";
import ConnectServices from "@/app/components/landing-page-components/ConnectServices";
import Testimonial from "@/app/components/landing-page-components/Testimonial";
import Pricing from "@/app/components/landing-page-components/Pricing";
import Faq from "@/app/components/landing-page-components/Faq";
import ContactUs from "@/app/components/landing-page-components/ContactUs";
import { FaWhatsapp } from "react-icons/fa";

export default async function Home() {
  const session = await auth();
  console.log(session, "this is session here ===");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-28 pt-16 bg-[#F6F8FD]">
      <div className="w-full  flex-col items-center text-sm lg:flex">
        {/* === HERO SECTION === */}
        <div className="bg-[#F2F6F6] w-full  flex-col items-center text-sm lg:flex">
          <div className=" w-full max-w-7xl text-sm  md:px-6">
            <Navbar />
            <Hero />
          </div>
        </div>
        {/* === HOW IT WORKS SECTION === */}
        <div className="w-full  flex-col items-center text-sm lg:flex">
          <div className=" w-full max-w-7xl text-sm  md:px-6">
            <HowItWorks />
          </div>
        </div>

        {/* === CONNECT SERVICE SECTION === */}
        <div className="w-full  flex-col items-center text-sm lg:flex bg-[#638E96]">
          <div className=" w-full max-w-7xl text-sm  md:px-6">
            <ConnectServices />
          </div>
        </div>

        {/* === Testimonial === */}
        <div className="w-full  flex-col items-center text-sm lg:flex">
          <div className=" w-full max-w-7xl text-sm ">
            <Testimonial />
          </div>
        </div>

        {/* === PRICING SECTION === */}
        <div className="bg-[#F2F6F6] w-full flex-col items-center text-sm lg:flex">
          <div className=" w-full max-w-7xl text-sm  md:px-6">
            <Pricing />
          </div>
        </div>

        {/* === FAQs === */}
        <div className="w-full  flex-col items-center text-sm lg:flex py-20">
          <div className=" w-full max-w-7xl text-sm ">
            <Faq />
          </div>
        </div>

        {/* === CONTACT US SECTION === */}
        <div className="bg-[#F2F6F6] w-full text-sm lg:flex flex-col items-center">
          <div className=" w-full max-w-7xl text-sm  md:px-6">
            <ContactUs />
          </div>
        </div>

        {/* === CHAT-BOT (Whatsapp) === */}
        <div className="fixed bottom-[40px] right-[20px] z-[1000] rounded-full">
          <a
            href="https://api.whatsapp.com/send/?phone=2348133642798&text=Welcome+to+Geomatic+Connect%2C+please+ask+me+any+question+regarding+our+products+and+services&type=phone_number&app_absent=0"
            target="_blank"
          >
            <div className="bg-[#019734] p-2.5 rounded-full flex items-center">
              <FaWhatsapp color="#FFFFFF" size={42} className="" />
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
