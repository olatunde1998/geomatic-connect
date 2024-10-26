import { Check } from "lucide-react";

interface PricingCardProps {
  //   token: any;
}

export default function PricingCard() {
  return (
    <>
      <div>
        <div className="w-[300px] xl:w-[350px] px-6 py-8 md:py-8 md:pb-4 md:px-8 border border-slate-300 bg-white rounded-xl text-[#1C3C41]">
          <div>
            <p className="font-bold text-2xl text-[#1C3C41]">Freemium Pack</p>
            <p className="text-[#1E1E1E] mt-4 font-light">
              This package can be used for free and just join and register on
              this platform
            </p>
            <div className="flex gap-2 items-baseline mt-10">
              <p className="font-bold text-3xl md:text-6xl">$5</p>
              <p className="text-sm md:text-sm text-[#6C748B] whitespace-nowrap">
                / month
              </p>
            </div>
          </div>

          <div className="mt-6 py-6 border-t border-slate-300">
            <ul className="space-y-3">
              <li className="flex items-center gap-1.5 text-sm font-semibold">
                <Check color="#6CB92B" /> 1 Account collaboration
              </li>
              <li className="flex items-center gap-1.5 text-sm font-semibold">
                <Check color="#6CB92B" /> 5 Meeting per week
              </li>
              <li className="flex items-center gap-1.5 text-sm font-semibold">
                <Check color="#6CB92B" /> Duration meeting max. 30 mnt
              </li>
              <li className="flex items-center gap-1.5 text-sm font-semibold">
                <Check color="#6CB92B" /> Save 5 result meeting
              </li>
            </ul>
            <p className="border border-slate-300 text-center p-3 rounded-lg mt-8 cursor-pointer">
              Join Now
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
