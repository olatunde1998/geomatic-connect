"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  BookCheck,
  CircleOff,
  Ellipsis,
  EllipsisVertical,
  Filter,
} from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";
import { Table } from "@/app/components/tables/Table";
import { Skeleton } from "@/app/components/skeletons/Skeleton";
import { ArrowDown, File } from "lucide-react";
import {
  AdminApproveStudentRequest,
  AdminDeclineStudentRequest,
} from "@/app/services/request.request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SendRequest from "./RequestDetails";
import ApproveMessage from "@/app/components/company-components/ApproveMessage";
import DeclineMessage from "@/app/components/company-components/DeclineMessage";

import { Modal } from "@/app/components/modals/Modal";

interface notificationsData {
  _id: string;
  studentId: { fullName: string } | null;
  companyId: { companyName: string } | null;
  trackPeriod: string;
  institutionName: string;
  status: string;
  action: string;
}

interface RequestsListProps {
  token?: any;
  notificationsData?: any;
  isLoading?: boolean;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  currentPage?: number;
  limit?: number;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
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

export default function RequestsList({
  token,
  notificationsData,
  isLoading,
  setCurrentPage,
  currentPage,
  limit,
  setSearch,
}: RequestsListProps) {
  const [selectedRow, setSelectedRow] = useState<notificationsData | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<RowType[]>([]);
  const [resetCheckboxes, setResetCheckboxes] = useState(false);
  const actionDropDownRef = useRef<HTMLDivElement>(null);
  const [showActions, setShowActions] = useState(false);
  const [showSendRequest, setShowSendRequest] = useState<boolean>(false);
  const [showConfirmApprove, setShowConfirmApprove] = useState(false);
  const [showConfirmDecline, setShowConfirmDecline] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<
    string | undefined
  >();

  // React TanStank Query Invalidate Logic
  const queryClient = useQueryClient();

  // Revalidation of checkbox
  const handleDeleteInvoiceRevalidate = async () => {
    const selectedRowsIds = selectedRows?.map((row) => row?.id);
    const idsString = JSON.stringify(selectedRowsIds);
    await queryClient.invalidateQueries({ queryKey: ["getNotificationsApi"] });
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

  // Action dropdown (view details, approve and decline)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionDropDownRef.current &&
        !(actionDropDownRef.current as HTMLDivElement).contains(
          event.target as Node
        )
      ) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Approve Handler
  const approveHandler = async (requestId: any) => {
    const body = {
      requestId,
    };
    try {
      const response = await AdminApproveStudentRequest(body, token);
      toast.success(response?.message);
      await queryClient.invalidateQueries({
        queryKey: ["getNotificationsApi"],
      });
    } catch (error: any) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data);
    } finally {
      setShowActions(false);
    }
  };

  // Decline Handler
  const declineHandler = async (requestId: any) => {
    const body = {
      requestId,
    };
    try {
      const response = await AdminDeclineStudentRequest(body, token);
      toast.success(response?.message);
      await queryClient.invalidateQueries({
        queryKey: ["getNotificationsApi"],
      });
    } catch (error: any) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data);
    } finally {
      setShowActions(false);
    }
  };

  // create columnHelper
  const columnHelper = createColumnHelper<notificationsData>();
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
    columnHelper.accessor("studentId", {
      cell: (info) => (
        <span className="flex items-center gap-2">
          <span className="w-fit h-fit p-2 rounded-full bg-slate-200 flex items-center justify-center">
            <File size={14} />
          </span>
          <span className="whitespace-normal break-words overflow-hidden text-ellipsis">
            {info?.row?.original?.studentId?.fullName}
          </span>
        </span>
      ),
      header: () => (
        <span className="text-[#101828] dark:text-accent-foreground">
          FullName
        </span>
      ),
    }),
    columnHelper.accessor("companyId", {
      cell: (info) => (
        <span className="flex items-center gap-2">
          <span className="whitespace-normal break-words overflow-hidden text-ellipsis">
            {info?.row?.original?.companyId?.companyName}
          </span>
        </span>
      ),
      header: () => (
        <span className="text-[#101828] dark:text-accent-foreground">
          Company of Interest
        </span>
      ),
    }),
    columnHelper.accessor("trackPeriod", {
      cell: (info) => <span> {info?.row?.original?.trackPeriod}</span>,
      header: () => (
        <span className="flex items-center text-[#101828] dark:text-accent-foreground">
          Track Period
          <ArrowDown size={18} className="ml-2" />
        </span>
      ),
    }),
    columnHelper.accessor("institutionName", {
      cell: (info) => <span>{info?.row?.original?.institutionName}</span>,
      header: () => (
        <span className="text-[#101828] dark:text-accent-foreground">
          Institution Name
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: () => (
        <span className="text-[#101828] dark:text-accent-foreground">
          Status
        </span>
      ),
      cell: (info) => (
        <div
          className={`
            ${
              info?.row?.original?.status === "Pending"
                ? "bg-[#f3392f] text-[#FFFFFF] px-3 w-fit"
                : " bg-[#D1FADF] text-[#079455] px-3 w-fit"
            } text-center p-1 rounded-2xl 
            `}
        >
          <p className="capitalize">{info?.row?.original?.status}</p>
        </div>
      ),
    }),
    columnHelper.accessor("action", {
      cell: ({ row }) => (
        <div className="relative">
          <span
            className="text-[#363944] flex items-center relative"
            onClick={() => {
              setSelectedRow(row.original);
              setShowActions(!showActions);
            }}
          >
            <EllipsisVertical size={18} className="ml-2" />
          </span>
          {showActions && row?.original?._id === selectedRow?._id && (
            <div
              ref={actionDropDownRef}
              className="rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] absolute right-[2px] top-[36px] w-[160px] py-3 flex flex-col items-center font-normal z-50 bg-white"
            >
              <div
                onClick={() => {
                  setSelectedRow(row.original);
                  setShowSendRequest(true);
                }}
                className="flex items-center justify-center cursor-pointer  hover:bg-[#F9FAFB] p-2 w-full"
              >
                <span>View More</span> <Ellipsis size={16} className="ml-4" />
              </div>
              <div
                onClick={() => {
                  if (
                    row?.original?.status === "Interested" ||
                    row?.original?.status === "Approved"
                  ) {
                    setShowConfirmApprove(true);
                    setSelectedRequestId(row?.original?._id);
                  } else {
                    return;
                  }
                }}
                className={`${
                  row?.original?.status === "Interested" ||
                  row?.original?.status === "Approved"
                    ? "cursor-pointer text-[#079455]"
                    : "cursor-not-allowed"
                } flex items-center  justify-center  hover:bg-[#F9FAFB] p-2 w-full`}
              >
                <span>Approved </span>
                <BookCheck size={16} className="ml-4" />
              </div>
              <div
                onClick={() => {
                  setShowConfirmDecline(true);
                  setSelectedRequestId(row?.original?._id);
                }}
                className="flex items-center justify-center cursor-pointer text-[#f3392f] hover:bg-[#F9FAFB] p-2 w-full "
              >
                <span>Declined</span>
                <CircleOff size={16} className="ml-4" />
              </div>
            </div>
          )}
        </div>
      ),
      header: () => <span></span>,
    }),
  ];

  // Pagination Logic Implementation
  const handleNextPage = () => {
    if (
      setCurrentPage &&
      currentPage !== undefined &&
      notificationsData?.meta?.hasNextPage
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
              <p className="text-gray-600 text-lg font-semibold dark:text-accent-foreground">
                Request History
              </p>
              <p className="text-sm text-[#6C748B] font-light">
                Current Request according to Students Interest.
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
            <div className="dark:text-accent-foreground my-4 flex p-2 w-[150px] justify-center items-center gap-[8px] rounded-[8px] cursor-pointer border-[1.5px] dark:border-muted dark:hover:bg-muted border-[#D0D5DD] text-[#344054]">
              <Filter className="w-4 h-4 md:w-5 md:h-5" />
              <p className="text-sm md:text-md ">Filter</p>
            </div>
          </div>
        </div>

        {/* ===== REQUESTS AND SKELETON GOES HERE === */}
        {isLoading ? (
          <div className="mt-6 ">
            <Skeleton />
          </div>
        ) : notificationsData?.length === 0 ? (
          <div className="mt-3 pt-6 pb-20 border-t-[1.3px] border-slate-200">
            {/* ====TRANSACTION EMPTY TRASH GOES HERE === */}
            No Existing User, Please check back later.
          </div>
        ) : (
          <div className="mt-3 pt-6 h-auto border-t-[1.3px]  border-slate-200 dark:border-t-muted overflow-scroll rounded-tl-[8p rounded-tr-[8px] dark:bg-background max-w-[760px] md:max-w-none">
            <Table
              data={notificationsData ? notificationsData?.data : []}
              columns={columns}
              limit={limit}
              currentPage={currentPage}
              totalItems={notificationsData?.meta?.totalItems}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              endCursor={notificationsData?.meta?.endCursor}
            />
          </div>
        )}
      </div>
      {/* === MODALS === */}
      <Modal show={showSendRequest} onClose={() => setShowSendRequest(false)}>
        <SendRequest
          token={token}
          setShowSendRequest={setShowSendRequest}
          notificationsData={notificationsData?.data}
          notificationID={selectedRow ? selectedRow._id : null}
          setShowConfirmApprove={setShowConfirmApprove}
          setShowConfirmDecline={setShowConfirmDecline}
        />
      </Modal>

      <Modal
        show={showConfirmApprove}
        onClose={() => setShowConfirmApprove(false)}
      >
        <ApproveMessage
          setShowConfirmApprove={setShowConfirmApprove}
          handleApprovedRequest={approveHandler}
          requestId={selectedRequestId}
        />
      </Modal>

      <Modal
        show={showConfirmDecline}
        onClose={() => setShowConfirmDecline(false)}
      >
        <DeclineMessage
          setShowConfirmDecline={setShowConfirmDecline}
          handleDeclinedRequest={declineHandler}
          requestId={selectedRequestId}
        />
      </Modal>
      <ToastContainer />
    </>
  );
}
