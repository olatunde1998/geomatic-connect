"use client";
import { useState } from "react";
import { Sheet } from "@/app/components/sheets/Sheet";
import StudentCard from "@/app/components/cards/StudentCard";
import SendRequest from "./SendRequest";

export default function CompanyHome() {
  const [showSendRequest, setShowSendRequest] = useState(false);
  return (
    <>
      {/* ====== Filter & Search Goes here ====== */}

      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] lg:flex p-4  lg:my-20 xl:my-10">
        <div className="md:flex items-center mb-8 lg:mb-0">
          <p>Filter By:</p>
          <div className="space-y-2 mt-3 md:mt-0 md:space-y-0 md:ml-3 md:space-x-3">
            <select
              name=""
              id=""
              className="border border-slate-300 p-4 w-[220px]"
            >
              <option value="">JavaScript</option>
              <option value="">Go Lang</option>
              <option value="">Python</option>
            </select>
            <select
              name=""
              id=""
              className="border border-slate-300 p-4 w-[220px]"
            >
              <option value="">JavaScript</option>
              <option value="">Go Lang</option>
              <option value="">Python</option>
            </select>
          </div>
        </div>
        <div>
          <p
            onClick={() => setShowSendRequest(true)}
            className="cursor-pointer border border-[#33A852] p-3 w-[230px]  text-center text-[#33A852]"
          >
            Approved Request
          </p>
        </div>
      </div>

      {/* ====CARD GOES HERE ===== */}
      <div>
        <StudentCard />
      </div>

      {/* ===Sheets */}
      <Sheet show={showSendRequest} onClose={() => setShowSendRequest(false)}>
        <SendRequest setShowSendRequest={setShowSendRequest} />
      </Sheet>
    </>
  );
}
