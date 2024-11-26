import { CircleCheckBig, Rocket, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SubscribeModalProps {
  setShowSubscribe: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubscribeModal({
  setShowSubscribe,
}: SubscribeModalProps) {
  return (
    <div>
      <div className="grid grid-cols-2 rounded-xl">
        {/* ====Image goes here ===== */}
        <div>
          <div>
            <Image
              src="/images/dark-skinned-woman.jpg"
              alt="Promo image"
              width={400}
              height={400}
              priority
              className="w-full h-full rounded-l-lg"
            />
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#49AD51] to-[#B1D045] p-3 flex flex-col text-[#FFFFFF] items-center rounded-r-lg gap-3 pb-16">
          <p
            onClick={() => setShowSubscribe(false)}
            className="bg-[#FFFFFF] rounded-full w-10 h-10 flex items-center justify-center ml-auto mr-2 text-[#2a2929] cursor-pointer"
          >
            <X />
          </p>
          <p className="text-4xl font-semibold">Get 40% Off</p>
          <p className="text-xl font-medium flex items-center gap-2">
            Lifetime Access! <Rocket />
          </p>
          <p className="border-[1.8px] border-[#FFFFFF] rounded-md p-3 text-base max-w-[300px] text-center">
            Unlock all current and future coding courses with one payment.
          </p>
          <p className="text-base">Limited-time pre-launch offer</p>
          <p className="font-semibold text-lg">save $400!</p>
          <div className="h-[0.8px] w-[48%] bg-[#FFFFFF]" />
          <p> No fees. Just lifetime access.</p>
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-3 w-[80%] rounded-lg mx-10 placeholder:text-sm text-gray-500 text-sm"
          />
          <Link
            onClick={() => setShowSubscribe(false)}
            href="/student-dashboard/pricing"
            className="text-green-400 w-[80%] rounded-lg font-semibold bg-[#FFFFFF] p-3 text-center"
          >
            Claim My 40% Off
          </Link>
        </div>
      </div>
    </div>
  );
}
