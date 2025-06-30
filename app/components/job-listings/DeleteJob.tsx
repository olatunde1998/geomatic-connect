"use client";
import { CircleAlert } from "lucide-react";
import { useState } from "react";

interface DeleteJobProps {
  setShowConfirmDelete?: any;
  deleteJobHandler: () => Promise<void>;
}

export default function DeleteJob({
  setShowConfirmDelete,
  deleteJobHandler,
}: DeleteJobProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="bg-white p-8 rounded-[0.63rem]  mx-auto">
      <div className="bg-[#FEF3F2] p-3 w-fit rounded-full mx-auto">
        <div className="bg-[#FEE4E2] p-3 rounded-full">
          <CircleAlert color="#DE3024" size={32} />
        </div>
      </div>
      <h2 className="text-xl mb-4 text-center mt-6 ">Delete Job</h2>
      <p className="text-md  text-center text-[#6C748B]">
        Are you sure you want to delete this Job?
      </p>
      {/*======= Cancel Button and Delete Button ====== */}
      <div className="mt-12 flex space-x-4">
        <div
          className="border-[1.5px] border-slate-300 dark:text-primary-foreground rounded-[8px] px-[28px] py-[12px] cursor-pointer text-center w-full lg:w-[230px]"
          onClick={() => setShowConfirmDelete(false)}
        >
          Cancel
        </div>
        <button
          type="button"
          className={
            "bg-gradient-to-r from-[#D92D20] to-[#F97316] rounded-[8px] text-white px-[28px] cursor-pointer py-[12px]  text-center  w-full lg:w-[230px] whitespace-nowrap"
          }
          onClick={async () => {
            setIsDeleting(true);
            await deleteJobHandler();
            setIsDeleting(false);
            setShowConfirmDelete(false);
          }}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
