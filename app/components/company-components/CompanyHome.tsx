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
    queryKey: ["getUserByIdApi"],
    queryFn: () => GetUserByIdRequest(userId, token),
  });

  return (
    <>
      {/* ====== Filter & Search Goes here ====== */}
      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] dark:bg-muted lg:flex p-4 lg:my-20 xl:my-10">
        <div className="md:flex items-center">
          <p>Filter By:</p>
          <div className="md:flex space-y-2 mt-3 md:mt-0 md:space-y-0 md:ml-3 md:space-x-3">
            {/* === DropDown Input === */}
            <div className="w-[226px]">
              <ReactSelect
                options={specializationData}
                placeholder="Specialization *"
                onChange={(option: any) => {
                  setSelectedSpecialization(option?.value || "");
                }}
              />
            </div>
            <div className="w-[153px]">
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
      </div>

      {/* ====CARD GOES HERE ===== */}
      <div>
        <StudentCard token={token} companyId={userData?.data?._id} />
      </div>
      <ToastContainer />
    </>
  );
}
