import { Check } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  headings: string;
  subHeadings: string;
  amount: number;
  billingCycle: string;
  benefit: string[];
  buttonContent: string;
  popular?: boolean;
}

export default function PricingCard({
  headings,
  subHeadings,
  amount,
  benefit,
  buttonContent,
  billingCycle,
  popular,
}: PricingCardProps) {
  return (
    <>
      <div>
        <div
          className={`${
            popular
              ? "bg-[#155464] dark:bg-slate-950 text-white"
              : "bg-[#FFFFFF] dark:bg-muted-foreground"
          } md:w-[300px] xl:w-[360px] px-6 py-8 md:py-8 md:pb-4 md:px-8 border border-slate-300 dark:border-muted rounded-xl text-[#1C3C41]`}
        >
          <div>
            <p
              className={`${
                popular ? "text-[#FFFFFF]" : "text-[#1C3C41]"
              } font-bold text-2xl `}
            >
              {headings}
            </p>
            <p
              className={`${
                popular ? "text-[#FFFFFF]" : "text-[#1E1E1E]"
              }  mt-4 font-light`}
            >
              {subHeadings}
            </p>
            <div className="flex gap-2 items-baseline mt-10">
              <p className="font-bold text-3xl md:text-4xl">₦{amount}</p>
              <p
                className={`${
                  popular ? "text-[#FFFFFF]" : "text-[#6C748B]"
                } text-sm md:text-sm  whitespace-nowrap`}
              >
                / {billingCycle}
              </p>
            </div>
          </div>

          <div className="mt-6 py-6 border-t border-slate-300">
            <ul className="space-y-3">
              {benefit?.map((item: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center gap-1.5 text-sm font-medium"
                >
                  <Check color="#6CB92B" /> {item}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className="block border border-slate-300 text-center p-3 rounded-lg mt-8 cursor-pointer"
            >
              {buttonContent}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
