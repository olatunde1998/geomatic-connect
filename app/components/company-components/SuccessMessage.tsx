import { CircleCheckBig, Plus } from "lucide-react";

interface SuccessMessageProps {
  // setShowSendRequest: (value: boolean) => void;
  setShowSendRequest: React.Dispatch<React.SetStateAction<boolean>>;
  responseData: any;
}

export default function SuccessMessage({
  setShowSendRequest,
  responseData,
}: SuccessMessageProps) {
  return (
    <div>
      <div className="border-[1.3px] border-gray-200 py-10 mt-10">
        <div className="bg-[#ECFDF3] p-3 w-fit rounded-full mx-auto ">
          <div className="bg-[#D1FADF] p-3 rounded-full">
            <CircleCheckBig size={24} color="#12B76A" />
          </div>
        </div>
        <p className="text-center text-xl mt-4 text-[#12B76A]">
          Request Sent Successfully!
        </p>
        <p className="text-md text-gray-500 max-w-[320px] mx-auto mt-8 text-center">
          Congratulations on submitting your request for skilled engineers!
          We&apos;re eager to help you find the right team for your project. Our
          team will contact you shortly.
        </p>
      </div>

      {/* ============== Finish Button =============== */}
      <div className="mt-8">
        <button
          onClick={() => setShowSendRequest(false)}
          className="w-full mt-10  px-3.5 py-4 font-light text-white shadow-sm bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
        >
          Finish
        </button>
      </div>
    </div>
  );
}