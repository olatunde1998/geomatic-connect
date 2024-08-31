"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { BiHide, BiShow } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { auth } from "@/auth";
// import { signIn } from "@/auth";

export default function LoginHomeTwo() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const signUpWithGoogle = async () => {
    toast.success("Login Successfully");
    const response = await signIn("google");

    const session = await getSession();

    // No Errors
    console.log(response, "login response ==");

    console.log(session?.user, "===this is the roles====");
    // Check if the session contains the user data
    if (session?.user) {
      console.log(session.user, "===this is the roles====");
      return router.push("/student-dashboard");
    } else {
      console.log("No session found after login");
      return;
    }
  };

  const signUpWithGithub = async () => {
    const response = await signIn("github");

    const session = await getSession();

    // No Errors
    console.log(response, "login response ==");

    console.log(session?.user, "===this is the roles====");
    // Check if the session contains the user data
    if (session?.user) {
      console.log(session.user, "===this is the roles====");
      return router.push("/student-dashboard");
    } else {
      console.log("No session found after login");
      return;
    }
  };

  return (
    <>
      <div className="bg-[#F1F4EA] h-screen overflow-y-hidden px-4 py-20 text-[#1F4D36] max-w-[335px] mx-auto">
        <div className="px-4 w-full">
          <p className="text-center text-[32px] ">Welcome Back!</p>
          <p className="text-center">Login to your account</p>

          {/* ======= Google Authentication container ====== */}
          <div
            className="mt-4 py-1 rounded-lg flex items-center justify-center cursor-pointer bg-white text-black font-medium"
            onClick={signUpWithGoogle}
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

            <p className="py-1 ml-4">Continue with Google</p>
          </div>

          {/* ======= Github Authentication container ====== */}
          <div
            className="mt-4 py-1 rounded-lg flex items-center justify-center cursor-pointer bg-white text-black font-medium"
            onClick={() => signUpWithGithub()}
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

            <p className="py-1 ml-4">Continue with Github</p>
          </div>
          <div className="flex items-center justify-between gap-2 mt-6 mb-4 text-sm">
            <div className="w-[40%] border-[0.5px] border-slate-300" />{" "}
            <span>or</span>{" "}
            <div className="w-[40%] border-[0.5px] border-slate-300" />
          </div>

          <form>
            {/* =======Email ===== */}
            <div className="mt-4">
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                className="px-3 py-2.5 focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full"
              />
            </div>

            {/* =======  Password ======== */}
            <div className="mt-4 relative">
              <div>
                <input
                  type={`${show ? "text" : "password"}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  className="pr-12 pl-3 py-2.5 focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full"
                />
              </div>
              <span
                className="absolute cursor-pointer bottom-4 right-2 pt-4 flex items-center mr-[0.25rem] text-[#FF8447]"
                onClick={() => setShow(!show)}
              >
                <BiHide
                  size={18}
                  className={
                    show === false
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
                <BiShow
                  size={18}
                  className={
                    show === true
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
              </span>
            </div>
            {/* ====Forget Password ===== */}
            <Link href="#" className="ml-4 mt-2 hover:underline block text-xs">
              Forgot Password?
            </Link>

            <button className="px-8 py-2 cursor-pointer  mt-4 bg-[#1F4D36] text-[16px] text-white rounded-lg w-full  transition duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(31,77,54,0.7)] hover:brightness-150">
              Continue
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
