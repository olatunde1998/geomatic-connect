import { RiFacebookCircleFill } from "react-icons/ri";
import { BsGithub } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import Image from "next/image";
import GeomaticLogo from "@/public/images/geomatic-logo-white.png";

export const Footer = () => {
  const today: Date = new Date();
  const currentYear: number = today.getFullYear();
  return (
    <div className="px-6 text-white py-10">
      <section className="mb-2 md:flex justify-between pb-10 md:mb-20">
        <div className="hidden md:block w-[120px] md:w-[150px] h-[100px]">
          <Image
            src={GeomaticLogo}
            alt="Geomatic brand logo"
            width={200}
            height={150}
            priority
            className="object-cover md:h-[70px] md:w-[150px]"
          />
        </div>
        <div className="text-[20px] md:flex md:justify-end md:gap-32 md:w-2/3 lg:w-1/2">
          <div>
            <p className="font-bold mb-8"> Quick Links</p>
            <ul className="cursor-pointer space-y-4 font-light text-base lg:text-lg">
              <li>About </li>
              <li>Contact Us </li>
              <li>Blogs </li>
              <li>Testimonial</li>
              <li>Community </li>
            </ul>
          </div>
          <div className="my-10 md:my-0">
            <p className="font-bold mb-8"> Services</p>
            <ul className="cursor-pointer space-y-4 font-light text-base lg:text-lg">
              <li>Faq </li>
              <li>Our Services</li>
              <li>Pricing </li>
              <li>Career Paths</li>
              <li>Free Resources</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="cursor-pointer lg:flex justify-between items-center border-t-[.23px] border-white pt-8">
          <div className="flex">
            <span className="w-[40px] h-[40px] rounded-full border-2 border-white flex items-center justify-center  md:w-[40px] md:h-[40px]">
              <BsGithub size={20} />
            </span>
            <span className="w-[40px] h-[40px]  rounded-full border-2 border-white flex items-center justify-center mx-2">
              <FaTwitter size={20} />
            </span>
            <span className="w-[40px] h-[40px]  rounded-full border-2 border-white flex items-center justify-center">
              <FaLinkedinIn size={20} />
            </span>
            <span className="w-[40px] h-[40px]  rounded-full border-2 border-white flex items-center justify-center mx-2">
              <RiFacebookCircleFill size={20} />
            </span>
            <span className="w-[40px] h-[40px]  rounded-full border-2 border-white flex items-center justify-center mx-2">
              <BsYoutube size={20} />
            </span>
          </div>
          <div className="mt-6 lg:flex gap-2">
            <div className="flex gap-4">
              <p>Privacy</p>
              <p>Terms</p>
              <p>Cookies</p>
            </div>
            <p className="font-bold mt-4 lg:ml-8 lg:mt-0">
              Copyright © {currentYear}, geodevcodes Inc.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
