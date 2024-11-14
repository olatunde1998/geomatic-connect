import React, { FC, useEffect, useState } from "react";
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
}

export const Table = ({
  data,
  columns = [],
}: // filters,
// rowHoveringBgColor,
// resetCheckboxes,
// setResetCheckboxes,
// handlePreviousPage,
// handleNextPage,
// currentPage,
// pageSize,
// totalItems,
// endCursor,
TableProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    //
    debugTable: true,
    // filters,
  });

  // useEffect(() => {
  //   if (resetCheckboxes) {
  //     setRowSelection({});
  //     setResetCheckboxes(false);
  //   }
  // }, [resetCheckboxes, setResetCheckboxes]);

  // const entriesPerPage = pageSize;
  // const totalEntries = totalItems || 0;
  // const startSerial = (currentPage - 1) * entriesPerPage + 1;
  // const endSerial = currentPage * entriesPerPage;
  // const paginationText = `${startSerial} - ${endSerial} of ${totalEntries}`;

  return (
    <div>
      <div className="w-full mb-8 border-[1.3px] border-slate-200 overflow-x-auto block rounded-lg min-h-[30.3rem] bg-white text-[#667085">
        {/* Render table if table has data  */}
        <table className="w-full h-full rounded-lg">
          <thead className="text-xs">
            {/* Mapping through the table headers */}
            {table?.getHeaderGroups()?.map((headerGroup, i) => (
              <tr key={i}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="bg-[#F9FAFB] font-normal text-sm text-[#6C748B] whitespace-nowrap py-5 px-5 text-left capitalize"
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
                className="border-t-[1.3px] bg-[#FFFFFF] border-slate-200 text-[14px] text-sm text-[#6C748B] font-normal cursor-pointer whitespace-nowrap hover:bg-[#F9FAFB]"
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
      {/* <div className="flex items-center gap-x-8 justify-end px-4 py-3  rounded-b-[0.5rem] mb-6">
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
            <ChevronLeft color={currentPage === 1 ? "#213f7d66" : "#213F7D"} />
          </button>
          <button
            className={`${
              endCursor === null ? "cursor-not-allowed" : "cursor-pointer"
            } p-1`}
            onClick={handleNextPage}
          >
            <ChevronRight
              color={endCursor === null ? "#213f7d66" : "#213F7D"}
            />
          </button>
        </div>
      </div> */}
    </div>
  );
};
