"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Clock, LoaderCircle } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetUserNotifications,
  UpdateUserNotificationRequest,
} from "@/app/services/notifications.request";
import Trash from "@/app/components/trash/Trash";
import { formatTimestamp } from "@/utils/utils";
import { Modal } from "@/app/components/modals/Modal";
import MessageDetails from "@/app/components/student-components/MessageDetails";
import DeleteNotification from "@/app/components/student-components/DeleteNotification";

interface NotificationProps {
  token: string;
  setSelectedBillingCycleTab?: any;
  selectedBillingCycleTab?: any;
}

export default function Notification({ token }: NotificationProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);

  // refetch data with Invalidate
  const queryClient = useQueryClient();

  const { data: notificationData, isLoading } = useQuery({
    queryKey: ["getUserNotificationApi", currentPage],
    queryFn: () => GetUserNotifications(token, currentPage, limit),
  });
  // Update Submission Handler
  const updateNotificationHandler = async (
    notificationId: any,
    read: boolean,
    messageInfo: any
  ) => {
    setShowMessage(true);
    setMessageData(messageInfo);
    const body = {
      read: read === false ? true : false,
    };
    try {
      if (read === true) {
        return;
      } else {
        await UpdateUserNotificationRequest(notificationId, token, body);
        await queryClient.invalidateQueries({
          queryKey: ["getUserNotificationApi"],
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <section>
        {/* ==== Headings and Tab ===== */}
        <div className="flex justify-between items-center pl-6 py-6">
          <p className="text-sm">Your Current Notifications:</p>
        </div>
        {isLoading ? (
          <div className="pt-[80px] pb-[150px]">
            <LoaderCircle className="size-12 animate-spin duration-500 mx-auto mt-8" />
          </div>
        ) : notificationData?.data?.length === 0 ? (
          <div className="gap-2 md:mb-24">
            <Trash
              headingText="No notification found yet"
              subHeadingText="Kindly Please, Click the 'Pricing / Billing' button above to upgrade your plan"
            />
          </div>
        ) : (
          <>
            {notificationData?.data?.map((item: any, index: any) => (
              <div
                key={index}
                className={`${
                  !item.read && "bg-[#b8d2f033]"
                } px-6 pt-4 cursor-pointer`}
              >
                <div
                  className={`${
                    index !== notificationData?.data.length - 1 && "border-b"
                  } md:flex justify-between md:gap-4 mt-4  pb-8`}
                >
                  <div className="flex gap-4 w-full">
                    <div
                      onClick={() => {
                        setMessageData(item);
                        setShowDeleteNotification(true);
                      }}
                      className={`${
                        !item.read
                          ? "hover:bg-[#b8d2f033]"
                          : "hover:bg-slate-100"
                      } cursor-pointer h-fit w-fit p-1.5`}
                    >
                      <X />
                    </div>
                    <div
                      onClick={() => {
                        updateNotificationHandler(item?._id, item?.read, item);
                      }}
                      className="w-full"
                    >
                      <p
                        className={`${
                          item.status === "Success"
                            ? "bg-[#33A852]"
                            : "bg-[#D92D20]"
                        } bg-[#33A852] text-[#FFFFFF] rounded-lg w-fit py-1 px-2 text-sm`}
                      >
                        {item.status} Payment
                      </p>
                      <p className="font-semibold text-base">Hey there 👋</p>
                      <p className="text-sm max-w-[550px] leading-2 font-light mt-3">
                        {item.message}
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      updateNotificationHandler(item?._id, item?.read, item);
                    }}
                    className="text-slate-300 text-sm flex justify-end mt-3 md:mt-0 md:justify-center gap-2 md:whitespace-nowrap"
                  >
                    <p>
                      <Clock size={16} className="mt-0.5" />
                    </p>
                    <p>{formatTimestamp(item.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </section>
      <ToastContainer />

      {/* ===Message Details Modal ===== */}
      <Modal show={showMessage} onClose={() => setShowMessage(false)}>
        <MessageDetails
          setShowMessage={setShowMessage}
          messageData={messageData}
        />
      </Modal>
      <Modal
        show={showDeleteNotification}
        onClose={() => setShowDeleteNotification(false)}
      >
        <DeleteNotification
          setShowDeleteNotification={setShowDeleteNotification}
          token={token}
          messageData={messageData}
        />
      </Modal>
    </>
  );
}
