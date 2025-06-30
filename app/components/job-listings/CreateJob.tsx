"use client";
import { CreateJobRequest } from "@/app/services/job.request";
import {
  accommodationData,
  experienceData,
  jobTypeData,
  stateData,
} from "@/utils/FilterData";
import ReactSelect from "@/app/components/inputs/ReactSelect";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { formats, modules } from "@/utils/utils";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const schema = yup.object().shape({
  jobTitle: yup
    .string()
    .required("Job Title is required")
    .min(3, "Job Title must be greater than 3 letters"),
  location: yup.string().required("Location is required"),
  experienceLevel: yup.string().required("Experience Level is required"),
  accommodation: yup
    .mixed<true | false>()
    .oneOf([true, false], "Accommodation is required")
    .required("Accommodation is required"),
  jobType: yup.string().required("Job Type is required"),
});

interface CreateJobProps {
  userId?: string;
  token: string;
  setShowCreateJob?: any;
}
export default function CreateJob({
  userId,
  token,
  setShowCreateJob,
}: CreateJobProps) {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // REACT HOOK FORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({ resolver: yupResolver(schema) });
  const experienceLevelValue = watch("experienceLevel");
  const locationValue = watch("location");
  const jobTypeValue = watch("jobType");

  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);

  // Initialize Quill
  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: modules.toolbar,
          },
        },
        formats: formats,
      });
    }
  }, []);

  // Submit handler for the form
  const onSubmitHandler = async (data: any) => {
    setIsCreating(true);
    const jobDescription = quillInstance.current.root.innerHTML;
    try {
      const payload = {
        experienceLevel: data?.experienceLevel,
        accommodation: data?.accommodation,
        jobTitle: data?.jobTitle,
        location: data?.location,
        jobType: data?.jobType,
        companyId: userId,
        jobDescription,
      };

      const response = await CreateJobRequest(payload, token);
      toast.success(response.message || "Job created successfully");
      queryClient.invalidateQueries({ queryKey: ["getJobsApi"] });
      setShowCreateJob(false);
    } catch (error: any) {
      toast.error(error?.response?.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-md md:min-w-[600px] lg:min-w-[700px] mx-auto p-5 bg-white border border-gray-200 rounded-lg mb-4">
      <h1 className="text-2xl font-bold mb-2">Create Job</h1>
      <p className="text-muted-foreground mb-6">
        This form allows you to create a job listing.
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
                  {...register("jobTitle")}
                  className={`${
                    errors.jobTitle && "border-[1.3px] border-red-500"
                  } w-full border border-slate p-3 py-5 focus:outline-none text-sm`}
                />
              </label>
            </div>
            {/* =====Experience Level ===== */}
            <section>
              <div className="rounded-xl bg-white dark:bg-background max-w-[540px] mt-4">
                <label
                  htmlFor="experienceLevel"
                  className="text-sm font-medium"
                >
                  Experience Level
                </label>
                <div
                  className={`${
                    errors.experienceLevel
                      ? "border-[1.3px] border-red-500"
                      : ""
                  } flex flex-col w-full`}
                >
                  <ReactSelect
                    options={experienceData}
                    placeholder="Your Experience Level"
                    value={experienceData.find(
                      (option) => option.value === experienceLevelValue
                    )}
                    onChange={(option: any) => {
                      setValue("experienceLevel", option?.value || "");
                      trigger("experienceLevel");
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
          <div>
            {/* === Location Requirement Input === */}
            <section>
              <label htmlFor="location" className="text-sm font-medium">
                Location Requirement
              </label>
              <div
                className={`${
                  errors.location ? "border-[1.3px] border-red-500" : ""
                } flex flex-col w-full`}
              >
                <ReactSelect
                  options={stateData}
                  placeholder="Your Location"
                  value={stateData.find(
                    (option) => option.value === locationValue
                  )}
                  onChange={(option: any) => {
                    setValue("location", option?.value || "");
                    trigger("location");
                  }}
                />
              </div>
            </section>

            {/* ===== Job Type  ===== */}
            <section>
              <div className="rounded-xl bg-white dark:bg-background max-w-[540px] mt-4">
                <label htmlFor="jobType" className="text-sm font-medium">
                  Job Type
                </label>
                <div
                  className={`${
                    errors.jobType ? "border-[1.3px] border-red-500" : ""
                  } flex flex-col w-full`}
                >
                  <ReactSelect
                    options={jobTypeData}
                    placeholder="Select Job Type"
                    value={jobTypeData.find(
                      (option) => option.value === jobTypeValue
                    )}
                    onChange={(option: any) => {
                      setValue("jobType", option?.value || "");
                      trigger("jobType");
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* === Accommodation Dropdown Input === */}
        <div className="mt-3 mb-5">
          <label htmlFor="accomodation" className="text-sm font-medium">
            Accommodation
          </label>
          <div
            className={`${
              errors.accommodation ? "border-[1.3px] border-red-500" : ""
            } flex flex-col w-full`}
          >
            <ReactSelect
              options={accommodationData}
              placeholder="Select Accommodation"
              onChange={(option: any) => {
                setValue("accommodation", option?.value);
                trigger("accommodation");
              }}
            />
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
            disabled={isCreating}
            className="w-full mt-6 rounded-md flex items-center justify-center  px-3.5 py-2 font-light text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]  cursor-pointer"
          >
            {isCreating ? (
              <span className="flex space-x-4 gap-3">
                <LoaderCircle className="animate-spin" /> Creating...
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
