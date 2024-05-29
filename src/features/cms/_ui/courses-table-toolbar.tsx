"use client";

import { Input } from "@/shared/ui/input";
import { DataTableViewOptions } from "@/shared/ui/data-table/data-table-view-options";
import { useDataTableContext } from "@/shared/ui/data-table/data-table-provider";
import { CourseTableItem } from "../_domain/types";
import { CreateCourseDialog } from "./create-course-dialog";

export function CoursesTableToolbar() {
  const table = useDataTableContext<CourseTableItem>();
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <DataTableViewOptions table={table} />
      <CreateCourseDialog />
    </div>
  );
}
