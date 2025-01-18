import Image from "next/image";
import { MdStar } from "react-icons/md";
import Testimonial from "@/public/images/testimonial.jpg";

interface TestimonialCardProps {
  imageUrl: any;
  fullName: string;
  location: string;
}

export default function TestimonialCard({
  fullName,
  imageUrl,
  location,
}: TestimonialCardProps) {
  return (
    <>
      <div>
        <div className="w-[280px] md:w-[400px] lg:w-[430px] px-6 py-8 md:py-12 md:px-12 border border-slate-300 bg-[#F2F6F6] rounded-xl">
          <div className="flex gap-3 ">
            <div>
              <Image
                src={imageUrl}
                alt="profile image"
                width={100}
                height={100}
                priority
                className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] object-cover rounded-full"
              />
            </div>
            <div className="mt-2">
              <p className="font-extrabold text-base md:text-xl">
                {fullName}
              </p>
              <p className="text-sm md:text-base text-gray-700 font-light mt-1">
                {location}
              </p>

              <div className="mt-4 flex gap-0.5">
                <MdStar color="#F1C644" size={20} />
                <MdStar color="#F1C644" size={20} />
                <MdStar color="#F1C644" size={20} />
                <MdStar color="#F1C644" size={20} />
                <MdStar color="#F1C644" size={20} />
              </div>
            </div>
          </div>

          <p className="mt-10 text-base md:text-lg text-gray-500 font-light leading-[28px]">
            “The services are totally great! they offered many options for me to
            stay that suit my budget. Also, the connection is outstanding.”
          </p>
        </div>
      </div>
    </>
  );
}
