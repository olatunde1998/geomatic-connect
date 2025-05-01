export const BlogSkeleton = () => {
  return (
    <div className="flex flex-row space-x-8">
      <div className="h-64 w-[450px] rounded-xl bg-slate-300 dark:bg-accent animate-pulse"></div>
      <div className="flex flex-col space-y-4">
        <div className="w-[300px] h-10 bg-slate-300 dark:bg-accent animate-pulse"></div>
        <div className="w-[320px] h-10 bg-slate-300 dark:bg-accent animate-pulse"></div>
        <div className="w-[200px] h-4 bg-slate-300 dark:bg-accent animate-pulse"></div>
        <div className="w-[100px] h-4 bg-slate-300 dark:bg-accent animate-pulse"></div>
      </div>
    </div>
  );
};
