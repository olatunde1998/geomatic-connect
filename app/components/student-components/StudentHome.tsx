"use client";
import { useState } from "react";
import { Sheet } from "@/app/components/sheets/Sheet";
import SendRequest from "./SendRequest";
import CompanyCard from "@/app/components/cards/CompanyCard";
import { specializationData, stateData } from "@/utils/FilterData";
import ReactSelect from "@/app/components/inputs/ReactSelect";

interface StudentHomeProps {
  session: any;
}

export default function StudentHome({ session }: StudentHomeProps) {
  const userEmail = session?.user?.email;
  const [showSendRequest, setShowSendRequest] = useState<boolean>(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedState, setSelectedState] = useState("");

  console.log(selectedSpecialization, "this is the selectedSpecialization===");
  console.log(selectedState, "this is the selectedState ===");
  return (
    <>
      {/* ====== Filter & Search Goes here ====== */}

      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] lg:flex p-4  lg:my-20 xl:my-10">
        <div className="md:flex items-center mb-8 lg:mb-0">
          <p>Filter By:</p>
          <div className="md:flex space-y-2 mt-3 md:mt-0 md:space-y-0 md:ml-3 md:space-x-3">
            {/* === DropDown Input === */}
            <div>
              <ReactSelect
                options={specializationData}
                placeholder="Specialization *"
                onChange={(option: any) => {
                  setSelectedSpecialization(option?.value || "");
                }}
              />
            </div>
            <div>
              <ReactSelect
                options={stateData}
                placeholder="State"
                onChange={(option: any) => {
                  setSelectedState(option?.value || "");
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <p
            onClick={() => setShowSendRequest(true)}
            className="cursor-pointer border border-[#33A852] p-3 w-[230px]  text-center text-[#33A852]"
          >
            Choose Engineer For Me
          </p>
        </div>
      </div>

      {/* ====CARD GOES HERE ===== */}
      <div>
        <CompanyCard />
      </div>

      {/* ===Sheets */}
      <Sheet show={showSendRequest} onClose={() => setShowSendRequest(false)}>
        <SendRequest
          setShowSendRequest={setShowSendRequest}
          userEmail={userEmail}
        />
      </Sheet>
    </>
  );
}
