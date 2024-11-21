"use client";
import { useEffect, useState } from "react";
import CompanyCard from "@/app/components/cards/CompanyCard";
import { specializationData, stateData } from "@/utils/FilterData";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import { GetUserByIdRequest } from "@/app/services/request.request";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AcceptPaymentRequest,
  VerifyPaymentRequest,
} from "@/app/services/payment.request";

interface StudentHomeProps {
  session: any;
}

export default function StudentHome({ session }: StudentHomeProps) {
  const userId = session?.user?._id;
  const token = session.user.token;
  const [showSendRequest, setShowSendRequest] = useState<boolean>(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["getUserByIdApi"],
    queryFn: () => GetUserByIdRequest(userId, token),
  });

  // Send Approved Request to Admin Logic
  const handleAcceptPayment = async () => {
    setIsProcessing(true);
    const body = {
      email: userData?.data?.email,
      amount: 300000,
      metadata: { subscriptionPlan: "Freemium" },
    };

    try {
      const response = await AcceptPaymentRequest(body);
      if (response?.data?.authorization_url) {
        localStorage.setItem("paymentReference", response.data.reference);
        localStorage.setItem("subscriptionPlan", "Freemium");
        window.location.href = response?.data?.authorization_url;
      } else {
        return;
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // verifyPaymentAfterRedirect when page reloads or on mount
  const verifyPaymentAfterRedirect = async () => {
    const storedReference = localStorage.getItem("paymentReference");
    const subscriptionPlan = localStorage.getItem("subscriptionPlan");

    if (storedReference && subscriptionPlan) {
      try {
        const verifyResponse = await VerifyPaymentRequest(
          storedReference,
          subscriptionPlan
        );
        console.log(verifyResponse.message, "this is verify response");

        // Clear stored data
        localStorage.removeItem("paymentReference");
        localStorage.removeItem("subscriptionPlan");
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    }
  };

  // verifyPaymentAfterRedirect when page reloads or on mount
  useEffect(() => {
    verifyPaymentAfterRedirect();
  }, []);

  return (
    <>
      {/* ====== Filter & Search Goes here ====== */}
      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] lg:flex p-4  lg:my-20 xl:my-10">
        <div className="md:flex items-center">
          <p>Filter By:</p>
          <div className="md:flex space-y-2 mt-3 md:mt-0 md:space-y-0 md:ml-3 md:space-x-3">
            {/* === DropDown Input === */}
            <div className="w-[226px]">
              <ReactSelect
                options={specializationData}
                placeholder="Specialization *"
                onChange={(option: any) => {
                  setSelectedSpecialization(option?.value || "");
                }}
              />
            </div>
            <div className="w-[153px]">
              <ReactSelect
                options={stateData}
                placeholder="State"
                onChange={(option: any) => {
                  setSelectedState(option?.value || "");
                }}
              />
            </div>
          </div>
        </div>

        {/* <p
          onClick={() => handleAcceptPayment()}
          className={`opacity-40 border border-[#33A852] p-3 w-[230px] text-center text-[#33A852] cursor-pointer`}
        >
          {isProcessing ? "Processing.." : "Subscribe"}
        </p> */}

        {/* <div>
          <p
            onClick={() => {
              if (selectedCompanyId) {
                setShowSendRequest(true);
              } else {
                toast.warning("Select a company to proceed");
              }
            }}
            className={`${
              !selectedCompanyId
                ? "cursor-not-allowed opacity-40"
                : "cursor-pointer"
            } border border-[#33A852] p-3 w-[230px] text-center text-[#33A852]`}
          >
            Make a Request
          </p>
        </div> */}
      </div>

      {/* ====CARD GOES HERE ===== */}
      <div>
        <CompanyCard
          token={token}
          setSelectedCompanyId={setSelectedCompanyId}
          selectedCompanyId={selectedCompanyId}
          showSendRequest={showSendRequest}
          setShowSendRequest={setShowSendRequest}
          userData={userData}
        />
      </div>
      <ToastContainer />
    </>
  );
}
