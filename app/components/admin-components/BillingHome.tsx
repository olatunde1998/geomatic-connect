"use client";
import { useState } from "react";
import TransactionList from "@/app/components/admin-components/TransactionList";
import StatisticsCard from "@/app/components/cards/StatisticsCard";
import { useQuery } from "@tanstack/react-query";
import { GetAllSubscriptions } from "@/app/services/payment.request";

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
        <p className="text-gray-600 text-lg font-semibold">
          Manage Transactions
        </p>
        <p className="text-sm text-gray-500 font-normal">
          Administer transactions histories within the platform.
        </p>
      </div>
      <div className="my-8 grid space-y-6 lg:space-y-0 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-6">
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

      <TransactionList
        subscriptionData={subscriptionData}
        isLoading={isLoading}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        limit={limit}
      />
    </main>
  );
}
