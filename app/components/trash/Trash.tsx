import { TrashImage } from "@/public/assets/TrashImage";

interface TrashProps {
  headingText: string;
  subHeadingText: string;
}

const Trash = ({ headingText, subHeadingText }: TrashProps) => {
  return (
    <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)]  p-6 max-w-[408px] mx-auto mt-4 md:mt-10">
      <div>
        <div className="flex justify-center mb-12">
          <TrashImage />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg mb-6">{headingText}</p>
        <p className="text-[#464665] text-sm max-w-[240px] mx-auto">
          {subHeadingText}
        </p>
      </div>
    </div>
  );
};

export default Trash;
