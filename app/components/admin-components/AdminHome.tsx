"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UsersList from "@/app/components/admin-components/UsersList";
import StatisticsCard from "@/app/components/cards/StatisticsCard";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Sheet } from "@/app/components/sheets/Sheet";
import AddUser from "./AddUser";

interface AdminHomeProps {
  token: any;
}
export default function AdminHome({ token }: AdminHomeProps) {
  const [showAddUser, setShowAddUser] = useState(false);
  return (
    <>
      <main className="flex min-h-screen flex-col pt-32">
        <div className="md:flex items-center md:space-x-4">
          <div className="w-full">
            <p className="text-gray-600 text-lg font-semibold">Manage Users</p>
            <p className="text-sm text-gray-500 font-normal">
              Administer user accounts and privileges within the platform.
            </p>
          </div>
          <div
            onClick={() => setShowAddUser(true)}
            className="my-4 flex p-2 md:p-3 justify-center items-center gap-[8px] rounded-[8px] text-white md:w-[200px] lg:w-[200px] cursor-pointer  px-3.5 py-4 font-light shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
          >
            <p className="text-[#FFFFFF] text-sm md:text-md">Create user</p>
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>

        <div className="my-8 grid space-y-6 lg:space-y-0 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-6">
          <StatisticsCard title={"Total Users"} value={50} />
          <StatisticsCard title={"Total Companies"} value={10} />
          <StatisticsCard title={"Total Students"} value={30} />
          <StatisticsCard title={"Average Completion Time"} value={3} />
        </div>

        <UsersList token={token} />
      </main>

      {/*============ SHEETS ============ */}
      {/* === Add User === */}
      <Sheet show={showAddUser} onClose={() => setShowAddUser(false)}>
        <AddUser setShowAddUser={setShowAddUser} />
      </Sheet>

      <ToastContainer />
    </>
  );
}
