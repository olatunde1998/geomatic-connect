"use client";
import { GetUserProfileRequest } from "@/app/services/users.request";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { institutionData, stateData } from "@/utils/FilterData";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name must be greater than 3 letters"),
  aboutMe: yup
    .string()
    .required("About is required")
    .min(3, "About must be greater than 50 words"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email format"),
  mobileNumber: yup
    .number()
    .required("Mobile is required")
    .min(3, " must be greater than 8 letters"),
  institutionName: yup
    .string()
    .required("Institution is required")
    .min(3, " must be greater than 10 letters"),
  state: yup.string().required("State is required"),
});

export default function EditJob() {
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
    watch,
    trigger,
  } = useForm({ resolver: yupResolver(schema) });
  const institutionNameValue = watch("institutionName");
  const stateValue = watch("state");

  // Default values when userProfileData is available
  useEffect(() => {
    if (userProfileData) {
      setValue("fullName", userProfileData.data.fullName);
      setValue("aboutMe", userProfileData.data.aboutMe);
      setValue("email", userProfileData.data.email);
      setValue("mobileNumber", userProfileData.data.phoneNumber);
      setValue("institutionName", userProfileData.data.institutionName);
      setValue("state", userProfileData.data.state);
    }
  }, [userProfileData, setValue]);

  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);

  // Initialize Quill
  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["link", "image"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
            // handlers: {
            //   image: imageHandler,
            // },
          },
        },
      });

      // Update content state on change
      quillInstance.current.on("text-change", () => {
        // setBlogData((prev) => ({
        //   ...prev,
        //   content: quillInstance.current!.root.innerHTML,
        // }));
      });
    }
  }, []);

  // Submit handler for the form
  const onSubmitHandler = async (data: any) => {
    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("fullName", data?.fullName);
      formData.append("aboutMe", data.aboutMe);
      formData.append("email", data?.email);
      formData.append("phoneNumber", data?.mobileNumber);
      formData.append("state", data?.state);
      formData.append("institutionName", data?.institutionName);

      //   const response = await UpdateUserProfileRequest(userId, token, formData);
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getUserProfileApi"] });
      queryClient.invalidateQueries({ queryKey: ["getUsersApi"] });
    } catch (error: any) {
      toast.error(error?.response?.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-md md:min-w-[600px] lg:min-w-[700px] mx-auto p-5 bg-white border border-gray-200 rounded-lg mb-4">
      <h1 className="text-2xl font-bold mb-2">Job Listing Form</h1>
      <p className="text-muted-foreground mb-6">
        This form allows you to create or edit a job listing.
      </p>
      {/* Job listing form content will go here */}
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="lg:grid grid-cols-2 md:gap-6 max-w-[1400px]">
          <div>
            {/* ====Job Title === */}
            <div>
              <label htmlFor="name">
                <span className="text-sm font-medium">Job Title</span>
                <input
                  type="text"
                  placeholder="Cadastral Surveyor"
                  {...register("fullName")}
                  className={`${
                    errors.fullName && "border-[1.3px] border-red-500"
                  } w-full border border-slate rounded-sm p-3 focus:outline-none mt-1 text-sm`}
                />
              </label>
            </div>
            {/* =====Experience Level ===== */}
            <section>
              <div className="rounded-xl bg-white dark:bg-background max-w-[540px] mt-4">
                <label htmlFor="state" className="text-sm font-medium">
                  Experience Level
                </label>
                <div
                  className={`${
                    errors.state ? "border-[1.3px] border-red-500" : ""
                  } flex flex-col w-full`}
                >
                  <ReactSelect
                    options={stateData}
                    placeholder="Your Location"
                    value={stateData.find(
                      (option) => option.value === stateValue
                    )}
                    onChange={(option: any) => {
                      setValue("state", option?.value || "");
                      trigger("state"); // Trigger validation
                    }}
                  />
                </div>
              </div>
            </section>
            {/* === Accommodation Dropdown Input === */}
            <div className="mt-3">
              <label htmlFor="institutionName" className="text-sm font-medium">
                Accommodation
              </label>
              <div
                className={`${
                  errors.institutionName ? "border-[1.3px] border-red-500" : ""
                } flex flex-col w-full`}
              >
                <ReactSelect
                  options={institutionData}
                  placeholder="Institution name"
                  value={institutionData.find(
                    (option) => option.value === institutionNameValue
                  )}
                  onChange={(option: any) => {
                    setValue("institutionName", option?.value || "");
                    trigger("institutionName"); // Trigger validation
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            {/* === Location Requirement Input === */}
            <section>
              <label htmlFor="state" className="text-sm font-medium">
                Location Requirement
              </label>
              <div
                className={`${
                  errors.state ? "border-[1.3px] border-red-500" : ""
                } flex flex-col w-full`}
              >
                <ReactSelect
                  options={stateData}
                  placeholder="Your Location"
                  value={stateData.find(
                    (option) => option.value === stateValue
                  )}
                  onChange={(option: any) => {
                    setValue("state", option?.value || "");
                    trigger("state"); // Trigger validation
                  }}
                />
              </div>
            </section>
            {/* =====Experience Level ===== */}
            <section>
              <div className="rounded-xl bg-white dark:bg-background max-w-[540px] mt-4">
                <label htmlFor="state" className="text-sm font-medium">
                  Experience Level
                </label>
                <div
                  className={`${
                    errors.state ? "border-[1.3px] border-red-500" : ""
                  } flex flex-col w-full`}
                >
                  <ReactSelect
                    options={stateData}
                    placeholder="Your Location"
                    value={stateData.find(
                      (option) => option.value === stateValue
                    )}
                    onChange={(option: any) => {
                      setValue("state", option?.value || "");
                      trigger("state"); // Trigger validation
                    }}
                  />
                </div>
              </div>
            </section>

            {/* ===== Job Type  ===== */}
            <section>
              <div className="rounded-xl bg-white dark:bg-background max-w-[540px] mt-4">
                <label htmlFor="state" className="text-sm font-medium">
                  Job Type
                </label>
                <div
                  className={`${
                    errors.state ? "border-[1.3px] border-red-500" : ""
                  } flex flex-col w-full`}
                >
                  <ReactSelect
                    options={stateData}
                    placeholder="Your Location"
                    value={stateData.find(
                      (option) => option.value === stateValue
                    )}
                    onChange={(option: any) => {
                      setValue("state", option?.value || "");
                      trigger("state"); // Trigger validation
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* ====== Description ===== */}
        <div className="sm:col-span-2">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <div ref={editorRef} style={{ height: "500px" }} />
        </div>

        <div>
          <button
            disabled={isUpdating}
            className="w-full mt-6 rounded-md  px-3.5 py-2 font-light text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]  cursor-pointer"
          >
            {isUpdating ? (
              <span className="flex space-x-4 gap-3">
                <LoaderCircle className="animate-spin" /> Updating...
              </span>
            ) : (
              "Save Now"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
