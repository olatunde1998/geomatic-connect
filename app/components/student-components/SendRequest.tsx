import { X } from "lucide-react";
// import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import SuccessMessage from "./SuccessMessage";
import { CreateStudentRequest } from "@/app/services/students.request";

interface SendRequestProps {
  setShowSendRequest?: any;
  userEmail: string;
}

// Validation Schema
const schema = yup.object().shape({
  fastTrack: yup
    .string()
    .required("Fast track is required")
    .min(3, "Fast track must be greater than 3 letters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email format"),
  institution: yup
    .string()
    .required("Institution is required")
    .min(3, " must be greater than 10 letters"),
  training: yup
    .string()
    .required("Training is required")
    .min(3, " must be greater than 10 letters"),
  description: yup
    .string()
    .required("Description is required")
    .min(3, " must be greater than 10 letters"),
});

export default function SendRequest({
  setShowSendRequest,
  userEmail,
}: SendRequestProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any[]>([]);

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Send Request submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    const body = {
      track: data?.fastTrack,
      email: data?.email,
      institution: data?.institution,
      training: data?.training,
      description: data?.description,
    };
    try {
      const response = await CreateStudentRequest(body);
      setResponseData(response);
      setShowSendRequest(false);
      toast.success("Request Sent Successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {showSuccessMessage === false ? (
        <div className="w-full pt-1 md:pt-10 md:pb-20">
          <div>
            <div className="text-primary mb-8  flex items-center justify-between border-b border-slate-300 pb-8">
              <p className="text-xl">Make a Request</p>
              <X onClick={() => setShowSendRequest(false)} />
            </div>
          </div>

          {/* ===FORM SECTION === */}
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <section className="items-start space-y-6">
              {/* === Email Input === */}
              <div>
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
                    value={userEmail}
                  />
                </div>
              </div>
              {/* === Institution Input === */}
              <div>
                <div
                  className={`${
                    errors.institution
                      ? "border-[1.3px] border-red-500"
                      : "border-[1.3px] border-slate-300"
                  } flex flex-col w-full pt-2 px-4 pb-1`}
                >
                  <input
                    className="py-2 focus:outline-none placeholder:text-sm cursor-text custom-placeholder bg-transparent text-black"
                    type="text"
                    placeholder="Institution name"
                    {...register("institution")}
                    maxLength={40}
                  />
                </div>
              </div>
              {/* === Request Track (time) === */}
              <div>
                <div
                  className={`${
                    errors.fastTrack
                      ? "border-[1.3px] border-red-500"
                      : "border-[1.3px] border-slate-300"
                  } flex flex-col w-full pt-2 px-4 pb-1`}
                >
                  <input
                    className="py-2 focus:outline-none placeholder:text-sm cursor-text bg-transparent text-black"
                    type="text"
                    placeholder="Track Period"
                    {...register("fastTrack")}
                    maxLength={24}
                  />
                </div>
              </div>
              {/* === (Purpose of Request) Training Input === */}
              <div>
                <div
                  className={`${
                    errors.training
                      ? "border-[1.3px] border-red-500"
                      : "border-[1.3px] border-slate-300"
                  } flex flex-col w-full pt-2 px-4 pb-1`}
                >
                  <input
                    className="py-2 focus:outline-none placeholder:text-sm cursor-text custom-placeholder bg-transparent text-black"
                    type="text"
                    placeholder="Purpose of Request"
                    {...register("training")}
                    maxLength={40}
                  />
                </div>
              </div>
              {/* === Description Input === */}
              <div>
                <div
                  className={`${
                    errors.description
                      ? "border-[1.3px] border-red-500"
                      : "border-[1.3px] border-slate-300"
                  } flex flex-col w-full pt-2 px-4 pb-1`}
                >
                  <textarea
                    className="py-2 focus:outline-none placeholder:text-sm cursor-text custom-placeholder bg-transparent text-black"
                    placeholder="Description"
                    {...register("description")}
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
