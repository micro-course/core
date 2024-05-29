"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/shared/ui/badge";
import { Checkbox } from "@/shared/ui/checkbox";

import { DataTableColumnHeader } from "@/shared/ui/data-table/data-table-column-header";
import { DataTableRowActions } from "./course-row-action";
import { CourseTableItem } from "../_domain/types";

export const columns: ColumnDef<CourseTableItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "thumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="thumbnail" />
    ),
    cell: ({ row }) => {
      return (
        <img
          alt=""
          src={row.getValue("thumbnail")}
          className="h-10 w-10 object-contain"
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return <div className="max-w-[200px]">{row.getValue("title")}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      const product = row.getValue<CourseTableItem["product"]>("product");
      return (
        <div className="flex w-[100px] items-center">
          {product.access === "free" ? (
            <Badge variant="outline">Free</Badge>
          ) : (
            <Badge>Paid: {product.price}</Badge>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value === row.getValue(id);
    },
  },
  {
    accessorKey: "draft",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Draft" />
    ),
    cell: ({ row }) => {
      return row.getValue("draft") ? (
        <Badge variant={"destructive"}>Draft</Badge>
      ) : (
        <Badge>Published</Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value === row.getValue(id);
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => (
      <div>
        <div> {row.getValue("id")}</div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => (
      <div>
        <div>{row.getValue("slug")}</div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
