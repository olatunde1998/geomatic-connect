import Map from "@/app/components/map/Map";
import { MdOutlineStar } from "react-icons/md";

interface StudentProfileProps {
  setShowSendRequest?: any;
}

export default function StudentProfile({
  setShowSendRequest,
}: StudentProfileProps) {
  return (
    <>
      <div className="flex flex-col-reverse md:grid grid-cols-2 md:gap-4">
        <div className="w-full h-.5px]  md:w- rounded-md">
          <Map />
        </div>
        <div>
          <div className="grid grid-cols-2">
            <div className="mb-4 ">
              <p className="text-xl font-bold mb-2">Specialized Field: </p>
              <p>Cadastral Surveying</p>
              <p>Topographical Surveying</p>
              <p>Drone Surveying</p>
              <p>Hydrograhical Surveying</p>
              <p>GIS & Remote Sensing</p>
            </div>
            <div className="mb-4">
              <p className="text-xl font-bold mb-2">Rating: </p>
              <p className="flex">
                <MdOutlineStar size={24} className="text-yellow-400" />
                <MdOutlineStar size={24} className="text-yellow-400" />
                <MdOutlineStar size={24} className="text-yellow-400" />
                <MdOutlineStar size={24} className="text-yellow-400" />
                <MdOutlineStar size={24} className="text-yellow-400" />
              </p>
              <p className="flex">
                <MdOutlineStar size={24} className="text-yellow-400" />
                <MdOutlineStar size={24} className="text-yellow-400" />
                <MdOutlineStar size={24} className="text-slate-400" />
                <MdOutlineStar size={24} className="text-slate-400" />
              </p>
              <p className="flex">
                <MdOutlineStar size={24} className="text-yellow-400" />
                <MdOutlineStar size={24} className="text-yellow-400" />
                <MdOutlineStar size={24} className="text-slate-400" />
              </p>
              <p className="flex">
                <MdOutlineStar size={24} className="text-yellow-400" />
                <MdOutlineStar size={24} className="text-slate-400" />
              </p>
              <p className="flex">
                <MdOutlineStar size={24} className="text-yellow-400" />
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className=" text-xl font-bold">Goals:</p>
            <p>
              Surv. Olumide V. Adewebi fnis is a Seasoned Practitioner, A former
              Secretary General of the Nigerian Institution of Surveyors and
              former Secretary General of the Association of Professional Bodies
              of Nigeria. He was also the former Secretary of the Board of
              Fellows of the Nigerian Institution of Surveyors and Vice
              President (International) of the Nigerian Institution of
              Surveyors. (2021-2023)
            </p>
          </div>

          <div className="mt-4">
            <p className=" text-xl font-bold">Address: </p>
            <p>13 Olaide Tomori St, Ikeja, 101233, Lagos</p>
          </div>

          <div className="mt-8">
            <p className=" text-xl font-bold">Achievement: </p>
            <p>13 Olaide Tomori St, Ikeja, 101233, Lagos</p>
          </div>

          <div className="mt-10">
            <p
              onClick={() => setShowSendRequest(true)}
              className="cursor-pointer border p-3 w-[230px]  text-center text-white bg-gradient-to-r from-[#49AD51] to-[#B1D045]"
            >
              Send Request
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
