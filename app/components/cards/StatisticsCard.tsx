interface StatisticsCardProps {
  title: string;
  value: number;
}
export default function StatisticsCard({ title, value }: StatisticsCardProps) {
  return (
    <div className="w-full">
      <div className="border border-slate-200 p-3 rounded-lg max-h-28 h-28 flex flex-col items-start justify-center">
        <div className="flex items-center space-x-1 mb-2">
          <div
            className="h-3 w-3 brightness-150 bg-green-700"
          />
          <p className="text-sm lg:text-xs xl:text-sm font-sans text-[#575D72]">
            {title}
          </p>
        </div>
        <div>
          <p className="text-4xl">{value}</p>
        </div>
      </div>
    </div>
  );
}