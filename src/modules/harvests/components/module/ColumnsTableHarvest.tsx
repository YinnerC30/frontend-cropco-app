import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { FormatDate } from "@/modules/core/helpers/formatting/FormatDate";
import { FormatMoneyValue } from "@/modules/core/helpers/formatting/FormatMoneyValue";
import { FormatNumber } from "@/modules/core/helpers/formatting/FormatNumber";
import { useDeleteHarvest } from "../../hooks/mutations/useDeleteHarvest";
import { TableHarvest } from "../../interfaces/TableHarvest";
import { formFieldsHarvest } from "../../utils";
import { ActionsTableHarvest } from "./ActionsTableHarvest";

export const columnsHarvest: ColumnDef<TableHarvest>[] = [
  {
    accessorKey: formFieldsHarvest.date.name,
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
          {formFieldsHarvest.date.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsHarvest.crop.name,
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsHarvest.crop.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsHarvest.total.name,
    cell: ({ row }) => {
      return FormatNumber(row.getValue("total"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Cosechado:
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsHarvest.value_pay.name,
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
          {formFieldsHarvest.value_pay.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }: any) => {
  //     const { id } = row.original;

  //     const { mutate } = useDeleteHarvest();

  //     return <ActionsTableHarvest mutate={mutate} id={id} />;
  //   },
  // },
];

export default columnsHarvest;
