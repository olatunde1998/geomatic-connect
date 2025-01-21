"use client";
import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader } from "lucide-react";
import { ForgotPasswordRequest } from "@/app/services/auth.request";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Forgot Password User submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsLoading(true);
    const body = {
      email: data?.email,
    };
    try {
      const response = await ForgotPasswordRequest(body);
      toast.success(response?.message);
      setTimeout(() => {
        router.push("/reset-password");
      }, 5000);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#F1F4EA] overflow-y-hidden md:w-[40%] xl:w-1/3 h-full  py-20 text-[#1F4D36]">
        <div className="px-4 w-ful max-w-[340px] mx-auto">
          <p className="text-center text-[24px] ">Forgot Password</p>
          <p className="text-center text-sm mt-4 mb-6 max-w-[290px] mx-auto">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* =======Email ===== */}
            <div className="mt-4">
              <input
                type="email"
                placeholder="E-mail"
                {...register("email")}
                maxLength={40}
                className={`${
                  errors.email
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : ""
                } dark:bg-[#FFFFFF] px-3 py-2.5 focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full`}
              />
            </div>
            <button
              disabled={isLoading}
              className="px-8 py-2 cursor-pointer  mt-4 bg-[#1F4D36] text-[16px] text-white rounded-lg w-full  transition duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(31,77,54,0.7)] hover:brightness-150"
            >
              {isLoading ? (
                <Loader className="size-6 animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* ====== Don't have an account ======  */}
          <div className="mt-4 text-center text-sm">
            {/* <p>Don&apos;t have an account yet? </p> */}
            <Link
              href="/login"
              className="underline flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
