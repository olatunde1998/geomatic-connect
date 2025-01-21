"use client";
import { CircleAlert } from "lucide-react";
import { useState } from "react";

interface DeclineMessageProps {
  setShowConfirmDecline?: any;
  handleDeclinedRequest: (requestId: any) => Promise<void>;
  requestId: any;
}

export default function DeclineMessage({ setShowConfirmDecline,  handleDeclinedRequest, 
  requestId  }: DeclineMessageProps) {
  const [isDeclining, setIsDeclining] = useState(false);

  return (
    <div className="bg-white p-8 rounded-[0.63rem]  mx-auto">
      <div className="bg-[#FEF3F2] p-3 w-fit rounded-full mx-auto">
        <div className="bg-[#FEE4E2] p-3 rounded-full">
          <CircleAlert color="#DE3024" size={32} />
        </div>
      </div>
      <h2 className="text-xl mb-4 text-center mt-6 ">Decline Request</h2>
      <p className="text-md  text-center text-[#6C748B]">
        Are you sure you want to decline this Request?
      </p>
      {/*======= Cancel Button and Delete Button ====== */}
      <div className="mt-12 flex space-x-4">
        <div
          className="border-[1.5px] border-slate-300 dark:text-primary-foreground rounded-[8px] px-[28px] py-[12px] cursor-pointer text-center w-full lg:w-[230px]"
          onClick={() => setShowConfirmDecline(false)}
        >
          Cancel
        </div>
        <button
          type="button"
          className={
            "bg-gradient-to-r from-[#D92D20] to-[#F97316] rounded-[8px] text-white px-[28px] cursor-pointer py-[12px]  text-center  w-full lg:w-[230px] whitespace-nowrap"
          }
          onClick={async () => {
            setIsDeclining(true);
            await handleDeclinedRequest(requestId);
            setIsDeclining(false);
            setShowConfirmDecline(false);
          }}
          disabled={isDeclining}
        >
          {isDeclining ? "Declining..." : "Decline"}
        </button>
      </div>
    </div>
  );
}
