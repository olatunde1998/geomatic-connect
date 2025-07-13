export const JobSkeleton = () => {
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {skeletonArray.map((_, index) => (
        <div
          key={index}
          className="border border-slate-300 dark:border-muted-foreground p-4 rounded-xl mb-5 block bg-white dark:bg-accent animate-pulse"
        >
          <section className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <div className="w-[70px] h-[70px] bg-gray-100 dark:bg-muted-foreground rounded-full border-[1.3px] border-slate-200 dark:border-muted dark:border" />
              <div className="space-y-2">
                <div className="h-4 w-40 bg-gray-100 dark:bg-muted-foreground rounded"></div>
                <div className="h-4 w-32 bg-gray-100 dark:bg-muted-foreground rounded"></div>
              </div>
            </div>
            <div className="h-6 w-24 bg-gray-100 dark:bg-muted-foreground rounded-lg"></div>
          </section>

          <section className="flex flex-wrap gap-4 items-center mt-3">
            <div className="h-6 w-20 bg-gray-100 dark:bg-muted-foreground rounded-lg"></div>
            <div className="h-6 w-20 bg-gray-100 dark:bg-muted-foreground rounded-lg"></div>
            <div className="h-6 w-20 bg-gray-100 dark:bg-muted-foreground rounded-lg"></div>
            <div className="h-6 w-20 bg-gray-100 dark:bg-muted-foreground rounded-lg"></div>
          </section>
        </div>
      ))}
    </>
  );
};
