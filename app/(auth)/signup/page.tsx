"use client";
import LeftContainer from "./leftContainer";
import "react-toastify/dist/ReactToastify.css";
import StudentSignup from "@/app/components/auth-components/StudentSignup";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="text-[#1F4D36] md:flex justify-between h-screen xl:overflow-y-hidden">
      <LeftContainer />
      <div className="bg-[#F1F4EA] md:w-[40%] xl:w-1/3 h-full py-8 pb-20 xl:py-16 text-[#1F4D36]">
        <div className="px-4 w-ful max-w-[340px] mx-auto">
          <p className="text-center text-[18px] font-medium">
            Start Connecting For Free!
          </p>
          <p className="text-center">Register an account</p>
          <div>
           <StudentSignup /> 
          </div>
          {/* ====== Already have an account ======  */}
          <div className="mt-4 text-center text-xs flex items-center justify-center">
            <p>Already have an account ? </p>
            <Link href="/login" className="underline ml-2">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
