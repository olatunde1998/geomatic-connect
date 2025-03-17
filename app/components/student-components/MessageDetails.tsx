import { motion, AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { formatDate } from "@/utils/utils";
import { X } from "lucide-react";

interface MessageDetailsProps {
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  messageData: any;
}

export default function MessageDetails({
  setShowMessage,
  messageData,
}: MessageDetailsProps) {
  return (
    <>
      <div className="text-[#575D72]">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="z-50 md:w-[500px]"
          >
            <div className="border-2 bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-row items-center justify-between space-y-0 pb-3">
                <h3 className="text-lg font-semibold">
                  {messageData?.status} Payment
                </h3>
                <button
                  onClick={() => setShowMessage(false)}
                  className="rounded-md gap-6 hover:bg-slate-100 p-2"
                >
                  <X className="size-5" />
                </button>
              </div>
              <p className="text-sm max-w-[200px] md:max-w-none">
                Here&apos;s your notification summary!
              </p>

              <div>
                <div className="border rounded-lg mt-7">
                  <div className="flex justify-between text-sm font-normal border-b p-3">
                    <span>Payment Status</span>{" "}
                    <span>{messageData?.status}</span>
                  </div>

                  <div className="flex justify-between text-sm font-normal border-b p-3">
                    <span>Amount Paid</span> <span>₦{messageData?.amount}</span>
                  </div>

                  <div className="flex justify-between text-sm font-normal border-b p-3">
                    <span>Subscription</span> <span></span>
                  </div>

                  <div className="flex justify-between text-sm font-normal p-3">
                    <span>Date</span>{" "}
                    <span>{formatDate(messageData?.createdAt)}</span>
                  </div>
                </div>
                {/*======= Close Button ====== */}
                <div className="mt-10 flex space-x-4">
                  <button
                    type="button"
                    className="bg-red-800 rounded-[8px] text-white px-[28px] cursor-pointer py-[12px]  text-center  w-full"
                    onClick={() => setShowMessage(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
