import {
  CompanyApproveStudentRequest,
  CompanyDeclineStudentRequest,
  GetStudentsByCompanyRequest,
} from "@/app/services/request.request";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "@/app/components/modals/Modal";
import { CardSkeleton } from "@/app/components/skeletons/CardSkeleton";
import ApproveMessage from "@/app/components/company-components/ApproveMessage";
import DeclineMessage from "@/app/components/company-components/DeclineMessage";

interface StudentCardProps {
  token: any;
  companyId: any;
}

export default function StudentCard({ token, companyId }: StudentCardProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState();
  const [showConfirmApprove, setShowConfirmApprove] = useState(false);
  const [showConfirmDecline, setShowConfirmDecline] = useState(false);

  const { data: studentsData, isLoading } = useQuery({
    queryKey: ["getStudentsApi"],
    queryFn: () => GetStudentsByCompanyRequest(companyId, token),
  });

  // Send Approved Request to Admin Logic
  const handleApprovedRequest = async (requestId: any) => {
    setIsApproving(true);
    const body = {
      requestId: requestId,
    };
    try {
      const response = await CompanyApproveStudentRequest(body, token);
      toast.success("Request Approved Successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setIsApproving(false);
    }
  };

  // Send Decline Request to Admin Logic
  const handleDeclinedRequest = async (requestId: any) => {
    setIsDeclining(true);
    const body = {
      requestId: requestId,
    };
    try {
      const response = await CompanyDeclineStudentRequest(body, token);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      toast.error(error?.response?.message);
    } finally {
      setIsDeclining(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <div>
          <CardSkeleton />
        </div>
      ) : (
        <div className="space-y-8 md:gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0">
          {studentsData?.data?.map((item: any) => (
            <div key={item._id}>
              <div className="max-w-[400px] p-6 border border-slate-300 bg-white">
                <div className="p-6 border-b-[1.3px] border-slate-200 text-black flex flex-col items-center">
                  <div>
                    <Image
                      // src="/images/profile-pic.png"
                      src={item?.studentId?.avatarImage}
                      alt="profile image"
                      width={100}
                      height={100}
                      priority
                      className="w-[100px] h-[100px] object-cover"
                    />
                  </div>
                  <p className="text-xl font-medium">
                    <span>{item?.studentId?.fullName}</span>
                  </p>
                  <p className="font-light text-sm">
                    {item?.studentId?.institutionName}
                  </p>
                </div>

                <p className="font-medium my-3">About</p>
                <p className="font-light text-sm">
                  My name is Gbarayege Kalenebari Gloria, and I am a Java
                  developer. I graduated from the Department of Pure and
                  Industri...
                </p>
                <div className="space-y-2 my-3 font-light text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={24} />
                    <span>
                      Graduate/Student of {item?.studentId?.institutionName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={24} />
                    <span>Resides in {item?.studentId?.state}</span>
                  </div>
                </div>
                <p className="font-medium">Expertise</p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  <p className="bg-[#E6E9EB] p-2">Engineering</p>
                  <p className="bg-[#E6E9EB] p-2">Cadastral</p>
                  <p className="bg-[#E6E9EB] p-2">GIS/Remote & S.</p>
                  <p className="bg-[#E6E9EB] p-2">Drone Piloting</p>
                  <p className="bg-[#E6E9EB] p-2">Topographical</p>
                  <p className="bg-[#E6E9EB] p-2">MySQL</p>
                </div>
                {/* === PROFILE BUTTON === */}
                <div className="flex gap-3 justify-between">
                  <p
                    onClick={() => {
                      setShowConfirmApprove(true);
                      setSelectedRequestId(item?._id);
                    }}
                    className="bg-[#33A852] text-xs md:text-md w-[120px] md:w-[150px] text-center text-white p-2 mt-12 mx-auto cursor-pointer flex items-center justify-center"
                  >
                    Approve Request
                  </p>

                  <p
                    onClick={() => {
                      setShowConfirmDecline(true);
                      setSelectedRequestId(item?._id);
                    }}
                    className="bg-[#D92D20] text-xs md:text-md  w-[120px] md:w-[150px] text-center text-white p-3 mt-12 mx-auto cursor-pointer flex items-center justify-center"
                  >
                    Decline Request
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        show={showConfirmApprove}
        onClose={() => setShowConfirmApprove(false)}
      >
        <ApproveMessage
          setShowConfirmApprove={setShowConfirmApprove}
          handleApprovedRequest={handleApprovedRequest}
          requestId={selectedRequestId}
        />
      </Modal>

      <Modal
        show={showConfirmDecline}
        onClose={() => setShowConfirmDecline(false)}
      >
        <DeclineMessage
          setShowConfirmDecline={setShowConfirmDecline}
          handleDeclinedRequest={handleDeclinedRequest}
          requestId={selectedRequestId}
        />
      </Modal>
    </>
  );
}
