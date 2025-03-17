"use client";
import { DeleteNotificationRequest } from "@/app/services/notifications.request";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { CircleAlert } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";

interface DeleteNotificationProps {
  setShowDeleteNotification: Dispatch<SetStateAction<boolean>>;
  token: any;
  messageData: any;
}

export default function DeleteNotification({
  setShowDeleteNotification,
  token,
  messageData,
}: DeleteNotificationProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const notificationId = messageData?._id;

  // refetch survey using Query client
  const queryClient = useQueryClient();

  // Delete Notification Logic
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await DeleteNotificationRequest(notificationId, token);
      console.log(JSON.stringify(response.data));
      toast.success(response?.message);
      await queryClient.invalidateQueries({
        queryKey: ["getUserNotificationApi"],
      });
      setShowDeleteNotification(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-8 rounded-[0.63rem] md:w-[70%] mx-auto"
        >
          <div className="bg-[#FEF3F2] p-3 w-fit rounded-full mx-auto">
            <div className="bg-[#FEE4E2] p-3 rounded-full">
              <CircleAlert color="#DE3024" size={32} />
            </div>
          </div>
          <h2 className="text-xl mb-4 text-center mt-6 ">
            Delete Notification
          </h2>
          <p className="text-md  text-center text-[#6C748B]">
            Are you sure you want to delete
            <span className="text-[#D92D20]">
              {" "}
              selected Notification ?{" "}
            </span>{" "}
            This action cannot be undone
          </p>
          {/*======= Cancel Button and Delete Button ====== */}
          <div className="mt-12 flex space-x-4">
            <div
              className="border-[1.5px] border-slate-300 rounded-[8px] px-[28px] py-[12px] cursor-pointer text-center w-full"
              onClick={() => setShowDeleteNotification(false)}
            >
              Cancel
            </div>
            <button
              type="button"
              className={
                "bg-[#D92D20] hover:bg-[#D92D20]/90 rounded-[8px] text-white px-[28px] cursor-pointer py-[12px]  text-center  w-full"
              }
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
