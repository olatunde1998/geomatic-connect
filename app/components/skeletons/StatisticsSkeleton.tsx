export const StatisticsSkeleton = () => {
  return (
    <div className="my-8 grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-6">
      {/* ==CARD ONE=== */}
      <div className="relative -z-[9999] w-full rounded overflow-hidden">
        <div className="w-full">
          <div className="border border-slate-200 dark:border-muted p-3 rounded-lg max-h-28 h-28 flex flex-col items-start justify-center">
            <div className="w-full h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse">
              <div className="w-full h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse"></div>
            </div>
            <div>
              <div className="w-20 h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      {/* ==CARD TWO=== */}
      <div className="relative -z-[9999] w-full rounded overflow-hidden">
        <div className="w-full">
          <div className="border border-slate-200 dark:border-muted p-3 rounded-lg max-h-28 h-28 flex flex-col items-start justify-center">
            <div className="w-full h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse">
              <div className="w-full h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse"></div>
            </div>
            <div>
              <div className="w-20 h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ==CARD THREE=== */}
      <div className="relative -z-[9999] w-full rounded overflow-hidden">
        <div className="w-full">
          <div className="border border-slate-200 dark:border-muted p-3 rounded-lg max-h-28 h-28 flex flex-col items-start justify-center">
            <div className="w-full h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse">
              <div className="w-full h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse"></div>
            </div>
            <div>
              <div className="w-20 h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ==CARD FOUR=== */}
      <div className="relative -z-[9999] w-full rounded overflow-hidden">
        <div className="w-full">
          <div className="border border-slate-200 dark:border-muted p-3 rounded-lg max-h-28 h-28 flex flex-col items-start justify-center">
            <div className="w-full h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse">
              <div className="w-full h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse"></div>
            </div>
            <div>
              <div className="w-20 h-10 mb-2 bg-gray-100 dark:bg-accent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
