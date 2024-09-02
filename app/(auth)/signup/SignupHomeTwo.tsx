"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { BiHide, BiShow } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterUserRequest } from "@/app/services/auth.request";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email(" Invalid Email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 15 characters"),
  username: yup.string().required("username is required"),
});

export default function SignUpHomeTwo() {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const signUpWithGoogleAuthentication = () => {
    console.log("sign up successful");
    toast.success("Sign Up Successfully");
  };

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Register User submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    const body = {
      username: data?.username,
      email: data?.email,
      password: data?.password,
      role: "User",
    };
    try {
      const response = await RegisterUserRequest(body);
      if (response?.success) {
        toast.success(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.message);
    } finally {
      setIsSaving(false);
    }
    setIsSaving(false);
  };

  return (
    <>
      <div className="bg-[#F1F4EA] md:w-1/3 h-full py-20 text-[#1F4D36]">
        <div className="px-4 w-ful max-w-[340px] mx-auto">
          <p className="text-center text-[18px] font-medium">
            Start Connecting For Free!
          </p>
          <p className="text-center">Register an account</p>

          {/* ======= Google Authentication container ====== */}
          <div
            className="mt-4 py-1 rounded-lg flex items-center justify-center cursor-pointer bg-white text-black font-medium"
            onClick={signUpWithGoogleAuthentication}
          >
            <div>
              <Image
                src="/images/google.png"
                width={100}
                height={100}
                alt="doctor pics"
                className="w-[24px] h-[24px]"
              />
            </div>

            <p className="py-1 ml-4">Sign up with Google</p>
          </div>

          {/* ======= Github Authentication container ====== */}
          <div
            className="mt-4 py-1 rounded-lg flex items-center justify-center cursor-pointer bg-white text-black font-medium"
            onClick={signUpWithGoogleAuthentication}
          >
            <div>
              <Image
                src="/images/github.png"
                width={100}
                height={100}
                alt="doctor pics"
                className="w-[24px] h-[24px]"
              />
            </div>

            <p className="py-1 ml-4">Sign up with Github</p>
          </div>

          <div className="flex items-center justify-between gap-2 mt-6 mb-4 text-sm">
            <div className="w-[40%] border-[0.5px] border-slate-300" />{" "}
            <span>or</span>{" "}
            <div className="w-[40%] border-[0.5px] border-slate-300" />
          </div>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* =======Username ===== */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Username"
                {...register("username")}
                maxLength={32}
                className={`${
                  errors.username
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : ""
                } px-3 py-2.5 focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full`}
              />
            </div>

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
                } px-3 py-2.5 focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full`}
              />
            </div>

            {/* =======  Password ======== */}
            <div className="mt-4 relative">
              <div>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
                  {...register("password")}
                  maxLength={32}
                  className={`${
                    errors.password
                      ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                      : ""
                  } pr-12 pl-3 py-2.5 focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full`}
                />
              </div>
              <span
                className="absolute cursor-pointer bottom-3 right-2 pt-4 flex items-center mr-[0.25rem] text-[#FF8447]"
                onClick={() => setShowPassword(!showPassword)}
              >
                <BiHide
                  size={18}
                  className={
                    showPassword === false
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
                <BiShow
                  size={18}
                  className={
                    showPassword === true
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
              </span>
            </div>

            {/* ====Terms and service ===== */}
            <div className="text-xs mt-6 text-center">
              <p>
                By signing up you agree to our
                <Link href="#" className="underline mx-1">
                  Terms of Service
                </Link>
                and
                <Link href="#" className="underline ml-1">
                  Privacy Policy.
                </Link>
              </p>
            </div>

            <button
              disabled={isSaving}
              className="px-8 py-2 cursor-pointer  mt-4 bg-[#1F4D36] text-[16px] text-white rounded-lg w-full  transition duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(31,77,54,0.7)] hover:brightness-150"
            >
              {isSaving ? "Loading...." : "Sign-up with email"}
            </button>
          </form>

          {/* ====== Already have an account ======  */}
          <div className="mt-4 text-center text-xs flex items-center justify-center">
            <p>Already have an account ? </p>
            <Link href="/login" className="underline ml-2">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
