import { X } from "lucide-react";
// import { CreateInvoiceRequest } from "@/app/services/invoice.request";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

interface SendRequestProps {
  setShowSendRequest?: any;
}

// Validation Schema
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "First Name must be greater than 3 letters"),
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
});

export default function SendRequest({ setShowSendRequest }: SendRequestProps) {
  const [isSaving, setIsSaving] = useState(false);

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Send Request submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    const body = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    };
    try {
      // await CreateInvoiceRequest(body);
      toast.success("Request Sent Successfully");
      setShowSendRequest(false);
      reset();
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setIsSaving(false);
    }
    setIsSaving(false);
  };

  return (
    <div>
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
            {/* === First Name === */}
            <div>
              <div
                className={`${
                  errors.firstName ? "border-[1.3px] border-red-500" : ""
                } flex flex-col w-full pt-2 px-4 pb-1 border-[1.3px] border-[#6C748B] rounded-lg`}
              >
                <input
                  className="py-2 focus:outline-none cursor-text bg-transparent text-black"
                  type="text"
                  placeholder="First Name *"
                  {...register("firstName")}
                  maxLength={24}
                />
              </div>
            </div>

            {/* === Email Input === */}
            <div>
              <div
                className={`${
                  errors.email ? "border-[1.3px] border-red-500" : ""
                } flex flex-col w-full pt-2 px-4 pb-1 border-[1.3px] border-[#6C748B] rounded-lg`}
              >
                <input
                  className="py-2 focus:outline-none cursor-text custom-placeholder bg-transparent text-black"
                  type="email"
                  placeholder="Email Address *"
                  {...register("email")}
                  maxLength={40}
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
    </div>
  );
}
