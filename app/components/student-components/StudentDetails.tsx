"use client";
import { useState } from "react";
import DetailsTab from "./DetailsTab";
import StudentProfile from "./StudentProfile";
import StudentProject from "./StudentProject";
import StudentInstitution from "./StudentInstitution";
import { Sheet } from "@/app/components/sheets/Sheet";
import SendRequest from "./SendRequest";
import { GetUserByIdRequest } from "@/app/services/request.request";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface StudentDetailsProps {
  companyId?: any;
  session: any;
}

export default function StudentDetails({
  companyId,
  session,
}: StudentDetailsProps) {
  const userId = session?.user?._id;
  const token = session?.user.token;

  const [selectedTab, setSelectedTab] = useState("Profile");
  const [showSendRequest, setShowSendRequest] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["getUsersApi"],
    queryFn: () => GetUserByIdRequest(userId, token),
  });
  return (
    <>
      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] lg:flex p-4  lg:my-20 xl:my-10">
        {/*=====Complete  Profile Tabs ====== */}
        <div>
          <DetailsTab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
        <div>
          <p
            onClick={() => setShowSendRequest(true)}
            className="cursor-pointer border p-3 w-[230px]  text-center text-white bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
          >
            Send Request
          </p>
        </div>
      </div>
      {/* ================Body section ===========  */}
      <section className="mt-8">
        {/* ==== Profile ====*/}
        <div>
          {selectedTab === "Profile" && (
            <section>
              <StudentProfile setShowSendRequest={setShowSendRequest} />
            </section>
          )}
        </div>

        {/* ==== Project ====*/}
        <div>
          {selectedTab === "Project" && (
            <section>
              <StudentProject />
            </section>
          )}
        </div>

        {/* ==== Institution ====*/}
        <div>
          {selectedTab === "Institution" && (
            <section>
              <StudentInstitution />
            </section>
          )}
        </div>
      </section>

      {/* ===Sheets */}
      <Sheet show={showSendRequest} onClose={() => setShowSendRequest(false)}>
        <SendRequest
          setShowSendRequest={setShowSendRequest}
          companyId={companyId}
          userData={userData}
          token={token}
        />
      </Sheet>
      <ToastContainer />
    </>
  );
}
