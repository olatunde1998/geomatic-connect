interface DetailsTabProps {
  selectedTab?: string;
  setSelectedTab?: any;
}

export default function DetailsTab({
  selectedTab,
  setSelectedTab,
}: DetailsTabProps) {
  return (
    <>
      <div>
        <div className="flex text-sm  md:gap-10 border-b border-slate-300 whitespace-nowrap overflow-x-scroll">
          <div
            className={`py-2 cursor-pointer ${
              selectedTab === "Profile" && "border-b-[1.8px] border-slate-500"
            }`}
            onClick={() => {
              setSelectedTab("Profile");
            }}
          >
            Profile
          </div>
          <div
            className={` py-2 cursor-pointer mx-5 ${
              selectedTab === "Project" && "border-b-[1.8px] border-slate-500"
            }`}
            onClick={() => {
              setSelectedTab("Project");
            }}
          >
            Project
          </div>

          <div
            className={` py-2 cursor-pointer mx-5 ${
              selectedTab === "Institution" &&
              "border-b-[1.8px] border-slate-500"
            }`}
            onClick={() => {
              setSelectedTab("Institution");
            }}
          >
            Institution
          </div>
        </div>
      </div>
    </>
  );
}
