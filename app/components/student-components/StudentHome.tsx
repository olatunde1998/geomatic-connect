"use client";
import SubscribeModal from "@/app/components/student-components/SubscribeModal";
import { GetUserByIdRequest } from "@/app/services/request.request";
import CompanyCard from "@/app/components/cards/CompanyCard";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import { Modal } from "@/app/components/modals/Modal";
import { stateData } from "@/utils/FilterData";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

interface StudentHomeProps {
  session: any;
}

export default function StudentHome({ session }: StudentHomeProps) {
  const userId = session?.user?._id;
  const token = session.user.token;
  const [showSendRequest, setShowSendRequest] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [showSubscribe, setShowSubscribe] = useState<boolean>(false);
  const [search, setSearch] = useState("");

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
      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] dark:bg-muted lg:flex p-4  lg:my-20 xl:my-10">
        <div className="md:flex items-center">
          <p>Filter By:</p>
          <div className="md:flex space-y-2 mt-3 md:mt-0 md:space-y-0 md:ml-3 md:space-x-3">
            {/* === DropDown Input === */}
            <div className="w-[226px]">
              <input
                type="text"
                onChange={(e: any) => setSearch(e.target.value)}
                className="border border-[#cbd5e1] w-full p-4 cursor-text placeholder:text-xs focus:border-green-600 focus:ring-0 focus:outline-none"
                placeholder="Search by company name"
              />
            </div>
            <div className="w-[153px]">
              <ReactSelect
                options={stateData}
                placeholder="All State"
                border="#16a34a"
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
          search={search}
        />
      </div>
      <Modal show={showSubscribe} onClose={() => setShowSubscribe(false)}>
        <SubscribeModal setShowSubscribe={setShowSubscribe} />
      </Modal>
      <ToastContainer />
    </>
  );
}
