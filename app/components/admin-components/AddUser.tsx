"use client";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { RegisterRequest } from "@/app/services/auth.request";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import { stateData } from "@/utils/FilterData";

interface AddUserProps {
  setShowAddUser?: any;
}

const schema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  companyAddress: yup.string().required("Company Address is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 32 characters"),
  state: yup.string().required("State is required"),
  professionalId: yup.string().required("Professional ID is required"),
  mobileNumber: yup.number().required("Mobile number is required"),
});

export default function AddUser({ setShowAddUser }: AddUserProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  //Create Company submission Logic
  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    const body = {
      companyName: data?.companyName,
      companyAddress: data?.companyAddress,
      email: data?.email,
      password: data?.password,
      state: data?.state,
      professionalId: data?.professionalId,
      phoneNumber: data?.mobileNumber,
      role: "Company",
    };
    try {
      const response = await RegisterRequest(body);
      console.log(response?.message, "this is message");
      toast.success(response?.message);
      await queryClient.invalidateQueries({ queryKey: ["getUsersApi"] });
    } catch (error: any) {
      console.log(error.response.message, "this is the error here===");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="w-full md:pb-20">
        <div>
          <div className="mb-8 md:mt-6 flex items-center justify-between text-[#33A852]">
            <p>Add New Company</p>
            <X onClick={() => setShowAddUser(false)} />
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
                  } py-1 focus:outline-none cursor-text placeholder:text-sm`}
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
                  } py-1 focus:outline-none cursor-text custom-placeholder placeholder:text-sm`}
                  type="text"
                  placeholder="Company Address *"
                  {...register("companyAddress")}
                  maxLength={24}
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
                  } py-1 focus:outline-none cursor-text custom-placeholder placeholder:text-sm`}
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
                  borderRadius={"10px"}
                  border="border-[1.3px] border-[#6C748B]"
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
                }  mt-2 px-3 py-2.5 focus:outline-none cursor-text flex justify-between rounded-lg w-full placeholder:text-sm`}
              />
            </div>

            {/* ======= Company Mobile Number ===== */}
            <div className="mt-4">
              <label
                htmlFor="mobileNumber"
                className="text-sm text-gray-500 font-normal"
              >
                Contact Number
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                international={true}
                countryCallingCodeEditable={false}
                defaultCountry="NG"
                onChange={(value: any) => {
                  setValue("mobileNumber", value || "");
                  trigger("mobileNumber");
                }}
                rules={{ required: true }}
                className={`${
                  errors.mobileNumber
                    ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                    : "border-[1.3px] border-[#6C748B] rounded-md"
                } mt-2 phone-input bg-[#FFFFFF] border border-[#FFFFFF]`}
              />
            </div>

            {/* =======  Password ======== */}
            <div className="mt-4 relative">
              <label
                htmlFor="password"
                className="text-sm text-gray-500 font-normal"
              >
                Password
              </label>
              <div>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
                  {...register("password")}
                  maxLength={32}
                  className={`${
                    errors.password
                      ? "border-[1.3px] border-red-500 bg-[#FEF3F2]"
                      : "border-[1.3px] border-[#6C748B] rounded-md"
                  } mt-2 pr-12 pl-3 py-2.5 focus:outline-none placeholder:text-sm cursor-text flex justify-between rounded-lg w-full`}
                />
              </div>
              <span
                className="absolute cursor-pointer bottom-3 right-2 pt-4 flex items-center mr-[0.25rem] text-[#FF8447]"
                onClick={() => setShowPassword(!showPassword)}
              >
                <BiHide
                  size={18}
                  className={
                    showPassword === false
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
                <BiShow
                  size={18}
                  className={
                    showPassword === true
                      ? "hidden items-center cursor-pointer"
                      : "text-gray-500"
                  }
                />
              </span>
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
