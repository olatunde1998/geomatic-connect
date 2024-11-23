"use client";
import { useState } from "react";
import Map from "@/app/components/map/Map";
import { MdOutlineStar } from "react-icons/md";
import { Sheet } from "@/app/components/sheets/Sheet";
import SendRequest from "./SendRequest";
import { GetUserByIdRequest } from "@/app/services/request.request";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetUserProfileRequest } from "@/app/services/users.request";

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

  const { data: userData } = useQuery({
    queryKey: ["getUserByIdApi"],
    queryFn: () => GetUserByIdRequest(companyId, token),
  });

  const { data: userProfileData } = useQuery({
    queryKey: ["getUserProfileApi"],
    queryFn: () => GetUserProfileRequest(userId, token),
  });

  console.log(userData, "this is userData==");
  return (
    <>
      <div className="mt-24 mb-10 items-center justify-between bg-[#ECF1F7] lg:flex p-4  lg:my-20 xl:my-10">
        <p className="py-2 cursor-pointer md:border-b-[1.8px] border-slate-500 text-2xl font-bold">
          Profile
        </p>
        <div>
          <p
            onClick={() => setShowSendRequest(true)}
            className="cursor-pointer rounded-md border p-3 w-[230px]  text-center text-white bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
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
                <Map companyAddress={userData?.data?.companyAddress}/>
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

                <div className="mt-8 font-sans text-md">
                  <p className="text-lg font-bold">Achievement: </p>
                  <p className="leading-8 font-light">
                    13 Olaide Tomori St, Ikeja, 101233, Lagos
                  </p>
                </div>

                <div className="mt-10">
                  <p
                    onClick={() => setShowSendRequest(true)}
                    className="cursor-pointer rounded-md border p-3 w-[230px]  text-center text-white bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
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
      <ToastContainer />
    </>
  );
}
