"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { AcceptPaymentRequest } from "@/app/services/payment.request";
import { GetUserByIdRequest } from "@/app/services/request.request";

interface PricingProps {
  token?: String;
  userId?: String;
  setSelectedBillingCycleTab?: any;
  selectedBillingCycleTab?: any;
}

export default function Pricing({ token, userId }: PricingProps) {
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBillingCycleTab, setSelectedBillingCycleTab] =
    useState("Monthly");
  const [isLoading, setIsLoading] = useState(null);
  const handleButtonClick = (planMethod: any) => {
    setIsLoading(planMethod);
  };

  const { data: userData } = useQuery({
    queryKey: ["getUserByIdApi"],
    queryFn: () => GetUserByIdRequest(userId, token),
  });

  const monthlyPlans = [
    {
      planMethod: "Basic",
      amount: 1500,
      color: "#12B76A",
      paymentPlanId: 129893,
    },
    {
      planMethod: "Growth",
      amount: 1999,
      color: "#F59E0B",
      popular: true,
      paymentPlanId: 129903,
    },
    {
      planMethod: "Scale",
      amount: 2999,
      color: "#AA0BF5",
      paymentPlanId: 129902,
    },
  ];

  const yearlyPlans = [
    {
      planMethod: "Basic",
      amount: 10000,
      color: "#12B76A",
      paymentPlanId: 129899,
    },
    {
      planMethod: "Growth",
      amount: 15000,
      color: "#F59E0B",
      popular: true,
      paymentPlanId: 129900,
    },
    {
      planMethod: "Scale",
      amount: 20000,
      color: "#AA0BF5",
      paymentPlanId: 129901,
    },
  ];

  const plans =
    selectedBillingCycleTab === "Monthly" ? monthlyPlans : yearlyPlans;
  const billingCycle = selectedBillingCycleTab;

  // Payment Handler Logic
  const handleAcceptPayment = async (amount: Number) => {
    setIsProcessing(true);
    const body = {
      email: userData?.data?.email,
      amount,
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

  return (
    <>
      <section>
        {/* ==== Headings and Tab ===== */}
        <div className="flex justify-between items-center">
          <p className="text-sm">Your Current Plan:</p>
          <div className="flex items-center gap-5">
            <div className="border-[1.3px] border-slate-200 flex justify-between items-center text-xs md:text-sm p-1 rounded-3xl w-[200px]">
              <p
                onClick={() => setSelectedBillingCycleTab("Monthly")}
                className={`${
                  selectedBillingCycleTab === "Monthly"
                    ? "text-[#FFFF] bg-green-500"
                    : "text-slate-300"
                } py-1.5 font-medium rounded-3xl text-center w-1/2 cursor-pointer`}
              >
                Monthly
              </p>
              <p
                onClick={() => setSelectedBillingCycleTab("Yearly")}
                className={`${
                  selectedBillingCycleTab === "Yearly"
                    ? "text-[#FFFF] bg-green-500"
                    : "text-slate-300"
                }  py-1.5 font-medium rounded-3xl text-center w-1/2 cursor-pointer`}
              >
                Yearly
              </p>
            </div>
          </div>
        </div>

        {/*=== Pricing Cards === */}
        <div className="md:flex lg:justify-end mt-6 text-xs md:text-sm">
          {selectedBillingCycleTab && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3"
            >
              {plans.map(
                ({ planMethod, amount, color, popular, paymentPlanId }) => (
                  <div
                    key={planMethod}
                    style={{ borderTopColor: color }}
                    className={`border-t-[1.3px] rounded-lg w-full md:w-[230px] p-3`}
                  >
                    <p
                      style={{ background: popular ? color : "#575D72" }}
                      className={`
                      ${
                        popular ? "visible" : "invisible"
                      } text-[#FFFFFF] py-2 px-4 w-fit  rounded-3xl ml-auto text-xs`}
                    >
                      Most Popular
                    </p>
                    <p className="font-bold text-lg text-[#575D72]">
                      {planMethod}
                    </p>
                    <div className="flex gap-2 items-baseline my-8 text-[#575D72]">
                      <p className="font-bold text-lg md:text-2xl">₦{amount}</p>
                      <p className="text-sm md:text-sm text-[#6C748B] whitespace-nowrap">
                        /{billingCycle.toLowerCase()}
                      </p>
                    </div>
                    <p
                      onClick={() => {
                        handleButtonClick(planMethod);
                        handleAcceptPayment(amount);
                      }}
                      className="text-[#FFFFFF] p-3 rounded-md text-center cursor-pointer bg-green-500"
                    >
                      {isLoading === planMethod ? (
                        "Loading..."
                      ) : (
                        <div>Subscribe</div>
                      )}
                    </p>
                  </div>
                )
              )}
            </motion.div>
          )}
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
