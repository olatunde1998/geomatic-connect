export const CardSkeleton = () => {
  const cardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className=" w-full rounded">
      <div className="py-4 grid space-y-6 lg:space-y-0 md:grid-cols-2 md:space-y-0 md:gap-2 lg:grid-cols-3 lg:gap-3 xl:gap-6">
        {cardArray.map((_, index) => (
          <div
            key={index}
            className="rounded-md font-regular text-xl p-4  w-full  bg-gray-300 dark:bg-accent animate-pulse"
          >
            <div className="pt-5 pb-10 mx-2 border-b border-slate-200 dark:border-muted-foreground flex flex-col justify-center items-center space-y-2">
              <div className="rounded-full font-regular text-xl w-[80px] h-[80px] bg-white dark:bg-muted-foreground animate-pulse"></div>
              <div className="h-2 w-[100px] animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
              <div className="h-1 w-[50px] animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
            </div>

            <div className="m-2 mt-6 space-y-12">
              <div>
                <div className="h-2 w-[60px] p-2 mb-3 animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                <div className="space-y-2">
                  <div className="h-2 w-[80%] animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                  <div className="h-2 w-[70%] animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                  <div className="h-2 w-[60%] animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                </div>
              </div>

              <div>
                <div className="h-2 w-[60px] p-2 animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                  <div className="p-2 animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                  <div className="p-2 animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                  <div className="p-2 animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                  <div className="p-2 animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                  <div className="p-2 animate-pulse bg-white dark:bg-muted-foreground rounded-sm"></div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-3 justify-between pb-3">
                <p className="bg-white dark:bg-muted-foreground w-[120px] md:w-[150px] p-2 mt-8 rounded-sm"></p>
                <p className="bg-white dark:bg-muted-foreground w-[120px] md:w-[150px]  p-3 mt-8 rounded-sm"></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
