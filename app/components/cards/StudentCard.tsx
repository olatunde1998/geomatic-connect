import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StudentCard() {
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="max-w-[400px] p-6 border border-slate-300 bg-white">
          <div className="p-6 border-b-[1.3px] border-slate-200 text-black flex flex-col items-center">
            <div>
              <Image
                src="/images/profile-pic.png"
                alt="profile image"
                width={100}
                height={100}
                priority
                className="w-[100px] h-[100px] object-cover"
              />
            </div>
            <p className="text-xl font-medium">
              <span>Kalenebari </span>
              <span>G</span>
            </p>
            <p className="font-light text-sm">Java Developer</p>
          </div>

          <p className="font-medium my-3">About</p>
          <p className="font-light text-sm">
            My name is Gbarayege Kalenebari Gloria, and I am a Java developer. I
            graduated from the Department of Pure and Industri...
          </p>
          <div className="space-y-2 my-3 font-light text-sm">
            <div className="flex items-center gap-2">
              <GraduationCap size={24} />
              <span>Graduate of University of Port Harcourt</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={24} />
              <span>Resides in Edo</span>
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
          <Link href="/student-dashboard/1">
            <p className="bg-[#33A852] w-[150px] lg:w-[210px] text-center text-white p-2 mt-12 mx-auto cursor-pointer">
              View Profile
            </p>
          </Link>
        </div>

        <div className="max-w-[400px] p-6 border border-slate-300 bg-white">
          <div className="p-6 border-b-[1.3px] border-slate-200 text-black flex flex-col items-center">
            <div>
              <Image
                src="/images/student-pic.jpeg"
                alt="profile image"
                width={100}
                height={100}
                priority
                className="w-[100px] h-[100px] object-cover rounded-full"
              />
            </div>
            <p className="text-xl font-medium">
              <span>Kalenebari </span>
              <span>G</span>
            </p>
            <p className="font-light text-sm">Java Developer</p>
          </div>

          <p className="font-medium my-3">About</p>
          <p className="font-light text-sm">
            My name is Gbarayege Kalenebari Gloria, and I am a Java developer. I
            graduated from the Department of Pure and Industri...
          </p>
          <div className="space-y-2 my-3 font-light text-sm">
            <div className="flex items-center gap-2">
              <GraduationCap size={24} />
              <span>Graduate of University of Port Harcourt</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={24} />
              <span>Resides in Edo</span>
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
          <Link href="/student-dashboard/2">
            <p className="bg-[#33A852] w-[150px] lg:w-[210px] text-center text-white p-2 mt-12 mx-auto cursor-pointer">
              View Profile
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
