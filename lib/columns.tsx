"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDateToLocal } from "./utils";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const customDateFilter = (row, columnId: string, filterValue: DateRange) => {
  console.log(row);
  const date = new Date(row.getValue(columnId));
  return date > filterValue.from && date < filterValue.to;
  // return row.getValue(columnId).includes(filterValue);
};

export const columns: ColumnDef<Game>[] = [
  {
    accessorKey: "avatar",
    header: "",
    size: 50,
    cell: () => {
      return (
        <div className="flex justify-center">
          <Image
            className="rounded-md"
            src="/assets/images/placeholder-games-2.png"
            alt="Game image placeholder"
            height={44}
            width={44}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="text-right hover:no-underline text-gray-500"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="font-medium ">{row.getValue("title")}</p>;
    },
  },
  {
    accessorKey: "release_date",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            className="text-right hover:no-underline text-gray-500"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Release Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("release_date");
      const formatted = formatDateToLocal(date, "en-US");
      return (
        <div>
          <p className="text-right">{formatted}</p>
        </div>
      );
    },
    filterFn: customDateFilter,
  },
  {
    accessorKey: "enabled",
    header: () => <div className="text-center">Enabled</div>,
    cell: ({ row }) => {
      const value: boolean = row.getValue("enabled");
      return (
        <div className="text-center">
          <Checkbox checked={value} />
        </div>
      );
    },
  },
];
