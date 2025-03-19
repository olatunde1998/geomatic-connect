import TawkChat from "@/app/components/chatbot/TawkChat";
import { GiArcheryTarget } from "react-icons/gi";
import { TbSitemap } from "react-icons/tb";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Support | Geomatic Connect",
  description:
    "Geomatic Connect  is a platform that enables higher institution students to connect with companies offering internships, SIWES, SWEP placements, and other practical training opportunities. It also helps companies find and recruit qualified candidates with ease.",
};

export default async function SupportPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 md:pt-32 lg:pt-32 xl:pt-32 font-sans text-md max-w-7xl">
      <section className="md:flex justify-between gap-10">
        <div className="font-san max-w-sm md:max-w-[300px] lg:max-w-[250px] xl:max-w-sm">
          <p className="text-2xl lg:text-2xl xl:text-4xl text-[#33A852] font-semibold mb-10">
            Need help? <br /> You are in the right <br />
            place.
          </p>
          <p className="text-md font-light leading-6">
            Pick from categories to find advice and answers from the{" "}
            <br className="md:hidden" /> Geomatic Connect Team.
          </p>
        </div>
        <div className="mt-10 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-6 md:w-[60%] lg:w-[70%] xl:w-fit">
          <div className="bg-[#F2F6F6] dark:hover:bg-muted border border-slate-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-6 px-3.5 lg:p-6 rounded-lg max-w-[280px] md:max-w-[250px] h-full">
            <p className=" text-[#FFC957] w-fit border border-[#014751] p-2 rounded-sm bg-white">
              <GiArcheryTarget size={32} />
            </p>
            <p className="font-semibold mt-8 mb-4 text-xl text-[#014751]">
              Get Support
            </p>
            <p className="font-light text-sm xl:text-base leading-6 dark:text-muted-foreground">
              Need assistance? Feel free to connect with our dedicated support
              team for prompt help.
            </p>
          </div>
          <div className="bg-[#F2F6F6] dark:hover:bg-muted border border-slate-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-6 px-3.5 lg:p-6 rounded-lg max-w-[280px] md:max-w-[250px] h-full">
            <p className=" text-[#FFC957] w-fit border border-[#014751] p-2 rounded-sm bg-white">
              <TbSitemap size={32} />
            </p>
            <p className="font-semibold mt-8 mb-4 text-xl text-[#014751]">
              Ask an Expert
            </p>
            <p className="font-light text-sm xl:text-base leading-6 dark:text-muted-foreground">
              Our expert support team is always ready to assist you with
              personalized solutions to address your needs efficiently.
            </p>
          </div>
        </div>
      </section>
      <section className="md:border-b border-accent mt-20 rounded-md">
        <TawkChat />
      </section>
    </main>
  );
}
