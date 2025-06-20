"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import { RegisterRequest } from "@/app/services/auth.request";
import { toast } from "sonner";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import { stateData } from "@/utils/FilterData";
import Image from "next/image";

interface AddTeamMateProps {
  setShowAddTeamMate?: any;
}

const schema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  companyAddress: yup.string().required("Company Address is required"),
  aboutMe: yup
    .string()
    .required("About is required")
    .min(3, "About must be greater than 50 words"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email format"),
  state: yup.string().required("State is required"),
  professionalId: yup.string().required("Professional ID is required"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .min(7, "Password must be at least 7 characters")
    .max(14, "Password must not exceed 14 characters"),
});

export default function AddTeamMate({ setShowAddTeamMate }: AddTeamMateProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [userImage, setUserImage] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // refetch users
  const queryClient = useQueryClient();

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({ resolver: yupResolver(schema) });

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

  //Create TeamMate submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("companyName", data?.companyName);
      formData.append("companyAddress", data.companyAddress);
      formData.append("email", data?.email);
      formData.append("aboutMe", data?.aboutMe);
      formData.append("state", data?.state);
      formData.append("professionalId", data?.professionalId);
      formData.append("phoneNumber", data?.mobileNumber);
      formData.append("role", "Admin");
      // formData.append("password", "987654321");

      // Only append files if they are selected
      if (selectedFile) {
        formData.append("avatarImage", selectedFile);
      }

      const response = await RegisterRequest(formData);
      toast.success(response?.message);
      await queryClient.invalidateQueries({ queryKey: ["getUsersApi"] });
      setShowAddTeamMate(false);
    } catch (error: any) {
      console.log(error.response.message, "this is the error here===");
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="w-full md:pb-20 text-[#1F4D36]">
        <div>
          <div className="mb-8 md:mt-6 flex items-center justify-between text-[#33A852]">
            <p>Add Team Mate</p>
            <button
              onClick={() => setShowAddTeamMate(false)}
              className="rounded-md gap-6 hover:bg-slate-100 p-2"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* ===FORM SECTION === */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <section className="items-start space-y-6">
            {/* === Team Mate Name === */}
            <div>
              <label
                htmlFor="companyName"
                className="text-sm text-gray-500 font-normal"
              >
                Team Mate Name
              </label>
              <div
                className={`${
                  errors.companyName
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : "border-[1.3px] border-[#6C748B]"
                } mt-2 flex flex-col w-full pt-2 px-4 pb-1 rounded-md`}
              >
                <input
                  className={`${
                    errors.companyName ? "bg-[#FEF3F2]" : ""
                  } dark:bg-[#FFFFFF] py-1 focus:outline-none placeholder:text-sm cursor-not-allowed`}
                  type="text"
                  placeholder="Geomatic Connect"
                  {...register("companyName")}
                  maxLength={24}
                />
              </div>
            </div>

            {/* ===TeamMate Address === */}
            <div>
              <label
                htmlFor="companyAddress"
                className="text-sm text-gray-500 font-normal"
              >
                Team Mate Address
              </label>

              <div
                className={`${
                  errors.companyAddress
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : "border-[1.3px] border-[#6C748B]"
                } mt-2 flex flex-col w-full pt-2 px-4 pb-1 rounded-md`}
              >
                <input
                  className={`${
                    errors.companyAddress ? "bg-[#FEF3F2]" : ""
                  } dark:bg-[#FFFFFF] py-1 focus:outline-none cursor-text custom-placeholder placeholder:text-sm`}
                  type="text"
                  placeholder="Address *"
                  {...register("companyAddress")}
                />
              </div>
            </div>

            {/* ===== TeamMate Email  ===== */}
            <div>
              <label
                htmlFor="companyAddress"
                className="text-sm text-gray-500 font-normal"
              >
                Email Address
              </label>
              <div
                className={`${
                  errors.email
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : "border-[1.3px] border-[#6C748B]"
                } mt-2 flex flex-col w-full pt-2 px-4 pb-1 rounded-md`}
              >
                <input
                  className={`${
                    errors.email ? "bg-[#FEF3F2]" : ""
                  } dark:bg-[#FFFFFF] py-1 focus:outline-none cursor-text custom-placeholder placeholder:text-sm`}
                  type="email"
                  placeholder="team@company.work*"
                  {...register("email")}
                  maxLength={40}
                />
              </div>
            </div>

            {/* ======= TeamMate State (Location) ===== */}
            <div>
              <label
                htmlFor="state"
                className="text-sm text-gray-500 font-normal"
              >
                State
              </label>
              <div
                className={`${
                  errors.state
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : ""
                } mt-2 rounded-md cursor-pointer  w-full`}
              >
                <ReactSelect
                  options={stateData}
                  placeholder="Your Location"
                  padding={"4px"}
                  borderRadius={"5px"}
                  border={errors.state ? "" : "1px solid #6C748B"}
                  backgroundColor={errors.state ? "#FEF3F2" : "#ffffff"}
                  onChange={(option: any) => {
                    setValue("state", option?.value || "");
                    trigger("state");
                  }}
                />
              </div>
            </div>

            {/* ======= Team Mate ID (Geomatic Connect Id) ===== */}
            <div className="mt-4">
              <label
                htmlFor="professionalId"
                className="text-sm text-gray-500 font-normal"
              >
                Team Mate ID
              </label>
              <input
                type="text"
                placeholder="SC/LA/23..."
                {...register("professionalId")}
                maxLength={32}
                className={`${
                  errors.professionalId
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : "border-[1.3px] border-[#6C748B] rounded-md"
                }  dark:bg-[#FFFFFF] mt-2 px-3 py-2.5 focus:outline-none cursor-text flex justify-between rounded-lg w-full placeholder:text-sm`}
              />
            </div>

            {/* ======= TeamMate Mobile Number ===== */}
            <div className="mt-4 ">
              <label
                htmlFor="mobileNumber"
                className="text-sm text-gray-500 font-normal"
              >
                Contact Number
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                international={false}
                defaultCountry="NG"
                countries={["NG"]}
                onChange={(value: any) => {
                  setValue("mobileNumber", value || "");
                  trigger("mobileNumber");
                }}
                rules={{ required: true }}
                className={`${
                  errors.mobileNumber
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : "border-[1.3px] border-[#6C748B] rounded-md"
                } mt-2 phone-input input-phone-number bg-[#FFFFFF]`}
              />
            </div>

            <div className="mt-3">
              <span className="text-sm text-gray-500 font-normal">
                About Me
              </span>
              <div
                className={`${
                  errors.aboutMe
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : "border-[1.3px] border-[#6C748B] rounded-md"
                }  flex flex-col w-full pt-2 px-4 pb-1 mt-1`}
              >
                <textarea
                  className="py-2 focus:outline-none placeholder:text-sm cursor-text custom-placeholder bg-transparent text-black"
                  placeholder="Description"
                  rows={8}
                  cols={60}
                  {...register("aboutMe")}
                />
              </div>
            </div>
            {/* =======  Team Mate Avatar ======== */}
            <div>
              <div className="border-[1.3px] border-[#6C748B] px-4 pt-3 pb-6 md:px-10 md:pt-6 md:pb-6 rounded-xl bg-white max-w-[540px] mt-6">
                <p className="text-sm font-medium">Team Mate Avatar</p>
                <div className="flex items-center justify-center space-x-2 md:space-x-6 bg-white rounded-2xl  border-[1.3px] border-dashed border-[#6C748B] mt-4 cursor-pointer">
                  <label
                    htmlFor="teamMateAvatarInput"
                    className="w-full p-3 flex  justify-between tracking-wide cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <p className="w-full text-center">Upload image</p>
                      <input
                        type="file"
                        name="user_Image"
                        id="teamMateAvatarInput"
                        accept=".png,  .jpg, .jpeg, .webp"
                        className="hidden input-field"
                        onChange={handleFileChange}
                      />

                      {userImage ? (
                        <div className="border-2 border-slate-800 rounded-full relative mx-auto w-[45px]">
                          <Image
                            src={userImage}
                            alt="user avatar"
                            width={100}
                            height={100}
                            className="rounded-full w-[45px] h-[35px]"
                          />
                        </div>
                      ) : (
                        <div className="border-slate-800 border-[1.3px] border-dashed rounded-full flex items-center justify-center mx-auto w-[45px] h-[45px]">
                          <Upload
                            size={24}
                            className="rounded-full w-[45px] h-[24px]"
                          />
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* === Submit Button === */}
          <button
            disabled={isSaving}
            className="w-full mt-10  px-3.5 py-4 font-light text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045] rounded-sm"
          >
            <span className="text-base">
              {isSaving ? "Creating...." : "Add Team Mate"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
