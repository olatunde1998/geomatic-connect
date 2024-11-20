"use client";
import {
  GetUserProfileRequest,
  UpdateUserProfileRequest,
} from "@/app/services/users.request";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderCircle } from "lucide-react";

interface SettingsProps {
  token?: String;
  userId?: String;
}

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name must be greater than 3 letters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email format"),
  mobileNumber: yup
    .number()
    .required("Mobile is required")
    .min(3, " must be greater than 8 letters"),
});

export default function Settings({ token, userId }: SettingsProps) {
  const [userImage, setUserImage] = useState<string | undefined>(undefined);
  const [userDocument, setUserDocument] = useState<string | undefined>(
    undefined
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: userProfileData } = useQuery({
    queryKey: ["getUserProfileApi"],
    queryFn: () => GetUserProfileRequest(userId, token),
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
      setValue("email", userProfileData.data.email);
      setValue("mobileNumber", userProfileData.data.phoneNumber);
    }
  }, [userProfileData, setValue]);

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
        fileType === "image/jpeg"
      ) {
        setUserImage(URL.createObjectURL(files[0]));
        setSelectedFile(file);
      } else {
        toast.error("Unsupported file type. Please upload a JPG, PNG, or JPEG");
      }
    }
  };

  // Uploading document logic
  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const fileType = file.type;

      console.log(fileType, "this is the file type");

      if (
        fileType === "image/jpg" ||
        fileType === "image/png" ||
        fileType === "image/jpeg" ||
        fileType === "application/pdf"
      ) {
        setUserDocument(URL.createObjectURL(file));
        setSelectedDocument(file);
      } else {
        toast.error(
          "Unsupported file type. Please upload a JPG, PNG, JPEG, or PDF."
        );
      }
    }
  };

  // Submit handler for the form
  const onSubmitHandler = async (data: any) => {
    setIsUpdating(true);
    console.log(selectedFile, "this is the file selected===");
    console.log(selectedDocument, "this is the document selected===");
    if (selectedFile && selectedDocument) {
      const formData = new FormData();
      formData.append("fullName", data?.fullName);
      formData.append("email", data?.email);
      formData.append("phoneNumber", data?.mobileNumber);
      formData.append("avatarImage", selectedFile);
      formData.append("documentFile", selectedDocument);

      const body = formData;
      try {
        const response = await UpdateUserProfileRequest(userId, token, body);
        console.log(response, "this is response here====");
        toast.success(response?.message);
        queryClient.invalidateQueries({ queryKey: ["getUserProfileApi"] });
        queryClient.invalidateQueries({ queryKey: ["getUsersApi"] });
      } catch (error: any) {
        console.log(error?.response?.data?.message);
        toast.error(error?.response?.message);
      } finally {
        setIsUpdating(false);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {/* ====Full Name === */}
        <div>
          <label htmlFor="name">
            <span>Full Name</span>
            <input
              type="text"
              placeholder="Full name"
              {...register("fullName")}
              className={`${
                errors.fullName && "border-[1.3px] border-red-500"
              } w-full border border-slate rounded-sm p-3 focus:outline-none mt-2 text-sm`}
            />
          </label>
        </div>

        {/* ====Email === */}
        <div className="mt-3">
          <label htmlFor="email">
            <span>Email</span>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              disabled
              className={`${
                errors.email && "border-[1.3px] border-red-500"
              } w-full border border-slate rounded-sm p-3 focus:outline-none mt-2 text-sm text-muted-foreground cursor-not-allowed`}
            />
          </label>
        </div>
        {/* ====Phon Number === */}
        <div className="mt-3">
          <label htmlFor="mobileNumber">
            <span>Mobile Number</span>
            <input
              type="number"
              {...register("mobileNumber")}
              placeholder="(+234) 81 3364 ****"
              className="w-full border border-slate rounded-sm p-3 focus:outline-none mt-2 text-sm"
            />
          </label>
        </div>

        {/* =====Profile Picture ===== */}
        <section>
          <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-6 md:px-10 md:pt-6 md:pb-6 rounded-xl bg-white max-w-[540px] mt-6">
            <p className="">Profile picture</p>
            <div className="flex items-center justify-center space-x-2 md:space-x-6 bg-white rounded-2xl  border-[0.6px] border-slate-300 mt-4 cursor-pointer">
              <label
                htmlFor="avatarInput"
                className="w-full p-3 flex  justify-between tracking-wide cursor-pointer"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <p className="w-full text-center">Upload image</p>
                  <input
                    type="file"
                    name="user_Image"
                    id="avatarInput"
                    accept=".png,  .jpg, .jpeg"
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
                    <div className="border-2 border-slate-800 rounded-full relative mx-auto w-[45px]">
                      <Image
                        src={userProfileData?.data?.avatarImage}
                        alt="user avatar"
                        width={100}
                        height={100}
                        className="rounded-full w-[45px] h-[35px]"
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* =====Documents  ===== */}
        <section>
          <div className="border-[0.5px] border-slate-300 px-4 pt-3 pb-6 md:px-10 md:pt-6 md:pb-6 rounded-xl bg-white max-w-[540px] mt-6">
            <p className="">User Document</p>
            <div className="flex items-center justify-center space-x-2 md:space-x-6 bg-white rounded-2xl  border-[0.6px] border-slate-300 mt-4 cursor-pointer">
              <label
                htmlFor="documentInput"
                className="w-full p-3 flex  justify-between tracking-wide cursor-pointer"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <p className="w-full text-center">Upload docs</p>
                  <input
                    type="file"
                    name="document_Image"
                    id="documentInput"
                    accept=".png, .jpg, .jpeg, .pdf, .doc, .docx"
                    className="hidden input-field"
                    onChange={handleDocumentChange}
                  />

                  {userDocument && (
                    <div className="border-2 border-slate-800 rounded-full relative mx-auto w-[45px]">
                      <Image
                        src={userDocument}
                        alt="user document"
                        width={100}
                        height={100}
                        className="rounded-full w-[45px] h-[35px]"
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>

            <a
              href={`${userProfileData?.data?.documentFile}`}
              rel="noopener noreferrer"
              target="_blank"
              className="font-semibold mt-2 w-full text-right inline-block text-[#33A852] underline"
            >
              View Document
            </a>
          </div>
        </section>

        <div className="">
          <button
            disabled={isUpdating}
            className=" mt-6 rounded-md  px-3.5 py-2 font-light text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]  cursor-pointer"
          >
            {isUpdating ? (
              <span className="flex space-x-4 gap-3">
                <LoaderCircle /> Updating
              </span>
            ) : (
              "Save Now"
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
