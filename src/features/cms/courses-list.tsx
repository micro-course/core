"use client";

import { Card } from "@/shared/ui/card";
import { crmApi } from "./_api";
import { DataTable } from "@/shared/ui/data-table/data-table";
import { CoursesTableToolbar } from "./_ui/courses-table-toolbar";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { columns } from "./_ui/courses-table-columns";

export function CoursesList() {
  const coursesList = crmApi.crm.getCoursesList.useQuery();

  if (coursesList.isPending) {
    return <FullPageSpinner isLoading />;
  }

  if (coursesList.isError) {
    return <Card>Error</Card>;
  }

  return (
    <DataTable
      columns={columns}
      toolbar={<CoursesTableToolbar />}
      data={coursesList.data || []}
    />
  );
}
