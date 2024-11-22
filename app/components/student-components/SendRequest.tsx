import { X } from "lucide-react";
// import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import SuccessMessage from "./SuccessMessage";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import { purposeOfRequestData, trackPeriodData } from "@/utils/FilterData";
import { StudentSendRequestToAdmin } from "@/app/services/request.request";

interface SendRequestProps {
  setShowSendRequest?: any;
  userData: any;
  companyId?: any;
  token?: any;
  selectedCompanyId?: any;
}

// Validation Schema
const schema = yup.object().shape({
  trackPeriod: yup
    .string()
    .required("Track Period is required")
    .min(3, "Track Period must be greater than 3 letters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email format"),
  institutionName: yup
    .string()
    .required("Institution is required")
    .min(3, " must be greater than 10 letters"),
  requestPurpose: yup
    .string()
    .required("Request Purpose is required")
    .min(3, " must be greater than 10 letters"),
  backgroundHistory: yup
    .string()
    .required("Description is required")
    .min(3, " must be greater than 10 letters"),
});

export default function SendRequest({
  setShowSendRequest,
  userData,
  companyId,
  token,
  selectedCompanyId,
}: SendRequestProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any[]>([]);

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({ resolver: yupResolver(schema) });

  // Send Request submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    const body = {
      studentId: userData?.data?._id,
      companyId: companyId ? companyId : selectedCompanyId,
      email: data?.email,
      institutionName: data?.institutionName,
      trackPeriod: data?.trackPeriod,
      requestPurpose: data?.requestPurpose,
      backgroundHistory: data?.backgroundHistory,
    };
    try {
      const response = await StudentSendRequestToAdmin(body, token);
      setResponseData(response);
      toast.success(response?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setShowSendRequest(false);
      }, 5000);
    }
  };

  return (
    <div>
      {showSuccessMessage === false ? (
        <div className="w-full pt-1 md:pt-10 md:pb-20">
          <div>
            <div className="text-primary mb-8  flex items-center justify-between border-b border-slate-300 pb-8">
              <p className="text-xl">Make a Request</p>
              <X color="#33A852" onClick={() => setShowSendRequest(false)} />
            </div>
          </div>

          {/* ===FORM SECTION === */}
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <section className="items-start space-y-6">
              {/* === Email Input === */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm text-gray-500 font-normal"
                >
                  Email Address
                </label>
                <div
                  className={`${
                    errors.email
                      ? "border-[1.3px] border-red-500"
                      : "border-[1.3px] border-slate-300"
                  } flex flex-col w-full pt-2 px-4 pb-1 bg-gray-100`}
                >
                  <input
                    className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black cursor-not-allowed"
                    type="email"
                    readOnly={true}
                    placeholder="Email Address"
                    {...register("email")}
                    maxLength={40}
                    value={userData?.data?.email}
                  />
                </div>
              </div>
              {/* === Institution Input === */}
              <div>
                <label
                  htmlFor="institutionName"
                  className="text-sm text-gray-500 font-normal"
                >
                  Institution
                </label>
                <div
                  className={`${
                    errors.institutionName
                      ? "border-[1.3px] border-red-500"
                      : "border-[1.3px] border-slate-300"
                  } flex flex-col w-full pt-2 px-4 pb-1 bg-gray-100`}
                >
                  <input
                    className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black cursor-not-allowed"
                    type="text"
                    readOnly={true}
                    placeholder="Institution name"
                    {...register("institutionName")}
                    maxLength={40}
                    value={userData?.data?.institutionName}
                  />
                </div>
              </div>
              {/* === Request Track (time) === */}
              <div>
                <label
                  htmlFor="trackPeriod"
                  className="text-sm text-gray-500 font-normal"
                >
                  Tracking Period
                </label>
                <div
                  className={`${
                    errors.trackPeriod ? "border-[1.3px] border-red-500" : ""
                  } flex flex-col w-full`}
                >
                  <ReactSelect
                    options={trackPeriodData}
                    placeholder="Track Period"
                    onChange={(option: any) => {
                      setValue("trackPeriod", option?.value || "");
                      trigger("trackPeriod"); // Trigger validation
                    }}
                  />
                </div>
              </div>
              {/* === (Purpose of Request) Training Input === */}
              <div>
                <label
                  htmlFor="requestPurpose"
                  className="text-sm text-gray-500 font-normal"
                >
                  Purpose of Request
                </label>
                <div
                  className={`${
                    errors.requestPurpose ? "border-[1.3px] border-red-500" : ""
                  } flex flex-col w-full`}
                >
                  <ReactSelect
                    options={purposeOfRequestData}
                    placeholder="Purpose of Request"
                    onChange={(option: any) => {
                      setValue("requestPurpose", option?.value || "");
                      trigger("requestPurpose"); // Trigger validation
                    }}
                  />
                </div>
              </div>
              {/* === Description Input === */}
              <div>
                <label
                  htmlFor="backgroundHistory"
                  className="text-sm text-gray-500 font-normal"
                >
                 Background history
                </label>
                <div
                  className={`${
                    errors.backgroundHistory
                      ? "border-[1.3px] border-red-500"
                      : "border-[1.3px] border-slate-300"
                  } flex flex-col w-full pt-2 px-4 pb-1`}
                >
                  <textarea
                    className="py-2 focus:outline-none placeholder:text-sm cursor-text custom-placeholder bg-transparent text-black"
                    placeholder="Description...."
                    {...register("backgroundHistory")}
                    rows={4}
                    cols={40}
                  />
                </div>
              </div>
            </section>

            {/* === Submit Button === */}
            <button
              disabled={isSaving}
              className="w-full mt-10  px-3.5 py-4 font-light text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
            >
              <span className="text-base">
                {isSaving ? "Submitting...." : "Submit Request"}
              </span>
            </button>
          </form>
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
