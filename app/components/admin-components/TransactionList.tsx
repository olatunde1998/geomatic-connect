"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";
import { Table } from "@/app/components/tables/Table";
import { Skeleton } from "@/app/components/skeletons/Skeleton";
import { ArrowDown, CloudDownload, File } from "lucide-react";
import { formatDate } from "@/utils/utils";

interface transactionData {
  _id: string;
  reference?: string;
  studentId: { fullName: string } | null;
  email: string;
  state: string;
  transactionDate?: any;
  amount?: string;
  status: string;
}

interface TransactionListProps {
  subscriptionData?: any;
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

export default function TransactionList({
  subscriptionData,
  isLoading,
  setCurrentPage,
  currentPage,
  limit,
}: TransactionListProps) {
  const [selectedRows, setSelectedRows] = useState<RowType[]>([]);
  const [resetCheckboxes, setResetCheckboxes] = useState(false);

  // React TanStank Query Invalidate Logic
  const queryClient = useQueryClient();

  // Revalidation of checkbox
  const handleDeleteInvoiceRevalidate = async () => {
    const selectedRowsIds = selectedRows.map((row) => row.id);
    const idsString = JSON.stringify(selectedRowsIds);
    await queryClient.invalidateQueries({ queryKey: ["getUsersApi"] });
    setSelectedRows([]);
    setResetCheckboxes((prev) => !prev);
  };

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
  const columnHelper = createColumnHelper<transactionData>();
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
    columnHelper.accessor("reference", {
      cell: (info) => (
        <span className="flex items-center gap-2 text-[#101828]">
          <span className="w-fit h-fit p-2 rounded-full bg-slate-200 flex items-center justify-center">
            <File size={14} />
          </span>
          <span className="whitespace-normal break-words overflow-hidden text-ellipsis  line-clamp-1 max-w-[130px]">
            {info?.row?.original?.reference}
          </span>
        </span>
      ),
      header: () => <span>Reference Id</span>,
    }),
    columnHelper.accessor("studentId", {
      cell: (info) => <span> {info?.row?.original?.studentId?.fullName}</span>,
      header: () => <span>FullName</span>,
    }),
    columnHelper.accessor("transactionDate", {
      cell: (info) => (
        <span> {formatDate(info?.row?.original?.transactionDate)}</span>
      ),
      header: () => (
        <span className="flex items-center">
          Transaction date
          <ArrowDown size={18} className="ml-2" />
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: () => <span>Status</span>,
      cell: (info) => (
        <div
          className={`
            ${
              info?.row?.original?.status === "success"
                ? "bg-[#D1FADF] text-[#079455] px-3 w-fit"
                : info?.row?.original?.status === "failed"
                ? "bg-[#f3392f] text-[#FFFFFF] px-3 w-fit"
                : "bg-[#f3392f] text-[#FFFFFF] px-3 w-fit"
            } text-center p-1 rounded-2xl 
            `}
        >
          <p className="capitalize">{info?.row?.original?.status}</p>
        </div>
      ),
    }),
    columnHelper.accessor("amount", {
      header: () => <span>Amount</span>,
      cell: (info) => (
        <div className="text-[#6C748B] w-fit px-3 text-center p-1 rounded-2xl flex items-center space-x-2 justify-center capitalize">
          &#8358;{info?.row?.original?.amount}
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span>{info?.row?.original?.email}</span>,
      header: () => <span>Email</span>,
    }),
  ];

  // Pagination Logic Implementation
  const handleNextPage = () => {
    if (
      setCurrentPage &&
      currentPage !== undefined &&
      subscriptionData?.meta?.hasNextPage
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
                Transaction History
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

        {/* ===== TRANSACTION (INVOICE TABLE) AND SKELETON GOES HERE === */}
        {isLoading ? (
          <div className="mt-6 ">
            <Skeleton />
          </div>
        ) : subscriptionData?.length === 0 ? (
          <div className="mt-3 pt-6 pb-20 border-t-[1.3px] border-slate-200">
            {/* ====TRANSACTION EMPTY TRASH GOES HERE === */}
            No Existing User, Please check back later.
          </div>
        ) : (
          <div className="mt-3 pt-6 h-auto border-t-[1.3px] border-slate-200 rounded-tl-[8p rounded-tr-[8px] bg-white max-w-[760px] md:max-w-none">
            <Table
              data={subscriptionData ? subscriptionData?.data : []}
              columns={columns}
              limit={limit}
              currentPage={currentPage}
              totalItems={subscriptionData?.meta?.totalItems}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              endCursor={subscriptionData?.meta?.endCursor}
            />
          </div>
        )}
      </div>
    </>
  );
}
