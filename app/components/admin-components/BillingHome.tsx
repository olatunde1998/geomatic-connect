"use client";
import { useState } from "react";
import TransactionList from "@/app/components/admin-components/TransactionList";
import StatisticsCard from "@/app/components/cards/StatisticsCard";
import { useQuery } from "@tanstack/react-query";
import { GetAllSubscriptions } from "@/app/services/payment.request";
import { StatisticsSkeleton } from "@/app/components/skeletons/StatisticsSkeleton";
import Trash from "@/app/components/trash/Trash";

interface BillingHomeProps {
  token: any;
}

export default function BillingHome({ token }: BillingHomeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  const { data: subscriptionData, isLoading } = useQuery({
    queryKey: ["getSubscriptionsApi", currentPage],
    queryFn: () => GetAllSubscriptions(currentPage, limit),
  });

  return (
    <main className="flex min-h-screen flex-col pt-24 lg:pt-32">
      <div className="w-full">
        <p className="text-gray-600 text-lg font-semibold dark:text-accent-foreground">
          Manage Transactions
        </p>
        <p className="text-sm text-gray-500 font-normal">
          Administer transactions histories within the platform.
        </p>
      </div>

      {subscriptionData?.data?.length === 0 ? (
        <div className="gap-2 my-6">
          <Trash
            headingText="No Billing yet"
            subHeadingText="No billing have been made yet. Check back later."
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
                title={"Total Transaction"}
                value={subscriptionData?.meta?.totalTransactions}
              />
              <StatisticsCard
                title={"Success Transaction"}
                value={subscriptionData?.meta?.totalSuccess}
              />
              <StatisticsCard
                title={"Failed Transaction"}
                value={subscriptionData?.meta?.totalFailed}
              />
              <StatisticsCard
                title={"Abandoned Transaction"}
                value={subscriptionData?.meta?.totalAbandoned}
              />
            </div>
          )}

          <TransactionList
            subscriptionData={subscriptionData}
            isLoading={isLoading}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            limit={limit}
          />
        </>
      )}
    </main>
  );
}
