"use client";
import { StatisticsSkeleton } from "@/app/components/skeletons/StatisticsSkeleton";
import LineTrendChart from "@/app/components/charts/LineTrendChart";
import StatisticsCard from "@/app/components/cards/StatisticsCard";
import { GetUsersRequest } from "@/app/services/users.request";
import { Calendar, Gift, Mail, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Trash from "@/app/components/trash/Trash";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chartData } from "@/utils/chartData";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import Link from "next/link";

interface OverviewHomeProps {
  token: any;
}
export default function OverviewHome({ token }: OverviewHomeProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["getUsersApi", currentPage, debouncedSearch],
    queryFn: () => GetUsersRequest(token, currentPage, limit, debouncedSearch),
  });

  return (
    <>
      <main>
        <div className="md:flex items-center md:space-x-4">
          <div className="w-full">
            <p className="text-2xl font-bold mb-2">Overview</p>
            <p className="text-sm text-gray-500 font-normal">
              Analytics of your recent activities
            </p>
          </div>
        </div>
        {userData?.data?.length === 0 && !debouncedSearch ? (
          <div className="gap-2 my-6">
            <Trash
              headingText="Start Adding Users"
              subHeadingText="No users have been added yet. Click the 'Add User' button above to create a new user."
            />
          </div>
        ) : (
          <>
            {isLoading ? (
              <div>
                <StatisticsSkeleton />
              </div>
            ) : (
              <div className="my-8 grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-6">
                <StatisticsCard
                  title={"Total Applications"}
                  value={userData?.meta?.totalUsers}
                />
                <StatisticsCard
                  title={"Active Applications"}
                  value={userData?.meta?.totalCompanies}
                />
                <StatisticsCard
                  title={"Approved Applications"}
                  value={userData?.meta?.totalStudents}
                />
                <StatisticsCard
                  title={"Declined Applications"}
                  value={userData?.meta?.totalAdmins}
                />
              </div>
            )}
          </>
        )}
        <section>
          <div className="space-y-4 md:space-y-0 md:flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">MoM application activity</p>
              <p className="text-sm text-gray-500 font-normal">
                Average: 0.0 applications per day
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="cursor-pointer">7 Days</span>
              <span className="bg-slate-200 rounded-lg px-2 py-1.5 cursor-pointer">
                14 Days{" "}
              </span>
              <span className="cursor-pointer">30 Days</span>
            </div>
          </div>
          <LineTrendChart data={chartData} />
        </section>

        <section className="pt-6 pb-10">
          <div>
            <p className="font-bold text-lg">Recent Activity</p>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="flex gap-4 text-sm">
                <div className="bg-slate-200 p-2 rounded-full w-10 h-9 flex items-center justify-center">
                  <Gift className="size-4" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-gray-500 w-full">
                    Updated Mid-level frontend developer status to Applied
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 font-normal">
                    Jan 5, 2025
                  </p>
                </div>
              </div>

              <div className="flex gap-4 text-sm">
                <div className="bg-slate-200 p-2 rounded-full w-10 h-9 flex items-center justify-center">
                  <Gift className="size-4" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-gray-500 w-full">
                    Updated Mid-level frontend developer status to Applied
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 font-normal">
                    Jan 5, 2025
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="bg-slate-200 p-2 rounded-full w-10 h-9 flex items-center justify-center">
                  <Gift className="size-4" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-gray-500 w-full">
                    Updated Mid-level frontend developer status to Applied
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 font-normal">
                    Jan 5, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-6 pb-10">
          <div>
            <p className="font-bold text-lg">Account Details</p>
            <div className="mt-6">
              <div className="text-sm bg-slate-100 p-6 rounded-xl">
                <div className="flex gap-3 items-center font-bold">
                  <Zap className="size-6" />
                  <span className="text-base">Free Plan</span>
                </div>

                <p className="text-sm md:text-base text-gray-500 w-full mt-3 mb-5">
                  Upgrade to Pro for unlimited job applications and AI features.
                </p>
                <Link
                  href="/student-dashboard/billing"
                  className="text-xs md:text-sm text-white font-normal bg-green-400 p-2.5 rounded-lg"
                >
                  Upgrade to Pro
                </Link>
              </div>
              <div className="flex flex-col gap-3 py-6">
                <div className="flex gap-3 items-center">
                  <Mail className="size-4" />
                  <span className="text-sm">olatunde336@gmail.com</span>
                </div>{" "}
                <div className="flex gap-3 items-center">
                  <Calendar className="size-4" />
                  <span className="text-sm">Member since January 1, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer />
    </>
  );
}
