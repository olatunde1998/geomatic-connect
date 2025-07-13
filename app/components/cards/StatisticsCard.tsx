import { ChartNoAxesColumn } from "lucide-react";

interface StatisticsCardProps {
  title: string;
  value: number;
}
export function StatisticsCard({ title, value }: StatisticsCardProps) {
  return (
    <div className="w-full">
      <div className="border border-slate dark:border-muted p-3 rounded-lg max-h-28 md:h-28 flex flex-col items-start justify-center">
        <div className="flex items-center space-x-1.5 mb-2 ">
          <div className="h-3 w-3 brightness-150 bg-green-700" />
          <p className="text-sm lg:text-xs xl:text-sm font-sans text-[#575D72] dark:text-accent-foreground">
            {title}
          </p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function OverviewCard({ title, value }: StatisticsCardProps) {
  return (
    <div className="w-full">
      <div className="border border-slate dark:border-muted p-3 rounded-lg max-h-28 md:h-28 flex flex-col items-start justify-center">
        <div className="flex items-center space-x-1.5 mb-2 ">
          <ChartNoAxesColumn className="text-green-600 size-6" />
          <p className="text-sm lg:text-xs xl:text-sm font-sans text-[#575D72] dark:text-muted-foreground">
            {title}
          </p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
