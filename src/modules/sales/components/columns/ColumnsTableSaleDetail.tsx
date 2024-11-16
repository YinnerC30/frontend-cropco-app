import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { FormatMoneyValue } from "@/modules/core/helpers/formatting/FormatMoneyValue";
import { FormatNumber } from "@/modules/core/helpers/formatting/FormatNumber";
import { SaleDetail } from "../../interfaces";
import { ActionsTableSaleDetail } from "./ActionsTableSaleDetail";

export const columnsSaleDetail: ColumnDef<SaleDetail>[] = [
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
    accessorKey: "client.first_name",
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Cliente:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    cell: ({ row }) => {
      return FormatNumber(row.getValue("quantity"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Valor a vender:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "total",
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue("total"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Total a recibir:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

export const columnsSaleDetailActions = [
  ...columnsSaleDetail,
  {
    id: "actions",
    cell: ({ row }: any) => {
      const saleDetail = row.original;

      return <ActionsTableSaleDetail saleDetail={saleDetail} />;
    },
  },
];

export default {
  columnsSaleDetail,
  columnsSaleDetailActions,
};
