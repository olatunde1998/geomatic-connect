"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Skeleton } from "@/app/components/skeletons/Skeleton";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowDown, File, Filter } from "lucide-react";
import { Table } from "@/app/components/tables/Table";
import { formatDate } from "@/utils/utils";
import { useDebounce } from "use-debounce";

interface Applicant {
  _id: string;
  user: {
    fullName: string;
    email: string;
    state: string;
  };
  createdAt: string;
  meta?: string[];
  appliedAt: string;
}

interface ApplicantsProps {
  applicantsData: Applicant[];
}

interface IndeterminateCheckboxProps {
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RowType {
  original: any;
  getToggleSelectedHandler: () => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  getIsSelected: () => boolean;
  id: any;
}

interface TableType {
  getToggleAllRowsSelectedHandler: () => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  getIsAllRowsSelected: () => boolean;
  getPreSelectedRowModel: () => { rows: RowType[] };
}

export default function Applicants({ applicantsData }: ApplicantsProps) {
  const [selectedRows, setSelectedRows] = useState<RowType[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [limit] = useState(6);

  // handle check box
  function IndeterminateCheckbox({
    indeterminate,
    ...rest
  }: IndeterminateCheckboxProps) {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (typeof indeterminate === "boolean" && ref.current) {
        ref.current.indeterminate = !rest.checked && indeterminate;
      }
    }, [indeterminate, rest.checked]);

    return (
      <input type="checkbox" ref={ref} {...rest} className="accent-[#363944]" />
    );
  }

  const onRowSelectionChange = useCallback(
    (row: RowType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      row.getToggleSelectedHandler()(event);
      if (!row.getIsSelected()) {
        setSelectedRows((prev) => [...prev, row.original]);
      } else {
        setSelectedRows((prev) => prev.filter((item) => item !== row.original));
      }
    },
    []
  );

  const onAllRowsSelectionChange = useCallback(
    (table: TableType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      table.getToggleAllRowsSelectedHandler()(event);
      if (table.getIsAllRowsSelected()) {
        setSelectedRows([]);
      } else {
        setSelectedRows(
          table.getPreSelectedRowModel().rows.map((row) => row.original)
        );
      }
    },
    []
  );

  // create columnHelper
  const columnHelper = createColumnHelper<Applicant>();
  // Table columns
  const columns = [
    columnHelper.accessor("_id", {
      header: ({ table }) => (
        <div>
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: onAllRowsSelectionChange(table),
            }}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: onRowSelectionChange(row),
            }}
          />
        </div>
      ),
    }),
    columnHelper.accessor((row) => row?.user?.fullName, {
      id: "fullName",
      cell: (info) => (
        <span className="flex items-center gap-2">
          <span className="w-fit h-fit p-2 rounded-full bg-slate-200 flex items-center justify-center">
            <File size={14} />
          </span>
          <span className="whitespace-normal break-words overflow-hidden text-ellipsis max-w-[130px]">
            {info.getValue()}
          </span>
        </span>
      ),
      header: () => (
        <span className="text-[#101828] dark:text-accent-foreground">
          Applicant&apos;s Name
        </span>
      ),
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => <span>{formatDate(info?.row?.original?.appliedAt)}</span>,
      header: () => (
        <span className="flex items-center text-[#101828] dark:text-accent-foreground">
          Applied On
          <ArrowDown size={18} className="ml-2" />
        </span>
      ),
    }),
    columnHelper.accessor((row) => row?.user?.state, {
      id: "state",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => (
        <span className="text-[#101828] dark:text-accent-foreground">
          Location
        </span>
      ),
    }),
    columnHelper.accessor((row) => row?.user?.email, {
      id: "email",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => (
        <span className="text-[#101828] dark:text-accent-foreground">
          Email
        </span>
      ),
    }),
  ];

  // Pagination Logic Implementation
  // const handleNextPage = () => {
  //   if (
  //     setCurrentPage &&
  //     currentPage !== undefined &&
  //     applicantsData?.meta?.hasNextPage
  //   ) {
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // };

  const handlePreviousPage = () => {
    if (setCurrentPage && currentPage !== undefined && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <div>
        <div>
          <div className="md:flex items-center md:space-x-4">
            <div className="w-full">
              <p className="text-gray-600 text-lg font-semibold dark:text-accent-foreground">
                Applicants
              </p>
              <p className="text-sm text-[#6C748B] font-light">
                Manage your applicants in one place.
              </p>
            </div>

            <div className="md:w-[500px]">
              <input
                type="text"
                onChange={(e: any) => setSearch(e.target.value)}
                className="border border-[#cbd5e1] w-full p-2 mt-4 md:mt-0 rounded-md cursor-text placeholder:text-xs focus:border-green-600 focus:ring-0 focus:outline-none"
                placeholder="Search... ✍️"
              />
            </div>
            <div className="dark:text-accent-foreground my-4 flex p-2 w-[100px] justify-center items-center gap-[8px] rounded-[8px] cursor-pointer border dark:border-muted dark:hover:bg-muted border-[#D0D5DD] text-[#344054]">
              <Filter className="w-4 h-4 md:w-5 md:h-5" />
              <p className="text-sm md:text-md">Filter</p>
            </div>
          </div>
        </div>

        {/* ===== APPLICANTS LIST AND SKELETON GOES HERE === */}
        {isLoadingData ? (
          <div className="mt-6 ">
            <Skeleton />
          </div>
        ) : applicantsData?.length === 0 && debouncedSearch ? (
          <div className="text-base text-center border-t-[1.3px] border-slate-200 mt-10 pt-20 md:pt-32 max-w- bg-white rounded-lg p-6">
            No Applicant Found, Please check back later.
          </div>
        ) : (
          <div className="mt-3 pt-6 h-auto border-t-[1.3px] border-slate-200 dark:border-t-muted rounded-tr-[8px] bg-white dark:bg-background max-w-[760px] md:max-w-none">
            <Table
              data={applicantsData ? applicantsData : []}
              columns={columns}
              limit={limit}
              currentPage={currentPage}
              handlePreviousPage={handlePreviousPage}
              // handleNextPage={handleNextPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
