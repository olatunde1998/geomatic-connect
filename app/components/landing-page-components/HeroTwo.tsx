import Image from "next/image";
import HeroImage from "@/public/images/prototype.png";
import HeroImageTwo from "@/public/images/hero-refine.png";
import FssLogo from "@/public/images/fss-logo.png";
import NISLogo from "@/public/images/nis-logo.png";
import GeosysLogo from "@/public/images/geosys-logo.png";
import GeoinfotechLogo from "@/public/images/geoinfotech.gif";
import Link from "next/link";

export default function HeroTwo() {
  return (
    <section className="">
      <section className="leading-normal pt-16">
        <div className="text-center px-4">
          <h2 className="text-[40px] md:text-[42px] lg:text-[58px] font-bold text-[#000000]">
            Learn in-demand skills <br />{" "}
            <span className="text-[#F51767] inline-block animate-fadeSpring1">
              Get hired.
            </span>
            <span className="text-[#F51767] inline-block animate-fadeSpring2">
              Get promoted.
            </span>
            <span className="text-[#F51767] inline-block animate-fadeSpring3">
              Be your own boss.
            </span>
            <span className="text-[#F51767] inline-block animate-fadeSpring4">
              Fulfill your dreams.
            </span>
          </h2>

          <p className="text-base md:text-lg leading-8  my-6 md:max-w-[500px] lg:max-w-[700px] mx-auto text-[#373F49]">
            The most efficient and supportive way for you to get connected,
            learn in-demand skills and advance your career.
          </p>
        </div>
        <div className="md:flex justify-center gap-4">
          <Link
            href="/signup"
            className="bg-[#F51767] hover:bg-[#BB2058] text-white font-bold uppercase w-[250px] p-5 cursor-pointer mx-auto md:mx-0 rounded-full text-center flex items-center justify-center"
          >
            Create free account
          </Link>
          <p className="uppercase w-[250px] p-4 mx-auto cursor-pointer text-[#F51767] font-bold md:mx-0 rounded-full text-center flex items-center justify-center">
            Or take our career quiz
          </p>
        </div>
      </section>

      {/* ===Hero Image section === */}
      <div className="lg:mt-10">
        <div className="  relative w-[80%] mx-auto mt-10 h-[250px] md:w-[90%] md:h-[450px] lg:w-[80%] lg:h-[610.44px] xl:h-[710px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
          <Image
            src={HeroImage}
            alt="hero main picx"
            fill
            priority
            className="rounded-lg border-[0.5px] border-slate-300"
          />
        </div>
      </div>

      {/* ===Hiring Companies=== */}

      <div className="mt-10 md:mt-20 mb-10">
        <section>
          <div className="px-[20px] py-[10px] text-center max-w-[1500px] mx-auto lg:py-[10px]">
            <h2 className="text-2xl text-left leading-10 font-bold mb-[40px] md:text-[32px] lg:text-4xl lg:text-center lg:max-w-[700px] xl:max-w-[850px] font-sans mx-auto md:leading-10 lg:leading-[52px]">
              Our students are getting hired by top companies. We can help you
              too.
            </h2>
            <div className="h-[80px] mx-auto md:h-[80px]">
              <div className="w-full relative overflow-hidden pt-14">
                <div className="relative flex items-center justify-center animate md:relative left-0 ">
                  {/* ====part one==== */}
                  <div className="w-[150%] flex items-center justify-around">
                    <div className=" w-[100px] h-[100px] mx-6">
                      <Image
                        src={FssLogo}
                        width={70}
                        height={70}
                        priority
                        alt="NIPOST brand logo"
                        className="w-auto h-auto"
                      />
                    </div>

                    <div className="w-[100px] h-[100px] mx-6">
                      <Image
                        src={NISLogo}
                        width={70}
                        height={70}
                        priority
                        alt="Ondo State brand logo"
                        className="w-auto h-auto"
                      />
                    </div>
                    <div className=" w-[100px] h-[100px] mx-6">
                      <Image
                        src={GeosysLogo}
                        width={70}
                        height={70}
                        priority
                        alt="Federal Capital Teritary Abuja brand logo"
                        className="w-auto h-auto"
                      />
                    </div>
                    <div className="w-[100px] h-[100px]  mx-6">
                      <Image
                        src={NISLogo}
                        width={70}
                        height={70}
                        priority
                        alt="Ondo State brand logo"
                        className="w-auto h-auto"
                      />
                    </div>
                    <div className="w-[100px] h-[100px] mx-6">
                      <Image
                        src={GeoinfotechLogo}
                        width={70}
                        height={70}
                        priority
                        alt="Ondo State brand logo"
                        className="w-auto h-auto"
                      />
                    </div>
                  </div>
                  {/* =====part two==== */}
                  <div className="w-[150%] flex items-center justify-around">
                    <div className=" w-[100px] h-[100px] flex items-center justify-center mx-6">
                      <Image
                        src={FssLogo}
                        width={70}
                        height={70}
                        priority
                        alt="NIPOST brand logo"
                        className="w-auto h-auto"
                      />
                    </div>
                    <div className="w-[100px] h-[100px]  mx-6">
                      <Image
                        src={NISLogo}
                        width={70}
                        height={70}
                        priority
                        alt="Ondo State brand logo"
                        className="w-auto h-auto"
                      />
                    </div>
                    <div className="w-[100px] h-[100px] flex items-center justify-center mx-6">
                      <Image
                        src={GeosysLogo}
                        width={70}
                        height={70}
                        priority
                        alt="Federal Capital Teritary Abuja brand logo"
                        className="w-auto h-auto"
                      />
                    </div>
                    <div className="w-[100px] h-[100px]  mx-6">
                      <Image
                        src={NISLogo}
                        width={70}
                        height={70}
                        priority
                        alt="Ondo State brand logo"
                        className="w-auto h-auto"
                      />
                    </div>
                    <div className=" w-[100px] h-[100px]  mx-6">
                      <Image
                        src={GeoinfotechLogo}
                        width={70}
                        height={70}
                        priority
                        alt="Ondo State brand logo"
                        className="w-auto h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
