"use client";
import { useState } from "react";
import RequestsList from "@/app/components/admin-components/RequestsList";
import StatisticsCard from "@/app/components/cards/StatisticsCard";
import { GetAllNotifications } from "@/app/services/request.request";
import { useQuery } from "@tanstack/react-query";
import { StatisticsSkeleton } from "@/app/components/skeletons/StatisticsSkeleton";
import Trash from "@/app/components/trash/Trash";
import { useDebounce } from "use-debounce";

interface RequestsHomeProps {
  token: any;
}
export default function RequestsHome({ token }: RequestsHomeProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ["getNotificationsApi", currentPage],
    queryFn: () => GetAllNotifications(token, currentPage, limit),
  });

  return (
    <main className="flex min-h-screen flex-col pt-24 lg:pt-32">
      <div className="w-full">
        <p className="text-gray-600 text-lg font-semibold dark:text-accent-foreground">
          Manage Requests
        </p>
        <p className="text-sm text-gray-500 font-normal">
          Administer user requests and notifications within the platform.
        </p>
      </div>
      {notificationsData?.data?.length === 0 ? (
        <div className="gap-2 my-6">
          <Trash
            headingText="No Request yet"
            subHeadingText="No request have been made yet. Check back later!."
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
                title={"Requests"}
                value={notificationsData?.meta?.totalRequests}
              />
              <StatisticsCard
                title={"Approved"}
                value={notificationsData?.meta?.totalApproved}
              />
              <StatisticsCard
                title={"Declined"}
                value={notificationsData?.meta?.totalDeclined}
              />
              <StatisticsCard
                title={"Interested"}
                value={notificationsData?.meta?.totalInterested}
              />
            </div>
          )}

          <RequestsList
            token={token}
            notificationsData={notificationsData}
            isLoading={isLoading}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            limit={limit}
            setSearch={setSearch}
          />
        </>
      )}
    </main>
  );
}
