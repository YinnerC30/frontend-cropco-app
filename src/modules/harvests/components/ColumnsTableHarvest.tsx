import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { useDeleteHarvest } from "../hooks/useDeleteHarvest";

import { TableHarvest } from "../interfaces/TableHarvest";
import { formFieldsHarvest } from "../utils";

import { ActionsHarvestTable } from "./ActionsHarvestTable";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { FormatNumber } from "@/modules/core/helpers/FormatNumber";
import { FormatDate } from "@/modules/core/helpers/FormatDate";

export let columnsHarvest: ColumnDef<TableHarvest>[] = [
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
          {formFieldsHarvest.total.label}
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
];

columnsHarvest.push({
  id: "actions",
  cell: ({ row }: any) => {
    const { id } = row.original;

    const { mutate } = useDeleteHarvest();

    return <ActionsHarvestTable mutate={mutate} id={id} />;
  },
});

export default columnsHarvest;
