"use client";
import { useState } from "react";
import { Sheet } from "@/app/components/sheets/Sheet";
import StudentCard from "@/app/components/cards/StudentCard";
import SendRequest from "./SendRequest";
import { Select } from "@/app/components/inputs/Select";
import { specializationData, stateData } from "@/utils/FilterData";

export default function CompanyHome() {
  const [showSendRequest, setShowSendRequest] = useState(false);
  const [getItemName, setGetItemName] = useState();
  return (
    <>
      {/* ====== Filter & Search Goes here ====== */}

      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] lg:flex p-4  lg:my-20 xl:my-10">
        <div className="md:flex items-center mb-8 lg:mb-0">
          <p>Filter By:</p>
          <div className="md:flex space-y-2 mt-3 md:mt-0 md:space-y-0 md:ml-3 md:space-x-3">
            {/* === DropDown Input === */}
            <div>
              <Select
                placeholder="Specialization *"
                onSelect={(item: any) => {
                  setGetItemName(item?.name);
                }}
                inputData={specializationData}
              />
            </div>
            <div>
              <Select
                placeholder="Select State"
                onSelect={(item: any) => {
                  setGetItemName(item?.name);
                }}
                inputData={stateData}
              />
            </div>
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
