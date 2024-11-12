"use client";
import { useState } from "react";
import StudentCard from "@/app/components/cards/StudentCard";
import { specializationData, stateData } from "@/utils/FilterData";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import { useQuery } from "@tanstack/react-query";
import { GetUserByIdRequest } from "@/app/services/request.request";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CompanyHomeProps {
  session: any;
}

export default function CompanyHome({ session }: CompanyHomeProps) {
  const userId = session?.user?._id;
  const token = session.user.token;
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const { data: userData, isLoading } = useQuery({
    queryKey: ["getUsersApi"],
    queryFn: () => GetUserByIdRequest(userId, token),
  });

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
          <p className="cursor-pointer border border-[#33A852] p-3 w-[230px]  text-center text-[#33A852]">
            Approved Request
          </p>
        </div>
      </div>

      {/* ====CARD GOES HERE ===== */}
      <div>
        <StudentCard token={token} companyId={userData?.data?._id} />
      </div>
      <ToastContainer />
    </>
  );
}
