import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import SuccessMessage from "../company-components/SuccessMessage";
import { AdminSendRequestToCompany } from "@/app/services/request.request";

interface RequestDetailsProps {
  token?: any;
  setShowSendRequest?: any;
  notificationsData?: any;
  notificationID?: any;
}

export default function RequestDetails({
  token,
  setShowSendRequest,
  notificationsData,
  notificationID,
}: RequestDetailsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any[]>([]);
  const queryClient = useQueryClient();

  const notificationArray = notificationsData || [];
  const notification = notificationArray?.find(
    (notification: any) => notification?._id === notificationID
  );

  console.log(notification, "==== this is single notification =====");

  // Forward Request to Company submission Logic
  const handleForwardRequest = async () => {
    setIsForwarding(true);
    const body = {
      requestId: notification?._id,
    };
    try {
      const response = await AdminSendRequestToCompany(body, token);
      setResponseData(response);
      setShowSendRequest(false);
      await queryClient.invalidateQueries({
        queryKey: ["getNotificationsApi"],
      });
      toast.success("Request Forwarded Successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setIsForwarding(false);
    }
  };

  return (
    <div>
      {showSuccessMessage === false ? (
        <div className="bg-[#FFFFFF] w-full  md:pt-10 md:pb-20 p-10">
          <div>
            <div className="mb-8 flex items-center justify-between border-b border-slate-300 pb-8">
              <p className="text-xl">Forward a Request</p>
              <X onClick={() => setShowSendRequest(false)} />
            </div>
          </div>

          {/* ===FORM SECTION === */}
          <section className="items-start space-y-6">
            {/* === Full Name === */}
            <div>
              <div className="flex flex-col w-full pt-2 px-4 pb-1 bg-gray-100 border-[1.3px] border-slate-300">
                <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                  {notification?.studentId?.fullName}
                </p>
              </div>
            </div>
            {/* === Email Address === */}
            <div>
              <div className="flex flex-col w-full pt-2 px-4 pb-1 bg-gray-100 border-[1.3px] border-slate-300">
                <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                  {notification?.email}
                </p>
              </div>
            </div>

            {/* === Institution Name === */}
            <div>
              <div className="flex flex-col w-full pt-2 px-4 pb-1 bg-gray-100 border-[1.3px] border-slate-300">
                <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                  {notification?.institutionName}
                </p>
              </div>
            </div>

            {/* === Request Track (time) === */}
            <div>
              <div className="flex flex-col w-full pt-2 px-4 pb-1 bg-gray-100 border-[1.3px] border-slate-300">
                <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                  {notification?.trackPeriod}
                </p>
              </div>
            </div>
            {/* === (Purpose of Request) Training   === */}
            <div>
              <div className="flex flex-col w-full pt-2 px-4 pb-1 bg-gray-100 border-[1.3px] border-slate-300">
                <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                  {notification?.requestPurpose}
                </p>
              </div>
            </div>

            {/* === Description  === */}
            <div>
              <div className="flex flex-col w-full pt-2 px-4 pb-1 border-[1.3px] border-slate-300">
                <textarea
                  className="py-2 focus:outline-none placeholder:text-sm cursor-text custom-placeholder bg-transparent text-black"
                  placeholder="Description"
                  rows={8}
                  cols={60}
                  value={notification?.backgroundHistory}
                />
              </div>
            </div>
          </section>

          {/* === Submit Button === */}
          <div className="flex justify-between gap-6">
            <button
              disabled={isForwarding}
              onClick={() => handleForwardRequest()}
              className="w-full mt-10  px-3.5 py-4 font-light text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]  cursor-pointer"
            >
              <span className="text-base">
                {isForwarding ? "Forwarding...." : "Forward Request"}
              </span>
            </button>
            <button
              disabled={isSaving}
              className="w-full mt-10  px-3.5 py-4 font-light text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
            >
              <span className="text-base">
                {isSaving ? "Approving...." : "Approve Request"}
              </span>
            </button>
            <button
              disabled={isSaving}
              className="w-full mt-10  px-3.5 py-4 font-light text-white shadow-sm bg-gradient-to-r from-[#D92D20] to-[#F97316]"
            >
              <span className="text-base">
                {isSaving ? "Declining...." : "Decline Request"}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <SuccessMessage
          setShowSendRequest={setShowSendRequest}
          responseData={responseData}
        />
      )}
    </div>
  );
}
