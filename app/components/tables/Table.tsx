import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TableProps {
  data: any;
  columns: any;
  handlePreviousPage?: any;
  handleNextPage?: any;
  currentPage: any;
  limit: any;
  totalItems?: any;
  endCursor?: any;
}

export const Table = ({
  data,
  columns = [],
  handlePreviousPage,
  handleNextPage,
  currentPage,
  limit,
  totalItems,
  endCursor,
}: TableProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    debugTable: true,
  });

  // useEffect(() => {
  //   if (resetCheckboxes) {
  //     setRowSelection({});
  //     setResetCheckboxes(false);
  //   }
  // }, [resetCheckboxes, setResetCheckboxes]);

  const entriesPerPage = limit;
  const totalEntries = totalItems || 0;
  const startSerial = (currentPage - 1) * entriesPerPage + 1;
  const endSerial = currentPage * entriesPerPage;
  const paginationText = `${startSerial} - ${endSerial} of ${totalEntries}`;

  return (
    <div>
      <div className="w-full mb-8 border-[1.3px] border-slate-200 dark:border-muted overflow-x-auto block rounded-lg min-h-[30.3rem] bg-white dark:bg-muted">
        {/* Render table if table has data  */}
        <table className="w-full h-full rounded-lg">
          <thead className="text-xs">
            {/* Mapping through the table headers */}
            {table?.getHeaderGroups()?.map((headerGroup, i) => (
              <tr key={i}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="bg-[#F9FAFB] dark:bg-muted font-normal text-sm text-[#6C748B] dark:text-red-800 whitespace-nowrap py-5 px-5 text-left capitalize"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* Mapping throught the table body */}
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={index}
                className="border-t-[1.3px] bg-[#FFFFFF] dark:bg-muted border-slate-200 dark:border-t-[0.1px] dark:border-muted-foreground text-[14px] text-sm text-[#6C748B] font-normal cursor-pointer whitespace-nowrap hover:bg-[#F9FAFB]"
              >
                {row.getVisibleCells().map((cell, key) => (
                  <td
                    key={key}
                    className="p-5 relative group hover:opacity-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination only when table has content*/}
      <div className="flex items-center gap-x-8 justify-end px-4 py-3  rounded-b-[0.5rem] mb-6">
        <span className="flex items-center gap-1  text-small">
          {paginationText}
        </span>
        <div className="space-x-5">
          <button
            className={`${
              currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
            } p-1`}
            onClick={handlePreviousPage}
          >
            <ChevronLeft color={currentPage === 1 ? "#213f7d66" : "#079455"} />
          </button>
          <button
            className={`${
              endCursor === null ? "cursor-not-allowed" : "cursor-pointer"
            } p-1`}
            onClick={handleNextPage}
          >
            <ChevronRight
              color={endCursor === null ? "#213f7d66" : "#079455"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
