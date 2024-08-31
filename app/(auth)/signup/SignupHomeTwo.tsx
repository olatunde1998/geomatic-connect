"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { BiHide, BiShow } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "@/auth"

export default function SignUpHomeTwo() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);


  const signUpWithEmailAndPassword = (e: any) => {
    e.preventDefault();
    toast.success("Sign Up Successfully");
    console.log("sign up successful");
  };

  const signUpWithGoogleAuthentication = () => {
    console.log("sign up successful");
    toast.success("Sign Up Successfully");
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

          <form onSubmit={signUpWithEmailAndPassword}>

             {/* =======Username ===== */}
             <div className="mt-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
                className="px-3 py-2.5 focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full"
              />
            </div>


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
                className="absolute cursor-pointer bottom-3 right-2 pt-4 flex items-center mr-[0.25rem] text-[#FF8447]"
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

            <button className="px-8 py-2 cursor-pointer  mt-4 bg-[#1F4D36] text-[16px] text-white rounded-lg w-full  transition duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(31,77,54,0.7)] hover:brightness-150">
              Sign-up with email
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
