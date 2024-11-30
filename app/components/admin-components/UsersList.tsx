"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/app/components/tables/Table";
import { Skeleton } from "@/app/components/skeletons/Skeleton";
import { ArrowDown, Check, CloudDownload, File } from "lucide-react";
import { formatDate } from "@/utils/utils";

interface UsersData {
  _id: string;
  fullName?: string;
  companyName?: string;
  email: string;
  state: string;
  createdAt?: any;
  role?: string;
  files?: string[];
  active: string;
  meta?: string[];
}

interface UsersListProps {
  userData?: any;
  isLoading?: boolean;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  currentPage?: number;
  limit?: number;
}

interface IndeterminateCheckboxProps {
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RowType {
  original: any; // Replace with the correct type if available
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

export default function UsersList({
  userData,
  isLoading,
  setCurrentPage,
  currentPage,
  limit,
}: UsersListProps) {
  const [selectedRows, setSelectedRows] = useState<RowType[]>([]);

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
  const columnHelper = createColumnHelper<UsersData>();
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
    columnHelper.accessor("fullName", {
      cell: (info) => (
        <span className="flex items-center gap-2">
          <span className="w-fit h-fit p-2 rounded-full bg-slate-200 flex items-center justify-center">
            <File size={14} />
          </span>
          <span className="whitespace-normal break-words overflow-hidden text-ellipsis  max-w-[130px]">
            {info?.row?.original?.fullName ?? info?.row?.original?.companyName}
          </span>
        </span>
      ),
      header: () => <span>FullName/Company</span>,
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => (
        <span> {formatDate(info?.row?.original?.createdAt)}</span>
      ),
      header: () => (
        <span className="flex items-center">
          Created date
          <ArrowDown size={18} className="ml-2" />
        </span>
      ),
    }),
    columnHelper.accessor("role", {
      header: () => <span>Role</span>,
      cell: (info) => (
        <div
          className={`
          ${
            info?.row?.original?.role === "Admin"
              ? "bg-[#D1FADF] text-[#079455] w-fit px-3"
              : info?.row?.original?.role === "User"
              ? "bg-[#F9EDC4] text-[#D0AA25] w-fit px-3"
              : "bg-[#EDEDF1] text-[#6C748B] w-fit px-3"
          } text-center p-1 rounded-2xl flex items-center space-x-2 justify-center
          `}
        >
          <p
            className={` ${
              info?.row?.original?.role === "Admin"
                ? "text-[#079455]"
                : info?.row?.original?.role === "User"
                ? "text-[#D0AA25]"
                : "text-[#6C748B]"
            }`}
          >
            <Check size={10} />
          </p>
          <p className="capitalize">
            {info
              ?.renderValue()
              ?.toLowerCase()
              ?.replace(/\b\w/g, (char: string) => char.toUpperCase())}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("state", {
      cell: (info) => <span>{info?.row?.original?.state}</span>,
      header: () => <span>Location</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span>{info?.row?.original?.email}</span>,
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor("active", {
      header: () => <span>Status</span>,
      cell: (info) => (
        <div
          className={`
            ${
              info?.row?.original?.active
                ? "bg-[#D1FADF] text-[#079455] px-3 w-fit"
                : "bg-[#f3392f] text-[#6C748B] px-3 w-fit"
            } text-center p-1 rounded-2xl 
            `}
        >
          <p className="capitalize">
            {info?.row?.original?.active ? "Active" : "Inactive"}
          </p>
        </div>
      ),
    }),
  ];

  // Pagination Logic Implementation
  const handleNextPage = () => {
    if (
      setCurrentPage &&
      currentPage !== undefined &&
      userData?.meta?.hasNextPage
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

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
              <p className="text-gray-600 text-lg font-semibold">
                Existing Users
              </p>
              <p className="text-sm text-[#6C748B] font-light">
                Pick an account plan that fits your workflow.
              </p>
            </div>
            <div className="my-4 flex p-2  justify-center items-center gap-[8px] rounded-[8px] md:w-[200px] lg:w-[200px] cursor-pointer border-[1.5px] border-[#D0D5DD] text-[#344054]">
              <CloudDownload className="w-4 h-4 md:w-5 md:h-5" />
              <p className="text-sm md:text-md ">Download all</p>
            </div>
          </div>
        </div>

        {/* ===== USER LIST AND SKELETON GOES HERE === */}
        {isLoading ? (
          <div className="mt-6 ">
            <Skeleton />
          </div>
        ) : userData?.length === 0 ? (
          <div className="mt-3 pt-6 pb-20 border-t-[1.3px] border-slate-200">
            {/* ====TRANSACTION EMPTY TRASH GOES HERE === */}
            No Existing User, Please check back later.
          </div>
        ) : (
          <div className="mt-3 pt-6 h-auto border-t-[1.3px] border-slate-200 rounded-tl-[8p rounded-tr-[8px] bg-white max-w-[760px] md:max-w-none">
            <Table
              data={userData ? userData?.data : []}
              columns={columns}
              limit={limit}
              currentPage={currentPage}
              totalItems={userData?.meta?.totalItems}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              endCursor={userData?.meta?.endCursor}
            />
          </div>
        )}
      </div>
    </>
  );
}
