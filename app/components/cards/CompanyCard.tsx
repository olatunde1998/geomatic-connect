import { GetCompaniesRequest } from "@/app/services/request.request";
import { Sheet } from "@/app/components/sheets/Sheet";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SendRequest from "../student-components/SendRequest";

interface CompanyCardProps {
  token: any;
  setSelectedCompanyId?: any;
  selectedCompanyId?: any;
  showSendRequest?: any;
  setShowSendRequest?: any;
  userData?: any;
}

export default function CompanyCard({
  token,
  setSelectedCompanyId,
  selectedCompanyId,
  showSendRequest,
  setShowSendRequest,
  userData,
}: CompanyCardProps) {
  const { data: companiesData, isLoading } = useQuery({
    queryKey: ["getCompaniesApi"],
    queryFn: () => GetCompaniesRequest(token),
  });

  console.log(companiesData, "this is the userData===");
  return (
    <>
      <div className="space-y-8 md:gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0">
        {companiesData?.data?.map((item: any) => (
          <div key={item._id}>
            <div className="max-w-[400px] p-6 border border-slate-300 bg-white">
              <div className="flex justify-end">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCompanyId(item._id); 
                    } else {
                      setSelectedCompanyId("");
                    }
                  }}
                  checked={selectedCompanyId === item._id}
                  className=" accent-[#33A852] w-4 h-4 border-2 border-red-800 cursor-pointer"
                />
              </div>
              <div className="p-6 border-b-[1.3px] border-slate-200 text-black flex flex-col items-center">
                <div>
                  <Image
                    src="/images/fss-logo.png"
                    alt="profile image"
                    width={100}
                    height={100}
                    priority
                    className="w-[100px] h-[100px] object-cover rounded-full"
                  />
                </div>
                <p className="text-xl font-medium">
                  <span>{item?.companyName} </span>
                </p>
                <p className="font-light text-sm">Java Developer</p>
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
                  <span>Graduate of University of Port Harcourt</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={24} />
                  <span>Resides in {item?.state}</span>
                </div>
              </div>
              <p className="font-medium">Framework</p>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                <p className="bg-[#E6E9EB] p-2">Foundation CSS</p>
                <p className="bg-[#E6E9EB] p-2">Hibernate</p>
                <p className="bg-[#E6E9EB] p-2">Jakarta</p>
                <p className="bg-[#E6E9EB] p-2">JDBC</p>
                <p className="bg-[#E6E9EB] p-2">JPA</p>
                <p className="bg-[#E6E9EB] p-2">MySQL</p>
              </div>
              {/* === PROFILE BUTTON === */}
              <Link href={`/student-dashboard/${item?._id}`}>
                <p className="bg-[#33A852] w-[150px] lg:w-[210px] text-center text-white p-2 mt-12 mx-auto cursor-pointer">
                  View Profile
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Sheet show={showSendRequest} onClose={() => setShowSendRequest(false)}>
        <SendRequest
          setShowSendRequest={setShowSendRequest}
          userData={userData}
          token={token}
          selectedCompanyId={selectedCompanyId}
        />
      </Sheet>
    </>
  );
}
