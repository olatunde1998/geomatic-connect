"use client";
import { RegisterRequest } from "@/app/services/auth.request";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from "react-phone-number-input";
import { accomodationData, stateData } from "@/utils/FilterData";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import * as yup from "yup";

interface AddUserProps {
  setShowAddCompany?: any;
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
  accomodation: yup.string().required("Accomodation is required"),
  professionalId: yup.string().required("Professional ID is required"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .min(7, "Password must be at least 7 characters")
    .max(14, "Password must not exceed 14 characters"),
});

export default function AddCompany({ setShowAddCompany }: AddUserProps) {
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
    if (files && files[0]) {
      const file = files[0];
      console.log(files[0].type, "this is the file type");

      const fileType = files[0].type;
      if (
        fileType === "image/jpg" ||
        fileType === "image/png" ||
        fileType === "image/jpeg" ||
        fileType === "image/webp"
      ) {
        setUserImage(URL.createObjectURL(files[0]));
        setSelectedFile(file);
      } else {
        toast.error(
          "Unsupported file type. Please upload a JPG, PNG, WEBP or JPEG"
        );
      }
    }
  };

  //Create Company submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("companyName", data?.companyName);
      formData.append("companyAddress", data.companyAddress);
      formData.append("email", data?.email);
      formData.append("aboutMe", data?.aboutMe);
      formData.append("state", data?.state);
      formData.append("accomodation", data?.accomodation);
      formData.append("professionalId", data?.professionalId);
      formData.append("phoneNumber", data?.mobileNumber);
      formData.append("password", "987654321");
      formData.append("role", "Company");

      // Only append files if they are selected
      if (selectedFile) {
        formData.append("avatarImage", selectedFile);
      }

      const response = await RegisterRequest(formData);
      console.log(response?.message, "this is message");
      toast.success(response?.message);
      await queryClient.invalidateQueries({ queryKey: ["getUsersApi"] });
      setShowAddCompany(false);
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
            <p>Add New Company</p>
            <button
              onClick={() => setShowAddCompany(false)}
              className="rounded-md gap-6 hover:bg-slate-100 p-2"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* ===FORM SECTION === */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <section className="items-start space-y-6">
            {/* === Company Name === */}
            <div>
              <label
                htmlFor="companyName"
                className="text-sm text-gray-500 font-normal"
              >
                Company Name
              </label>
              <div
                className={`${
                  errors.companyName
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : "border-[1.3px] border-[#6C748B]"
                } mt-2 flex flex-col w-full pt-2 px-4 pb-1  rounded-md`}
              >
                <input
                  className={`${
                    errors.companyName ? "bg-[#FEF3F2]" : ""
                  } dark:bg-[#FFFFFF] py-1 focus:outline-none cursor-text placeholder:text-sm`}
                  type="text"
                  placeholder="NIS"
                  {...register("companyName")}
                  maxLength={24}
                />
              </div>
            </div>

            {/* ===Company Address === */}
            <div>
              <label
                htmlFor="companyAddress"
                className="text-sm text-gray-500 font-normal"
              >
                Company Address
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
                  placeholder="Company Address *"
                  {...register("companyAddress")}
                />
              </div>
            </div>

            {/* ===== Company Email  ===== */}
            <div>
              <label
                htmlFor="companyAddress"
                className="text-sm text-gray-500 font-normal"
              >
                Company Email
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
                  placeholder="Company Email *"
                  {...register("email")}
                  maxLength={40}
                />
              </div>
            </div>

            {/* ======= Company State (Location) ===== */}
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

            {/* ======= Professional ID (SURCON ID) ===== */}
            <div className="mt-4">
              <label
                htmlFor="professionalId"
                className="text-sm text-gray-500 font-normal"
              >
                Professional ID
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

            {/* ======= Company Mobile Number ===== */}
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

            {/* ======= Accomodation ===== */}
            <div>
              <label
                htmlFor="state"
                className="text-sm text-gray-500 font-normal"
              >
                Accomodation Avalability
              </label>
              <div
                className={`${
                  errors.accomodation
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : ""
                } mt-2 rounded-md cursor-pointer  w-full`}
              >
                <ReactSelect
                  options={accomodationData}
                  placeholder="Your Location"
                  padding={"4px"}
                  borderRadius={"5px"}
                  border={errors.accomodation ? "" : "1px solid #6C748B"}
                  backgroundColor={errors.accomodation ? "#FEF3F2" : "#ffffff"}
                  onChange={(option: any) => {
                    setValue("accomodation", option?.value || "");
                    trigger("accomodation");
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <span className="text-sm text-gray-500 font-normal">
                About Company
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
            {/* =======  Company Logo ======== */}
            <div>
              <div className="border-[1.3px] border-[#6C748B] px-4 pt-3 pb-6 md:px-6 md:pt-6 md:pb-6 rounded-xl bg-white max-w-[540px] mt-6">
                <p className="text-sm font-medium">Company Logo</p>
                <div className="flex items-center justify-center space-x-2 md:space-x-6 bg-white rounded-2xl  border-[1.3px] border-dashed border-[#6C748B] mt-4 cursor-pointer">
                  <label
                    htmlFor="companyInput"
                    className="w-full p-3 flex  justify-between tracking-wide cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <p className="w-full text-center">Upload image</p>
                      <input
                        type="file"
                        name="company_Image"
                        id="companyInput"
                        accept=".png,  .jpg, .jpeg, .webp"
                        className="hidden input-field"
                        onChange={handleFileChange}
                      />

                      {userImage ? (
                        <div className="border-2 border-slate-800 rounded-full relative mx-auto w-[45px]">
                          <Image
                            src={userImage}
                            alt="company avatar"
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
              {isSaving ? "Creating...." : "Create Company"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
