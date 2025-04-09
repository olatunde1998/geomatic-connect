"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import UserAvatar from "@/public/images/profile-pic.png";
import { GetUserByIdRequest } from "@/app/services/request.request";
import { ChevronRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DeleteUserRequest,
  UpdateUserProfileRequest,
} from "@/app/services/users.request";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface UsersDetailsProps {
  token?: any;
  userId?: any;
}

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name must be greater than 3 letters"),
  companyName: yup
    .string()
    .required("Company Name is required")
    .min(3, "Company Name must be greater than 3 letters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email format"),
  aboutMe: yup
    .string()
    .required("About is required")
    .min(3, "About must be greater than 3 words"),
  mobileNumber: yup
    .number()
    .required("Mobile is required")
    .min(3, " must be greater than 8 letters"),
  companyAddress: yup
    .string()
    .required("Address is required")
    .min(3, "Address must be greater than 3 words"),
  institutionName: yup
    .string()
    .required("Institution is required")
    .min(3, "Institution must be greater than 3 characters"),
  state: yup.string(),
});

export default function UsersDetails({ token, userId }: UsersDetailsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: userProfileData } = useQuery({
    queryKey: ["getAllUserDetailsApi"],
    queryFn: () => GetUserByIdRequest(userId, token),
  });

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  // Default values when userProfileData is available
  useEffect(() => {
    if (userProfileData) {
      setValue("fullName", userProfileData.data.fullName);
      setValue("companyName", userProfileData.data.companyName);
      setValue("aboutMe", userProfileData.data.aboutMe);
      setValue("email", userProfileData.data.email);
      setValue("mobileNumber", userProfileData.data.phoneNumber);
      setValue("companyAddress", userProfileData.data.companyAddress);
      setValue("institutionName", userProfileData.data.institutionName);
      setValue("state", userProfileData.data.state);
    }
  }, [userProfileData, setValue]);

  // Submit handler for the form
  const onSubmitHandler = async (data: any) => {
    setIsUpdating(true);
    console.log(selectedFile, "this is the file selected===");
    console.log(selectedDocument, "this is the document selected===");

    try {
      const formData = new FormData();
      formData.append("fullName", data?.fullName);
      formData.append("companyName", data?.companyName);
      formData.append("aboutMe", data.aboutMe);
      formData.append("email", data?.email);
      formData.append("phoneNumber", data?.mobileNumber);
      formData.append("companyAddress", data?.companyAddress);
      formData.append("institutionName", data?.institutionName);

      // Only append files if they are selected
      if (selectedFile) {
        formData.append("avatarImage", selectedFile);
      }
      if (selectedDocument) {
        formData.append("documentFile", selectedDocument);
      }

      const response = await UpdateUserProfileRequest(userId, token, formData);
      console.log(response, "this is response here====");
      toast.success(response?.message);
      queryClient.invalidateQueries({ queryKey: ["getAllUserDetailsApi"] });
      queryClient.invalidateQueries({ queryKey: ["getUsersApi"] });
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete User Request Logic
  const deleteUserHandler = async () => {
    setIsDeleting(true);
    try {
      const response = await DeleteUserRequest(userId, token);
      console.log(response, "response data:");
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
      <form onSubmit={handleSubmit(onSubmitHandler)}>
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

          <div className="my-10 rounded-md px-6 py-6 bg-gray-100 flex justify-between">
            <div>
              <p className="font-bold text-left">
                {userProfileData?.data?.fullName ||
                  userProfileData?.data?.companyName}
              </p>
              <div className="items-center flex flex-col justify-center md:flex-row md:flex md:items-center md:justify-start mt-6 max-w-[400px]">
                {userProfileData?.data?.avatarImage ? (
                  <div className="relative rounded-full mr-10 w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center">
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
            <div className="flex flex-col justify-between items-end">
              <div className="flex flex-col gap-6 items-end justify-end md:flex-row md:items-center">
                <a
                  href={userProfileData?.data?.documentFile || "#"}
                  onClick={(e) => {
                    if (!userProfileData?.data?.documentFile) {
                      e.preventDefault();
                      toast.error("No available document");
                    }
                  }}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="font-semibold text-right inline-block text-[#33A852] underline text-xs md:text-sm lg:text-base"
                >
                  View Document
                </a>
                <button
                  disabled={isUpdating}
                  className="w-[100px] md:w-[150px] px-1.5 py-1.5 md:px-3 md:py-3 font-light text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045] rounded-sm"
                >
                  {isUpdating ? (
                    <span className="flex space-x-4 gap-3">
                      <LoaderCircle /> Updating
                    </span>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
              <p className="text-xs mt-2.5 md:text-base">
                Subscription Plan: {userProfileData?.data?.subscription}
              </p>
            </div>
          </div>

          <section className="items-start space-y-6">
            <section className="md:grid md:grid-cols-2 gap-3 space-y-6 md:space-y-0">
              {/* === Name === */}
              <div>
                <span className="text-sm text-gray-500 font-normal">Name</span>
                <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                  <div className="py-0.5 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                    {userProfileData?.data?.fullName ? (
                      <input
                        type="text"
                        placeholder="Full name"
                        {...register("fullName")}
                        className={`${
                          errors.fullName && "border-[1.3px] border-red-500"
                        } w-full border border-slate rounded-sm p-3 focus:outline-none text-sm`}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Company name"
                        {...register("companyName")}
                        className={`${
                          errors.companyName && "border-[1.3px] border-red-500"
                        } w-full border border-slate rounded-sm p-3 focus:outline-none text-sm`}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* === Email Address === */}
              <div>
                <span className="text-sm text-gray-500 font-normal">Email</span>
                <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                  <div className="py-0.5 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                      className={`${
                        errors.email && "border-[1.3px] border-red-500"
                      } w-full border border-slate rounded-sm p-3 focus:outline-none  text-sm`}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="md:grid md:grid-cols-2 gap-3 space-y-6 md:space-y-0">
              {/* === Contact Number === */}
              <div>
                <span className="text-sm text-gray-500 font-normal">
                  Contact Number
                </span>
                <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                  <div className="py-0.5 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                    <input
                      type="number"
                      {...register("mobileNumber")}
                      placeholder="(+234) 81 3364 ****"
                      className="w-full border border-slate rounded-sm p-3 focus:outline-none mt-1 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* ===  Company Address or Students Institution === */}
              {userProfileData?.data?.companyAddress && (
                <div>
                  <span className="text-sm text-gray-500 font-normal">
                    Company Address
                  </span>
                  <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                    <div className="py-0.5 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                      <input
                        type="text"
                        {...register("companyAddress")}
                        placeholder="Address"
                        className="w-full border border-slate rounded-sm p-3 focus:outline-none mt-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
              {userProfileData?.data?.institutionName && (
                <div>
                  <span className="text-sm text-gray-500 font-normal">
                    Institution Attended
                  </span>
                  <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                    <div className="py-0.5 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                      <input
                        type="text"
                        {...register("institutionName")}
                        placeholder="Institution"
                        className="w-full border border-slate rounded-sm p-3 focus:outline-none mt-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
            {/* ===  State   === */}
            <div>
              <span className="text-sm text-gray-500 font-normal">State</span>
              <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                <div className="py-0.5 focus:outline-none placeholder:text-sm custom-placeholder bg-transparent text-black">
                  <input
                    type="text"
                    {...register("state")}
                    disabled
                    placeholder="State"
                    className="w-full border border-slate rounded-sm p-3 focus:outline-none mt-1 text-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* === Description  === */}
            <div>
              <span className="text-sm text-gray-500 font-normal">About</span>
              <div className="bg-gray-100 flex flex-col w-full pt-2 px-4 pb-1 rounded-md border-[1.3px] border-slate-300">
                <textarea
                  className="p-3 focus:outline-none text-sm placeholder:text-sm cursor-text custom-placeholder text-black"
                  placeholder="Description"
                  rows={8}
                  cols={60}
                  {...register("aboutMe")}
                />
              </div>
            </div>
          </section>

          {/* === Submit Button === */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => deleteUserHandler()}
              disabled={isDeleting}
              className="w-[150px] mt-10 px-1.5 py-1.5 md:px-3 md:py-3 font-light text-white shadow-sm bg-gradient-to-r from-[#D92D20] to-[#F97316] rounded-sm"
            >
              <span className="text-sm md:text-base">
                {isDeleting ? "Deleting...." : "Delete User"}
              </span>
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
