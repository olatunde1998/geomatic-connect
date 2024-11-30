"use client"
import RequestsList from "@/app/components/admin-components/RequestsList";
import StatisticsCard from "@/app/components/cards/StatisticsCard";
import { GetAllNotifications } from "@/app/services/request.request";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface RequestsHomeProps {
  token: any;
}
export default function RequestsHome({ token }: RequestsHomeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ["getNotificationsApi", currentPage],
    queryFn: () => GetAllNotifications(token, currentPage, limit),
  });

  return (
    <main className="flex min-h-screen flex-col pt-32">
      <div className="w-full">
        <p className="text-gray-600 text-lg font-semibold">
          Manage Notifications
        </p>
        <p className="text-sm text-gray-500 font-normal">
          Administer user requests and notifications within the platform.
        </p>
      </div>
      <div className="my-8 grid space-y-6 lg:space-y-0 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-6">
        <StatisticsCard title={"Total Requests"} value={notificationsData?.meta?.totalRequests} />
        <StatisticsCard title={"Total Approved"} value={notificationsData?.meta?.totalApproved} />
        <StatisticsCard title={"Total Declined"} value={notificationsData?.meta?.totalDeclined} />
        <StatisticsCard title={"Total Interested"} value={notificationsData?.meta?.totalInterested} />
      </div>

      <RequestsList token={token} notificationsData={notificationsData} isLoading={isLoading} setCurrentPage={setCurrentPage} currentPage={currentPage} limit={limit} />
    </main>
  );
}
