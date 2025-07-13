"use client";
import GeomaticLogo from "@/public/images/Geomatic-Connect-Logo2w.png";
import { footerData } from "@/utils/FooterData";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Footer = () => {
  const router = useRouter();
  const today: Date = new Date();
  const currentYear: number = today.getFullYear();

  const { name: quickLinksTitle, quickLinks } = footerData.quickLinksData;
  const { name: servicesTitle, services } = footerData.servicesData;
  const { socialMedia } = footerData.socialMediaData;

  const handleSmoothScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="px-6 text-white py-10">
      <section className="mb-2 md:flex justify-between pb-10 md:mb-20">
        <div className="w-[130px] md:w-[150px] h-[100px]">
          <Image
            src={GeomaticLogo}
            alt="Geomatic brand logo"
            width={200}
            height={100}
            priority
            quality={100}
            className="w-[130px] h-[46px] -ml-4 md:h-[70px] md:w-[150px] object-cover md:ml-0"
          />
        </div>
        <div className="text-[20px] flex md:justify-end gap-32 md:w-2/3 lg:w-1/2">
          <div>
            <p className="font-bold mb-8">{quickLinksTitle}</p>
            <ul className="cursor-pointer space-y-4 font-light text-base lg:text-lg">
              {quickLinks.map((link) => (
                <li
                  key={link.id}
                  onClick={() =>
                    link.href.startsWith("/") || link.href === "#"
                      ? router.push(link.href)
                      : handleSmoothScroll(link.href)
                  }
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold mb-8">{servicesTitle}</p>
            <ul className="cursor-pointer space-y-4 font-light text-base lg:text-lg">
              {services.map((link) => (
                <li
                  key={link.id}
                  onClick={() =>
                    link.href.startsWith("/") || link.href === "#"
                      ? router.push(link.href)
                      : handleSmoothScroll(link.href)
                  }
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="cursor-pointer lg:flex justify-between items-center border-t-[.23px] border-white dark:border-t-[1.5px] dark:border-muted pt-8">
          <div className="flex gap-2">
            {socialMedia.map((item, index) => (
              <span
                key={index}
                className="w-[40px] h-[40px] rounded-full border-2 border-white  flex items-center justify-center md:w-[40px] md:h-[40px]"
              >
                <item.iconUrl size={20} />
              </span>
            ))}
          </div>
          <div className="mt-6 lg:flex gap-2 dark:text-muted-foreground">
            <div className="flex gap-4">
              <p>Privacy</p>
              <p>Terms</p>
              <p>Cookies</p>
            </div>
            <p className="font-bold mt-4 lg:ml-8 lg:mt-0">
              Copyright © {currentYear}, geomatic connect.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
