"use client";
import { useState } from "react";
import Map from "@/app/components/map/Map";
import { MdOutlineStar } from "react-icons/md";
import { Sheet } from "@/app/components/sheets/Sheet";
import SendRequest from "./SendRequest";
import { GetUserByIdRequest } from "@/app/services/request.request";
import { useQuery } from "@tanstack/react-query";

import { GetUserProfileRequest } from "@/app/services/users.request";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const [showSendRequest, setShowSendRequest] = useState(false);
  const router = useRouter();

  const { data: userData } = useQuery({
    queryKey: ["getCompanyDetailsIdApi"],
    queryFn: () => GetUserByIdRequest(companyId, token),
  });

  const { data: userProfileData } = useQuery({
    queryKey: ["getUserProfileApi"],
    queryFn: () => GetUserProfileRequest(userId, token),
  });

  return (
    <>
      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] dark:bg-muted flex p-2 gap-3  lg:my-20 xl:my-10">
        <div className="flex items-center">
          <p
            onClick={() => router.back()}
            className="py-2 cursor-pointer text-base md:text-xl font-bold text-gray-400"
          >
            Home
          </p>
          <ChevronRight size={24} className="mx-0.5" />
          <p className="py-2 cursor-text text-base  md:text-xl font-bold">
            Profile
          </p>
        </div>

        <div>
          <p
            onClick={() => setShowSendRequest(true)}
            className="cursor-pointer rounded-md border p-3 w-[140px] md:w-[150px]  text-center text-white bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
          >
            Send Request
          </p>
        </div>
      </div>
      {/* ================Body section ===========  */}
      <section className="mt-8">
        <div>
          <section>
            <div className="flex flex-col-reverse md:grid grid-cols-2 md:gap-4">
              <div className="w-full h-full rounded-md">
                <Map companyAddress={userData?.data?.companyAddress} />
              </div>
              <div>
                <div className="grid grid-cols-2">
                  <div className="mb-4 leading-8 font-light">
                    <p className="text-lg font-bold mb-2">
                      Specialized Field:{" "}
                    </p>
                    <p>Cadastral Surveying</p>
                    <p>Topographical Surveying</p>
                    <p>Drone Surveying</p>
                    <p>Hydrograhical Surveying</p>
                    <p>GIS & Remote Sensing</p>
                  </div>
                  <div className="mb-4 ">
                    <p className="text-lg font-bold mb-2">Rating: </p>
                    <div className="space-y-2">
                      <p className="flex">
                        <MdOutlineStar size={24} className="text-yellow-400" />
                        <MdOutlineStar size={24} className="text-yellow-400" />
                        <MdOutlineStar size={24} className="text-yellow-400" />
                        <MdOutlineStar size={24} className="text-yellow-400" />
                        <MdOutlineStar size={24} className="text-yellow-400" />
                      </p>
                      <p className="flex">
                        <MdOutlineStar size={24} className="text-yellow-400" />
                        <MdOutlineStar size={24} className="text-yellow-400" />
                        <MdOutlineStar size={24} className="text-slate-400" />
                        <MdOutlineStar size={24} className="text-slate-400" />
                      </p>
                      <p className="flex">
                        <MdOutlineStar size={24} className="text-yellow-400" />
                        <MdOutlineStar size={24} className="text-yellow-400" />
                        <MdOutlineStar size={24} className="text-slate-400" />
                      </p>
                      <p className="flex">
                        <MdOutlineStar size={24} className="text-yellow-400" />
                        <MdOutlineStar size={24} className="text-slate-400" />
                      </p>
                      <p className="flex">
                        <MdOutlineStar size={24} className="text-yellow-400" />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 font-sans text-md">
                  <p className="text-lg font-bold">Goals:</p>
                  <p className="leading-8 font-light">
                    {userData?.data?.aboutMe}
                  </p>
                </div>

                <div className="mt-4 font-sans text-md">
                  <p className="text-lg font-bold">Address: </p>
                  <p className="leading-8 font-light">
                    {userData?.data?.companyAddress}
                  </p>
                </div>

                <div className="mt-8 font-sans text-md flex gap-4 items-center">
                  <p className="text-lg font-bold">Accomodation: </p>
                  <p className="leading-8 font-light">
                    {userData?.data?.accomodation === true ? "Yes" : "No"}
                  </p>
                </div>

                <div className="mt-8 font-sans text-md">
                  <p className="text-lg font-bold">Achievement: </p>
                  <p className="leading-8 font-light">
                    13 Olaide Tomori St, Ikeja, 101233, Lagos
                  </p>
                </div>

                <div className="mt-6 mb-10">
                  <p
                    onClick={() => setShowSendRequest(true)}
                    className="cursor-pointer rounded-md border p-3 w-[140px] md:w-[150px]  text-center text-white bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
                  >
                    Send Request
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* ===Sheets */}
      <Sheet show={showSendRequest} onClose={() => setShowSendRequest(false)}>
        <SendRequest
          setShowSendRequest={setShowSendRequest}
          companyId={companyId}
          userData={userProfileData}
          token={token}
        />
      </Sheet>
    </>
  );
}
