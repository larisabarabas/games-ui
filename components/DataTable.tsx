"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  Row,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "./DataRangePicker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
  rowCount: number;
  onTablePaginationNext: () => void;
  onTablePaginationPrevious: () => void;
}

export function DataTable<TData extends Game, TValue>({
  columns,
  data,
  totalPages,
  rowCount,
  onTablePaginationNext,
  onTablePaginationPrevious,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    rowCount: rowCount,
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleGameNavigation = (row: Row<TData>) => {
    const game = row.original;
    router.push(`/games/${game.id}`);
  };

  return (
    <div>
      <div className="flex justify-between gap-8">
        <SearchBar
          placeholder="Filter games ..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onInputChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
        />
        <DatePickerWithRange
          className="mb-4"
          onInputChange={(range) => {
            console.log(range);
            table.getColumn("release_date")?.setFilterValue(range);
          }}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    handleGameNavigation(row);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
            onTablePaginationPrevious();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
            onTablePaginationNext();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
