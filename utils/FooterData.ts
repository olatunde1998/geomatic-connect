import { RiFacebookCircleFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

//Footer data
export const footerData = {
  quickLinksData: {
    name: "Quick Links",
    quickLinks: [
      { id: 1, name: "About", href: "about-id" },
      { id: 2, name: "Contact Us", href: "contactUs-id" },
      { id: 3, name: "Testimonial", href: "testimonial-id" },
      { id: 4, name: "Blog", href: "/blog" },
    ],
  },
  servicesData: {
    name: "Services",
    services: [
      { id: 1, name: "Faq", href: "faq-id" },
      { id: 2, name: "Our Services", href: "whoWeAre-id" },
      { id: 3, name: "Pricing", href: "pricing-id" },
      { id: 4, name: "Career Paths", href: "#" },
    ],
  },
  socialMediaData: {
    name: "Social Media",
    socialMedia: [
      { id: 1, name: "Github", href: "#", iconUrl: BsGithub },
      { id: 2, name: "X", href: "#", iconUrl: FaTwitter },
      { id: 3, name: "LinkedIn", href: "#", iconUrl: FaLinkedinIn },
      { id: 4, name: "Facebook", href: "#", iconUrl: RiFacebookCircleFill },
      { id: 5, name: "Youtube", href: "#", iconUrl: BsYoutube },
    ],
  },
};
