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
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import GoogleImage from "@/public/images/google.png";
import GithubImage from "@/public/images/github.png";

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
});

export default function LoginHome() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const signUpWithGoogle = async () => {
  //   try {
  //     // Redirect to the Google OAuth endpoint
  //     window.location.href = `${process.env.NEXT_PUBLIC_BASEURL}/auth/google`;
  //     console.log(window.location.href, "this is here ====");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Google Login Failed");
  //   }
  // };

  // const signUpWithGoogle = async () => {
  //   try {
  //     const result = await signIn("google", {
  //       redirect: false,
  //       callbackUrl: "/"
  //     });

  //     if (result?.error) {
  //       toast.error("Google Login Failed");
  //       return;
  //     }

  //     const session = await getSession();

  //     console.log(session, "this is session here===")

  //     if (session?.user?.role === "Admin") {
  //       router.push("/admin-dashboard");
  //     } else if (session?.user?.role === "User") {
  //       router.push("/student-dashboard");
  //     } else if (session?.user?.role === "Company") {
  //       router.push("/company-dashboard");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Google Login Failed");
  //   }
  // };

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Handle Login Form Submission LOGIC
  const onSubmitHandler = async (params: any) => {
    setIsLoading(true);

    const response = await signIn("credentials", {
      email: params.email,
      password: params.password,
      redirect: false,
      callbackUrl: "/",
    });

    // Error Handling
    if (response?.error || response?.status === 401) {
      toast.error("Invalid Email/Password");
      setIsLoading(false);
      return;
    }

    // No Errors
    console.log(response, "login response ==");

    setIsLoading(false);
    toast.success("Login Successfully");

    const session = await getSession();
    // return;
    return setTimeout(() => {
      if (session?.user?.role === "Admin") {
        return router.push("/admin-dashboard");
      }
      if (session?.user?.role === "User") {
        return router.push("/student-dashboard/");
      }
      if (session?.user?.role === "Company") {
        return router.push("/company-dashboard");
      }
    }, 1000);
  };

  return (
    <>
      <div className="bg-[#F1F4EA] overflow-y-hidden md:w-[40%] xl:w-1/3 h-full  py-20 text-[#1F4D36]">
        <div className="px-4 w-ful max-w-[340px] mx-auto">
          <p className="text-center text-[24px] ">Welcome Back!</p>
          <p className="text-center">Login to your account</p>

          {/* ======= Google Authentication container ====== */}
          <div
            className="mt-4 py-1 rounded-lg flex items-center justify-center cursor-pointer bg-white text-black font-medium"
          >
            <div>
              <Image
                src={GoogleImage}
                width={100}
                height={100}
                alt="doctor pics"
                className="w-[24px] h-[24px]"
              />
            </div>

            <p className="py-1 ml-4">Continue with Google</p>
          </div>

          {/* ======= Github Authentication container ====== */}
          <div
            className="mt-4 py-1 rounded-lg flex items-center justify-center cursor-pointer bg-white text-black font-medium"
          >
            <div>
              <Image
                src={GithubImage}
                width={100}
                height={100}
                alt="doctor pics"
                className="w-[24px] h-[24px]"
              />
            </div>

            <p className="py-1 ml-4">Continue with Github</p>
          </div>
          <div className="flex items-center justify-between gap-2 mt-6 mb-4 text-sm">
            <div className="w-[40%] border-[0.5px] border-slate-300" />{" "}
            <span>or</span>{" "}
            <div className="w-[40%] border-[0.5px] border-slate-300" />
          </div>

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
                  } dark:bg-[#FFFFFF] pr-12 pl-3 py-2.5 focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full`}
                />
              </div>
              <span
                className="absolute cursor-pointer bottom-4 right-2 pt-4 flex items-center mr-[0.25rem] text-[#FF8447]"
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
            {/* ====Forget Password ===== */}
            <Link
              href="/forgot-password"
              className="ml-4 mt-2 hover:underline block text-xs"
            >
              Forgot Password?
            </Link>

            <button
              disabled={isLoading}
              className="px-8 py-2 cursor-pointer  mt-4 bg-[#1F4D36] text-[16px] text-white rounded-lg w-full  transition duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(31,77,54,0.7)] hover:brightness-150"
            >
              {isLoading ? "Authenticating...." : "Continue"}
            </button>
          </form>

          {/* ====== Don't have an account ======  */}
          <div className="mt-4 text-center text-sm">
            <p>Don&apos;t have an account yet? </p>
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
