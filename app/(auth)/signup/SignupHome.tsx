"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { BiHide, BiShow } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpHome() {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
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
      <div className="bg-[#F1F4EA] h-screen px-4 py-20 text-[#1F4D36] w-full md:w-1/2  flex flex-col justify-center items-center">
        <div className="px-4 w-full lg:w-[90%] xl:w-[60%]">
          <p className="text-center text-[32px] ">Welcome Back!</p>
          <p className="text-center">Register an account</p>

          <form onSubmit={signUpWithEmailAndPassword}>
            {/* ======= First name ===== */}
            <div className="mt-4">
              <label htmlFor="name" className="mb-1 block text-sm">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e: any) => setFirstName(e.target.value)}
                className="px-3 py-3 focus:outline-none cursor-text flex justify-between rounded-lg w-full"
              />
            </div>
            {/* ======= Last name ===== */}
            <div className="mt-4">
              <label htmlFor="name" className="mb-1 block text-sm">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e: any) => setLastName(e.target.value)}
                className="px-3 py-3 focus:outline-none cursor-text flex justify-between rounded-lg w-full"
              />
            </div>
            {/* ======= Email ===== */}
            <div className="mt-4">
              <label htmlFor="name" className="mb-1 block text-sm">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                className="px-3 py-3 focus:outline-none cursor-text flex justify-between rounded-lg w-full"
              />
            </div>
            {/* ======= Password ===== */}
            <div className="mt-4 relative">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm">
                  Your Password
                </label>
                <input
                  type={`${show ? "text" : "password"}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  className="pr-12 pl-3 py-3 focus:outline-none cursor-text flex justify-between rounded-lg w-full"
                />
              </div>
              <span
                className="absolute cursor-pointer bottom-2 right-2 pt-4 flex items-center mr-[0.25rem] text-[#FF8447]"
                onClick={() => setShow(!show)}
              >
                <BiHide
                  size={25}
                  className={
                    show === false
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
                <BiShow
                  size={25}
                  className={
                    show === true
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
              </span>
            </div>

            <button className="px-8 py-3 cursor-pointer transition duration-700 ease-in-out mt-4 bg-[#1F4D36] text-[20px] text-white rounded-lg w-full hover:bg-white hover:text-[#1F4D36] hover:border-[#1F4D36] border-[.01rem]">
              Sign Up
            </button>
          </form>

          {/* ===== Google Authentication container ====== */}
          <div
            className="mt-4  py-2 rounded-lg flex items-center justify-center cursor-pointer border-[#1F4D36] border-[.01rem]"
            onClick={signUpWithGoogleAuthentication}
          >
            <div>
              <Image
                src="/images/google.png"
                width={100}
                height={100}
                alt="doctor pics"
                className="w-[32px] h-[32px]"
              />
            </div>

            <p className="py-1 ml-4">Sign up with Google</p>
          </div>
          {/* ===== Already have an account ======  */}
          <div className="mt-6">
            <p className="text-center ">
              Already have an account ?
              <Link href="/login" className="ml-4 underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
