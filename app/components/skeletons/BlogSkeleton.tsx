export const BlogSkeleton = () => {
  return (
    <div className="flex flex-col space-y-6 md:flex-row md:space-x-8">
      <div className="h-64 md:w-[450px] rounded-xl bg-slate-300 dark:bg-accent animate-pulse"></div>
      <div className="flex flex-col space-y-4">
        <div className="max-w-[300px] md:max-w-none md:w-[300px] h-8 bg-slate-300 dark:bg-accent animate-pulse"></div>
        <div className="max-w-[320px] md:max-w-none md:w-[320px] h-8 bg-slate-300 dark:bg-accent animate-pulse"></div>
        <div className="max-w-[200px] md:max-w-none md:w-[200px] h-4 bg-slate-300 dark:bg-accent animate-pulse"></div>
        <div className="max-w-[100px] md:max-w-none md:w-[100px] h-4 bg-slate-300 dark:bg-accent animate-pulse"></div>
      </div>
    </div>
  );
};
