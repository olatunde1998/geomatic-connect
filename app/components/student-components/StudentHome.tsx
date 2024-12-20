"use client";
import { useEffect, useState } from "react";
import CompanyCard from "@/app/components/cards/CompanyCard";
import { specializationData, stateData } from "@/utils/FilterData";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import { GetUserByIdRequest } from "@/app/services/request.request";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "@/app/components/modals/Modal";
import SubscribeModal from "@/app/components/student-components/SubscribeModal";

interface StudentHomeProps {
  session: any;
}

export default function StudentHome({ session }: StudentHomeProps) {
  const userId = session?.user?._id;
  const token = session.user.token;
  const [showSendRequest, setShowSendRequest] = useState<boolean>(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [showSubscribe, setShowSubscribe] = useState<boolean>(false);

  const { data: userData } = useQuery({
    queryKey: ["getUserByIdApi"],
    queryFn: () => GetUserByIdRequest(userId, token),
  });

  // Trigger subscription modal
  // useEffect(() => {
  //   const MAX_COUNT = 2;
  //   const INTERVAL = 60000;
  //   let count = 0;

  //   const showModal = () => {
  //     if (count < MAX_COUNT) {
  //       setShowSubscribe(true);
  //       count += 1;
  //       setTimeout(showModal, INTERVAL);
  //     }
  //   };
  //   const timeoutId = setTimeout(showModal, INTERVAL);
  //   return () => clearTimeout(timeoutId);
  // }, []);

  return (
    <>
      {/* ====== Filter & Search Goes here ====== */}
      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] lg:flex p-4  lg:my-20 xl:my-10">
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
                placeholder="All State"
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
        <CompanyCard
          token={token}
          setSelectedCompanyId={setSelectedCompanyId}
          selectedCompanyId={selectedCompanyId}
          showSendRequest={showSendRequest}
          setShowSendRequest={setShowSendRequest}
          userData={userData}
          selectedState={selectedState}
        />
      </div>
      <Modal show={showSubscribe} onClose={() => setShowSubscribe(false)}>
        <SubscribeModal setShowSubscribe={setShowSubscribe} />
      </Modal>
      <ToastContainer />
    </>
  );
}
