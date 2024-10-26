import Image from "next/image";
import { MdStar } from "react-icons/md";
import Testimonial from "@/public/images/testimonial.jpg";

interface TestimonialCardProps {
  //   token: any;
}

export default function TestimonialCard() {
  return (
    <>
      <div>
        <div className="w-[280px] md:w-[430px] px-6 py-8 md:py-16 md:px-12 border border-slate-300 bg-white rounded-xl">
          <div className="flex gap-3 ">
            <div>
              <Image
                src={Testimonial}
                alt="profile image"
                width={100}
                height={100}
                priority
                className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-full"
              />
            </div>
            <div className="mt-2">
              <p className="font-extrabold text-base md:text-xl">
                Rodriguez Millo
              </p>
              <p className="text-sm md:text-base text-gray-700 font-light mt-1">
                Puorto Lobos, Mexico
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

          <p className="mt-10 text-base md:text-lg text-gray-700 font-light leading-[28px]">
            “The services are totally great! they offered many options for me to
            stay that suit my budget. Also, the room is well-furnished.”
          </p>
        </div>
      </div>
    </>
  );
}
