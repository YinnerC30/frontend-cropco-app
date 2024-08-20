import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { WorkDetail } from "../../interfaces/WorkDetail";
import { ActionsTableWorkDetail } from "./ActionsTableWorkDetail";

export const columnsWorkDetail: ColumnDef<WorkDetail>[] = [
  {
    accessorKey: "employee.first_name",
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Empleado:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "value_pay",
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue("value_pay"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Valor a pagar:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

export const columnsWorkDetailActions = [
  ...columnsWorkDetail,
  {
    id: "actions",
    cell: ({ row }: any) => {
      const workDetail = row.original;
      return <ActionsTableWorkDetail workDetail={{ ...workDetail }} />;
    },
  },
];

export default {
  columnsWorkDetail,
  columnsWorkDetailActions,
};
