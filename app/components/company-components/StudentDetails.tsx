"use client";
import { useState } from "react";
import StudentProfile from "./StudentProfile";
import StudentProject from "./StudentProject";
import StudentInstitution from "./StudentInstitution";
import DetailsTab from "./DetailsTab";
import SendRequest from "./SendRequest";
import { Sheet } from "@/app/components/sheets/Sheet";

interface StudentDetailsProps {
  studentId?: any;
  session: any;
}

export default function StudentDetails({
  studentId,
  session,
}: StudentDetailsProps) {
  const userEmail = session?.user?.name;
  const [selectedTab, setSelectedTab] = useState("Profile");
  const [showSendRequest, setShowSendRequest] = useState(false);
  return (
    <>
      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] lg:flex p-4  lg:my-20 xl:my-10">
        This is Student Id here === {studentId}
        {/*=====Complete  Profile Tabs ====== */}
        <div>
          <DetailsTab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>
      {/* ================Body section ===========  */}
      <section className="mt-8">
        {/* ==== Profile ====*/}
        <div>
          {selectedTab === "Profile" && (
            <section>
              <StudentProfile />
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
          userEmail={userEmail}
        />
      </Sheet>
    </>
  );
}
