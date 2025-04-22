import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import SuccessMessage from "./SuccessMessage";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import {
  institutionData,
  purposeOfRequestData,
  trackPeriodData,
} from "@/utils/FilterData";
import { StudentSendRequestToAdmin } from "@/app/services/request.request";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({ resolver: yupResolver(schema) });

  const institutionNameValue = watch("institutionName");

  // Default values when userData is available
  useEffect(() => {
    if (userData) {
      setValue("institutionName", userData?.data?.institutionName);
    }
  }, [userData, setValue]);

  // Send Request submission Logic
  const onSubmitHandler = async (data: any) => {
    if (!userData?.data?.institutionName) {
      toast.error(
        "Hold on! You need to complete your profile before you can make a request."
      );
      setTimeout(async () => {
        if (!userData?.data?.institutionName) {
          router.push("/student-dashboard/settings");
        }
      }, 5000);
      return;
    }
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
              <p className="text-xl text-[#33A852]">Make a Request</p>
              <button
                onClick={() => setShowSendRequest(false)}
                className="rounded-md gap-6 hover:bg-slate-100 p-2 cursor-pointer"
              >
                <X color="#33A852" />
              </button>
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
              {/* === Institution Dropdown Input === */}
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
                      : ""
                  } ${!!userData?.data?.institutionName ? "cursor-not-allowed" : "cursor-pointer"} flex flex-col w-full`}
                >
                  <ReactSelect
                    options={institutionData}
                    placeholder="Institution name"
                    value={institutionData.find(
                      (option) => option.value === institutionNameValue
                    )}
                    onChange={(option: any) => {
                      setValue("institutionName", option?.value || "");
                      trigger("institutionName"); // Trigger validation
                    }}
                    isDisabled={!!userData?.data?.institutionName}
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
                  Cover Letter
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
