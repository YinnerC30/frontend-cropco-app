import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components";
import { FormatDate } from "@/modules/core/helpers/formatting/FormatDate";
import { FormatMoneyValue } from "@/modules/core/helpers/formatting/FormatMoneyValue";
import { ArrowUpDown } from "lucide-react";

import { ShoppingSupplies } from "../../interfaces/ShoppingSupplies";
import { formFieldsShopping } from "../../utils/formFieldsShopping";
import { ActionsTableShopping } from "./ActionsTableShopping";
import { useDeleteShopping } from "../../hooks/useDeleteShopping";

export const columnsShopping: ColumnDef<ShoppingSupplies>[] = [
  {
    accessorKey: formFieldsShopping.date.name,
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
          {formFieldsShopping.date.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsShopping.total.name,
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
          Total a pagar:
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const { id } = row.original;
      const { mutate } = useDeleteShopping();
      return <ActionsTableShopping id={id} mutate={mutate} />;
    },
  },
];

export default columnsShopping;
