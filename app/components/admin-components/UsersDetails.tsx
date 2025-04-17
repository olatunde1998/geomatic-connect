"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import UserAvatar from "@/public/images/profile-pic.png";
import { GetUserByIdRequest } from "@/app/services/request.request";
import { ChevronRight, LoaderCircle, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DeleteUserRequest,
  UpdateUserProfileRequest,
} from "@/app/services/users.request";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactSelect from "../inputs/ReactSelect";
import { accomodationData } from "@/utils/FilterData";

interface UsersDetailsProps {
  token?: any;
  userId?: any;
}

const getValidationSchema = (userData: any) => {
  const shouldValidateFullName = userData?.fullName;
  const shouldValidateInstitution = userData?.institutionName;
  const shouldValidateAccomodation = userData?.accomodation;
  const shouldValidateCompanyAddress = userData?.companyAddress;
  const shouldValidateCompanyName = userData?.companyName;

  return yup.object().shape({
    ...(shouldValidateFullName && {
      fullName: yup
        .string()
        .required("Full Name is required")
        .min(3, "Full Name must be greater than 3 letters"),
    }),

    ...(shouldValidateInstitution && {
      institutionName: yup
        .string()
        .required("Institution is required")
        .min(3, "Institution must be greater than 3 characters"),
    }),

    ...(shouldValidateAccomodation && {
      accomodation: yup
        .boolean()
        .typeError("Accomodation is required")
        .required("Accomodation is required"),
    }),

    ...(shouldValidateCompanyAddress && {
      companyAddress: yup
        .string()
        .required("Address is required")
        .min(10, "Address must be at least 10 characters long"),
    }),

    ...(shouldValidateCompanyName && {
      companyName: yup
        .string()
        .required("Company Name is required")
        .min(3, "Company Name must be greater than 3 letters"),
    }),

    email: yup
      .string()
      .required("Email is required")
      .email("Invalid Email format"),

    aboutMe: yup
      .string()
      .required("About is required")
      .min(10, "About must be at least 10 characters long"),

    mobileNumber: yup
      .string()
      .required("Mobile is required")
      .matches(/^\d{8,}$/, "Mobile number must be at least 8 digits"),

    state: yup.string(),
  });
};

export default function UsersDetails({ token, userId }: UsersDetailsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userImage, setUserImage] = useState<string | undefined>(undefined);
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
    reset,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(getValidationSchema(userProfileData?.data)),
  });
  const accomodationValue = watch("accomodation");
  console.log(userProfileData?.data, "this is data hereo=====");
  // Default values when userProfileData is available
  useEffect(() => {
    if (userProfileData) {
      reset({
        fullName: userProfileData.data.fullName,
        companyName: userProfileData.data.companyName,
        aboutMe: userProfileData.data.aboutMe,
        email: userProfileData.data.email,
        mobileNumber: userProfileData.data.phoneNumber,
        companyAddress: userProfileData.data.companyAddress,
        institutionName: userProfileData.data.institutionName,
        accomodation: userProfileData.data.accomodation,
        state: userProfileData.data.state,
      });
    }
  }, [userProfileData, reset]);

  // Uploading avatar(profile image) logic
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const isValidFileType = (type: string) =>
      ["image/jpg", "image/png", "image/jpeg", "image/webp"].includes(type);

    if (files && files[0]) {
      const file = files[0];
      if (isValidFileType(file.type)) {
        setUserImage(URL.createObjectURL(files[0]));
        setSelectedFile(file);
      } else {
        toast.error(
          "Unsupported file type. Please upload a JPG, PNG, WEBP or JPEG"
        );
      }
    }
  };

  // Submit handler for the form
  const onSubmitHandler = async (data: any) => {
    setIsUpdating(true);

    try {
      const formData = new FormData();
      const appendIfExists = (formData: FormData, key: string, value: any) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      };

      appendIfExists(formData, "aboutMe", data.aboutMe);
      appendIfExists(formData, "email", data.email);
      appendIfExists(formData, "phoneNumber", data.mobileNumber);
      appendIfExists(formData, "fullName", data.fullName);
      appendIfExists(formData, "institutionName", data.institutionName);
      appendIfExists(formData, "companyAddress", data.companyAddress);
      appendIfExists(formData, "companyName", data.companyName);
      appendIfExists(formData, "accomodation", data.accomodation);
      if (selectedFile) formData.append("avatarImage", selectedFile);

      const response = await UpdateUserProfileRequest(userId, token, formData);
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
        <div className="bg-[#FFFFFF] w-full pt-20 md:pb-10 max-w-3xl">
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
              <label
                htmlFor="avatarInput"
                className="w-fit p-3 flex  justify-between tracking-wide cursor-pointer"
              >
                <input
                  type="file"
                  name="user_Image"
                  id="avatarInput"
                  accept=".png,  .jpg, .jpeg, .webp"
                  className="hidden input-field"
                  onChange={handleFileChange}
                />
                <div className="items-center flex flex-col justify-center md:flex-row md:flex md:items-center md:justify-start mt-6 max-w-[400px]">
                  {userImage || userProfileData?.data?.avatarImage ? (
                    <div className="relative cursor-pointer">
                      <div className="rounded-full mr-10 w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                        <Image
                          src={userImage || userProfileData?.data?.avatarImage}
                          fill
                          alt="user avatar"
                          className="rounded-full"
                        />
                      </div>
                      <Upload className="relative left-28 bottom-4 bg-white rounded-full w-[32px] h-[32px] p-2" />
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
                      <Upload className="relative left-20 bottom-10 bg-white rounded-full w-[32px] h-[32px] p-2" />
                    </div>
                  )}
                </div>
              </label>
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
                      <LoaderCircle className="animate-spin" /> Updating...
                    </span>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
              <p className="text-xs mt-2.5 md:text-base">
                <span className="font-bold text-lg"> Plan:</span>{" "}
                {userProfileData?.data?.subscription}
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
                    {userProfileData?.data?.fullName && (
                      <input
                        type="text"
                        placeholder="Full name"
                        {...register("fullName")}
                        className={`${
                          errors.fullName && "border-[1.3px] border-red-500"
                        } w-full border border-slate rounded-sm p-3 focus:outline-none text-sm`}
                      />
                    )}{" "}
                    {userProfileData?.data?.companyName && (
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
            <section
              className={`${userProfileData?.data?.companyName ? "md:grid md:grid-cols-2 gap-3 space-y-6 md:space-y-0" : ""}`}
            >
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

              {/* ======= Accomodation ===== */}
              {userProfileData?.data?.companyName && (
                <div>
                  <label
                    htmlFor="accomodation"
                    className="text-sm text-gray-500 font-normal"
                  >
                    Accomodation Avalability
                  </label>
                  <div className="flex flex-col w-full pt-2 px-4 pb-1 rounded-md bg-gray-100 border-[1.3px] border-slate-300">
                    <div
                      className={`${
                        errors.accomodation
                          ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                          : ""
                      } mt-2 rounded-md cursor-pointer  w-full`}
                    >
                      <ReactSelect
                        options={accomodationData}
                        placeholder="Your Accomodation"
                        padding={"4px"}
                        borderRadius={"5px"}
                        border={
                          errors.accomodation ? "" : "border border-slate"
                        }
                        backgroundColor={
                          errors.accomodation ? "#FEF3F2" : "#ffffff"
                        }
                        value={accomodationData.find(
                          (option) => option.value === accomodationValue
                        )}
                        onChange={(option: any) => {
                          setValue("accomodation", option?.value);
                          trigger("accomodation");
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

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
        </div>
      </form>
      {/* === Submit Button === */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => deleteUserHandler()}
          disabled={isDeleting}
          className="w-[150px] mt-8 px-1.5 py-1.5 md:px-3 md:py-3 md:mt-0 font-light text-white shadow-sm bg-gradient-to-r from-[#D92D20] to-[#F97316] rounded-sm"
        >
          <span className="text-sm md:text-base">
            {isDeleting ? "Deleting...." : "Delete User"}
          </span>
        </button>
      </div>
    </>
  );
}
