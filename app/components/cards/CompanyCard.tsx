"use client";
import { GetCompaniesRequest } from "@/app/services/request.request";
import { Sheet } from "@/app/components/sheets/Sheet";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, MapPin, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SendRequest from "@/app/components/student-components/SendRequest";
import { CardSkeleton } from "@/app/components/skeletons/CardSkeleton";
import UserAvatar from "@/public/images/profile-pic.png";
import Trash from "@/app/components/trash/Trash";

interface CompanyCardProps {
  token: string;
  setSelectedCompanyId?: any;
  selectedCompanyId?: any;
  showSendRequest?: any;
  setShowSendRequest?: any;
  userData?: any;
  selectedState: string;
  search: string;
}

export default function CompanyCard({
  token,
  setSelectedCompanyId,
  selectedCompanyId,
  showSendRequest,
  setShowSendRequest,
  userData,
  selectedState,
  search,
}: CompanyCardProps) {
  const { data: companiesData, isLoading } = useQuery({
    queryKey: ["getCompaniesApi", selectedState, search],
    queryFn: () => GetCompaniesRequest(token, selectedState, search),
  });

  return (
    <>
      {isLoading ? (
        <div>
          <CardSkeleton />
        </div>
      ) : !companiesData ||
        !companiesData.data ||
        companiesData.data.length === 0 ? (
        <>
          <div className="gap-2 my-10 md:mt-24">
            <Trash
              headingText="No Company Available"
              subHeadingText="No companies have been found yet. Click the 'Billing/Pricing' button to upgrade your account."
            />
          </div>
        </>
      ) : (
        <div className="space-y-8 md:gap-6 md:grid md:grid-cols-2 xl:grid-cols-3 md:space-y-0">
          {companiesData?.data?.map((item: any) => (
            <div key={item._id}>
              <div className="max-w-[400px] p-6 border border-slate-300 dark:border-muted bg-white dark:bg-muted">
                <div className="flex justify-end">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCompanyId(item._id);
                        setShowSendRequest(true);
                      } else {
                        setSelectedCompanyId("");
                      }
                    }}
                    checked={selectedCompanyId === item._id}
                    className=" accent-[#33A852] w-4 h-4 border-2 border-red-800 cursor-pointer"
                  />
                </div>
                <div className="p-6 border-b-[1.3px] border-slate-200 text-black flex flex-col items-center">
                  <div>
                    {item?.avatarImage ? (
                      <Image
                        src={item?.avatarImage}
                        alt="profile image"
                        width={100}
                        height={100}
                        priority
                        className="w-[100px] h-[100px] rounded-full object-cover border-[1.3px] border-slate-200"
                      />
                    ) : (
                      <Image
                        src={UserAvatar}
                        width={100}
                        height={100}
                        className="w-[100px] h-[100px] rounded-full object-cover"
                        alt="avatar picture"
                      />
                    )}
                  </div>

                  <p className="text-xl font-medium text-center dark:text-accent-foreground">
                    <span>{item?.companyName} </span>
                  </p>
                  <p className="font-light text-sm dark:text-accent-foreground">
                    Registered Company
                  </p>
                </div>

                <p className="font-medium my-3">About</p>
                <p className="font-light text-sm text-ellipsis  line-clamp-2">
                  {item?.aboutMe}
                </p>
                <div className="space-y-2 my-3 font-light text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={24} />
                    <span> Accredited by SURCON</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={24} />
                    <span>Resides in {item?.state}</span>
                  </div>
                </div>
                <p className="font-medium">Expertise</p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  <p className="bg-[#E6E9EB] p-2 dark:text-primary-foreground">
                    Engineering
                  </p>
                  <p className="bg-[#E6E9EB] p-2 dark:text-primary-foreground">
                    Cadastral
                  </p>
                  <p className="bg-[#E6E9EB] p-2 dark:text-primary-foreground">
                    GIS/Remote
                  </p>
                  <p className="bg-[#E6E9EB] p-2 dark:text-primary-foreground">
                    Drone Piloting
                  </p>
                  <p className="bg-[#E6E9EB] p-2 dark:text-primary-foreground">
                    Topographical
                  </p>
                  <p className="bg-[#E6E9EB] p-2 dark:text-primary-foreground">
                    Hydrographical
                  </p>
                </div>
                {/* === PROFILE BUTTON === */}
                <div className="flex gap-3 justify-between">
                  <Link
                    href={`/student-dashboard/${item?._id}`}
                    className="bg-[#33A852] text-xs md:text-md w-[120px] md:w-[150px] text-center text-white p-2 mt-12 mx-auto cursor-pointer flex items-center justify-center"
                  >
                    View Profile
                  </Link>

                  <p
                    onClick={() => {
                      setSelectedCompanyId(item._id);
                      setShowSendRequest(true);
                    }}
                    className="bg-[#D92D20] text-xs md:text-md  w-[120px] md:w-[150px] text-center text-white p-2.5 lg:p-3 mt-12 mx-auto cursor-pointer flex items-center justify-center"
                  >
                    Send Request <Send className="ml-1.5" size={12} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Sheet show={showSendRequest} onClose={() => setShowSendRequest(false)}>
        <SendRequest
          setShowSendRequest={setShowSendRequest}
          userData={userData}
          token={token}
          selectedCompanyId={selectedCompanyId}
        />
      </Sheet>
    </>
  );
}
