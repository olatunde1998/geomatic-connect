"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import UserAvatar from "@/public/images/profile-pic.png";
import { GetUserByIdRequest } from "@/app/services/request.request";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { DeleteUserRequest } from "@/app/services/users.request";
import { ToastContainer } from "react-toastify";

interface UsersDetailsProps {
  token?: any;
  userId?: any;
}

export default function UsersDetails({ token, userId }: UsersDetailsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: userProfileData } = useQuery({
    queryKey: ["getAllUserDetailsApi"],
    queryFn: () => GetUserByIdRequest(userId, token),
  });

  // Delete User Request Logic
  const deleteUserHandler = async () => {
    setIsDeleting(true);
    try {
      const response = await DeleteUserRequest(userId, token);
      console.log(response, "response data:")
      await queryClient.invalidateQueries({
        queryKey: ["getUsersApi"],
      });
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-[#FFFFFF] w-full pt-20 md:pb-20 max-w-3xl">
        <div>
          <div className="flex items-center justify-between border-b border-slate-300 pb-6">
            <div className="flex items-center">
              <p
                onClick={() => router.back()}
                className=" cursor-pointer text-base md:text-xl font-bold text-gray-400"
              >
                Home
              </p>
              <ChevronRight size={24} className="mx-0.5" />
              <p className="cursor-text text-base  md:text-xl font-bold">
                Users Details
              </p>
            </div>
          </div>
        </div>

        <div className="my-10 rounded-md md:px-6 py-6 bg-gray-100 flex justify-between">
          <div>
            <p className="font-bold text-center md:text-left">
              {userProfileData?.data?.fullName ||
                userProfileData?.data?.companyName}
            </p>
            <div className="items-center flex flex-col justify-center md:flex-row md:flex md:items-center md:justify-start mt-6 max-w-[400px]">
              {userProfileData?.data?.avatarImage ? (
                <div className="relative rounded-full mr-10 w-[100px] h-[100px] flex items-center justify-center">
                  <Image
                    src={userProfileData?.data?.avatarImage}
                    fill
                    alt="user avatar"
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="mb-4  mr-0 w-[90px] h-[100px] md:h-[100px] md:w-[100px] md:mb-0 md:mr-6">
                  <Image
                    src={UserAvatar}
                    width={100}
                    height={100}
                    className="w-full h-full"
                    alt="avatar picture"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <a
              href={userProfileData?.data?.documentFile || "#"}
              onClick={(e) => {
                if (!userProfileData?.data?.documentFile) {
                  e.preventDefault();
                  toast.error(
                    "No available document"
                  );
                }
              }}
              rel="noopener noreferrer"
              target="_blank"
              className="font-semibold text-right mt-2 inline-block text-[#33A852] underline"
            >
              View Document
            </a>
            <p>Subscription Plan: {userProfileData?.data?.subscription}</p>
          </div>
        </div>

        <section className="items-start space-y-6">
          <section className="md:grid md:grid-cols-2 gap-3">
            {/* === Full Name === */}
            <div>
              <span className="text-sm text-gray-500 font-normal">Name</span>
              <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                  {userProfileData?.data?.fullName ||
                    userProfileData?.data?.companyName}
                </p>
              </div>
            </div>
            {/* === Email Address === */}
            <div>
              <span className="text-sm text-gray-500 font-normal">Email</span>
              <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                  {userProfileData?.data?.email}
                </p>
              </div>
            </div>
          </section>

          <section className="md:grid md:grid-cols-2 gap-3">
            {/* === Contact Number === */}
            <div>
              <span className="text-sm text-gray-500 font-normal">
                Contact Number
              </span>
              <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                  {userProfileData?.data?.phoneNumber}
                </p>
              </div>
            </div>

            {/* ===  Company Address or Students Institution === */}
            {userProfileData?.data?.companyAddress && (
              <div>
                <span className="text-sm text-gray-500 font-normal">
                  Company Address
                </span>
                <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                  <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                    {userProfileData?.data?.companyAddress}
                  </p>
                </div>
              </div>
            )}
            {userProfileData?.data?.institutionName && (
              <div>
                <span className="text-sm text-gray-500 font-normal">
                  Institution Attended
                </span>
                <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                  <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                    {userProfileData?.data?.institutionName}
                  </p>
                </div>
              </div>
            )}
          </section>
          {/* === State   === */}
          <div>
            <span className="text-sm text-gray-500 font-normal">State</span>
            <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
              <p className="py-2 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                {userProfileData?.data?.state}
              </p>
            </div>
          </div>

          {/* === Description  === */}
          <div>
            <span className="text-sm text-gray-500 font-normal">About</span>
            <div className="bg-gray-100 flex flex-col w-full pt-2 px-4 pb-1 rounded-md border-[1.3px] border-slate-300">
              <textarea
                className="py-2 focus:outline-none placeholder:text-sm cursor-text custom-placeholder text-black bg-gray-100"
                placeholder="Description"
                rows={8}
                cols={60}
                value={userProfileData?.data?.aboutMe}
              />
            </div>
          </div>
        </section>

        {/* === Submit Button === */}
        <div className="flex justify-between gap-6">
          <button
            onClick={() => deleteUserHandler()}
            disabled={isDeleting}
            className="w-[150px] mt-10 px-1.5 py-1.5 md:px-3.5 md:py-4 font-light text-white shadow-sm bg-gradient-to-r from-[#D92D20] to-[#F97316]"
          >
            <span className="text-sm md:text-base">
              {isDeleting ? "Deleting...." : "Delete User"}
            </span>
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
