import { auth } from "@/auth";
import Navbar from "@/app/components/navbar/Navbar";
import Hero from "@/app/components/landing-page-components/Hero";
import HowItWorks from "@/app/components/landing-page-components/HowItWorks";
import ConnectServices from "@/app/components/landing-page-components/ConnectServices";
import Testimonial from "@/app/components/landing-page-components/Testimonial";

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
          <div className=" w-full max-w-7xl text-sm  md:px-6">
            <Testimonial />
          </div>
        </div>
      </div>
    </main>
  );
}
