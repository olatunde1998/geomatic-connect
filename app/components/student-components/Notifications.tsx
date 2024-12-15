"use client";
// import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { GetUserByIdRequest } from "@/app/services/request.request";
import { Clock } from "lucide-react";
import { X } from "lucide-react";

interface NotificationProps {
  token?: String;
  userId?: String;
  setSelectedBillingCycleTab?: any;
  selectedBillingCycleTab?: any;
}

export default function Notification({ token, userId }: NotificationProps) {
//   const { data: userData } = useQuery({
//     queryKey: ["getUserByIdApi"],
//     queryFn: () => GetUserByIdRequest(userId, token),
//   });

  return (
    <>
      <section>
        {/* ==== Headings and Tab ===== */}
        <div className="flex justify-between items-center">
          <p className="text-sm">Your Current Notifications:</p>
        </div>
        <div className="md:flex justify-between md:gap-4 mt-4 border-b pb-8">
          <div className="flex gap-4">
            <div className="cursor-pointer">
              <X />
            </div>
            <div>
              <p className="bg-[#33A852] text-[#FFFFFF] rounded-lg w-fit py-1 px-2 text-sm">
                Joined New User
              </p>
              <p className="font-semibold text-base">Lorem, ipsum dolor sit </p>
              <p className="text-sm max-w-[550px] leading-2 font-light mt-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
                eaque aliquam explicabo animi dolorum accusantium inventore
              </p>
            </div>
          </div>
          <div className="text-slate-300 text-sm flex justify-end mt-3 md:mt-0 md:justify-center gap-2 md:whitespace-nowrap">
            <p>
              <Clock size={16} className="mt-0.5" />
            </p>
            <p>24 Nov 2019 at 9:30am</p>
          </div>
        </div>
        <div className="md:flex justify-between md:gap-4 mt-4 border-b pb-8">
          <div className="flex gap-4">
            <div className="cursor-pointer">
              <X />
            </div>
            <div>
              <p className="bg-[#D92D20] text-[#FFFFFF] rounded-lg w-fit py-1 px-2 text-sm">
                Joined New User
              </p>
              <p className="font-semibold text-base">Lorem, ipsum dolor sit </p>
              <p className="text-sm max-w-[550px] leading-2 font-light mt-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
                eaque aliquam explicabo animi dolorum accusantium inventore
              </p>
            </div>
          </div>
          <div className="text-slate-300 text-sm flex justify-end mt-3 md:mt-0 md:justify-center gap-2 md:whitespace-nowrap">
            <p>
              <Clock size={16} className="mt-0.5" />
            </p>
            <p>24 Nov 2020 at 9:30am</p>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
