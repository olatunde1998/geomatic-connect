"use client";
import CompanySignup from "@/app/components/auth-components/CompanySignup";
import LeftContainer from "./leftContainer";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import StudentSignup from "@/app/components/auth-components/StudentSignup";
import Link from "next/link";

export default function SignUp() {
  const [userTypeTab, setUserTypeTab] = useState("Student");
  return (
    <div className="text-[#1F4D36] md:flex justify-between xl:h-screen xl:overflow-y-hidden">
      <LeftContainer />
      <div className="bg-[#F1F4EA] md:w-[40%] xl:w-1/3 h-full py-8 pb-20 xl:py-16 text-[#1F4D36]">
        <div className="px-4 w-ful max-w-[340px] mx-auto">
          <p className="text-center text-[18px] font-medium">
            Start Connecting For Free!
          </p>
          <p className="text-center">Register an account</p>
          {/* ======user tab ==== */}
          {/* <div className="mt-6 mb-10 border-[1.3px] border-slate-300 flex justify-between items-center  rounded-lg">
            <p
              onClick={() => setUserTypeTab("Student")}
              className={`${
                userTypeTab === "Student"
                  ? "text-[#FFFF] bg-[#1F4D36]"
                  : "text-[#1F4D36]"
              } p-1.5 rounded-l-lg text-center w-1/2 cursor-pointer`}
            >
              Student
            </p>
            <p
              onClick={() => setUserTypeTab("Company")}
              className={`${
                userTypeTab === "Company"
                  ? "text-[#FFFF] bg-[#1F4D36]"
                  : "text-[#1F4D36]"
              }  p-1.5 rounded-r-lg text-center w-1/2 cursor-pointer`}
            >
              Company
            </p>
          </div> */}

          <div>
            {userTypeTab === "Student" ? <StudentSignup /> : <CompanySignup />}
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
