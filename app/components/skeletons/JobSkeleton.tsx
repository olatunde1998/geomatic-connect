export const JobSkeleton = () => {
  return (
    <div className="border border-slate-300 p-4 rounded-xl mb-5 block bg-white animate-pulse">
      <section className="flex items-start justify-between">
        <div className="flex gap-3 items-center">
          <div className="w-[70px] h-[70px] bg-gray-100 rounded-full border-[1.3px] border-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-100 rounded"></div>
            <div className="h-4 w-32 bg-gray-100 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-24 bg-gray-100 rounded-lg"></div>
      </section>

      <section className="flex flex-wrap gap-4 items-center mt-3">
        <div className="h-6 w-20 bg-gray-100 rounded-lg"></div>
        <div className="h-6 w-20 bg-gray-100 rounded-lg"></div>
        <div className="h-6 w-20 bg-gray-100 rounded-lg"></div>
        <div className="h-6 w-20 bg-gray-100 rounded-lg"></div>
      </section>
    </div>
  );
};
