import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { ActionsTable } from "@/modules/core/components";
import { FormatDate } from "@/modules/core/helpers/FormatDate";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { useDeleteWork } from "../hooks/useDeleteWork";
import { Work } from "../interfaces/Work";
import { formFieldsWork } from "../utils/formFieldsWork";

export let columnsWork: ColumnDef<Work>[] = [
  {
    accessorKey: formFieldsWork.date.name,
    cell: ({ row }) => {
      return FormatDate({ date: row.getValue("date") });
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsWork.date.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsWork.description.name,
    cell: ({ row }) => {
      return row.getValue("description");
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsWork.description.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsWork.value_pay.name,
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
          Valor a pagar:
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsWork.payment_is_pending.name,
    cell: ({ row }) => {
      const value = row.getValue("payment_is_pending");
      return value ? "SI" : "NO";
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsWork.payment_is_pending.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

columnsWork.push({
  id: "actions",
  cell: ({ row }: any) => {
    const { id } = row.original;

    const { mutate } = useDeleteWork();

    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columnsWork;
