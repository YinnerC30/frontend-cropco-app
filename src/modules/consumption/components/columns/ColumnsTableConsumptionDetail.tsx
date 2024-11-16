import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { FormatNumber } from "@/modules/core/helpers/formatting/FormatNumber";

import { ConsumptionDetails } from "../../interfaces/ConsumptionDetails";
import { ActionsTableConsumptionDetail } from "./ActionsTableConsumptionDetail";

export const columnsConsumptionDetail: ColumnDef<ConsumptionDetails>[] = [
  {
    accessorKey: "supply.name",
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Insumo:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "crop.name",
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Cultivo:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => {
      return FormatNumber(row.getValue("amount"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Valor a gastar:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

export const columnsConsumptionDetailActions = [
  ...columnsConsumptionDetail,
  {
    id: "actions",
    cell: ({ row }: any) => {
      const consumptionDetail = row.original;

      return (
        <ActionsTableConsumptionDetail consumptionDetail={consumptionDetail} />
      );
    },
  },
];

export default {
  columnsShoppingDetail: columnsConsumptionDetail,
  columnsShoppingDetailActions: columnsConsumptionDetailActions,
};
