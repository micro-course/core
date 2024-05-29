import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { Table } from "@tanstack/react-table";

const tableContext = createStrictContext<Table<any>>();

export const useDataTableContext = <T>() => {
  return useStrictContext(tableContext) as Table<T>;
};

export const DataTableProvider = tableContext.Provider;
