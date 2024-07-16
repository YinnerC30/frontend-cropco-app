import { ActionsTable } from "@/modules/core/components/table/ActionsTable";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components";
import { FormatDate } from "@/modules/core/helpers/FormatDate";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { ArrowUpDown } from "lucide-react";
import { useDeletePurchase } from "../hooks/useDeletePurchase";
import { PurchaseSupplies } from "../interfaces/PurchaseSupplies";
import { formFields } from "../utils/formFields";

export let columnsPurchase: ColumnDef<PurchaseSupplies>[] = [
  {
    accessorKey: formFields.date.name,
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
          {formFields.date.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFields.total.name,
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
];

columnsPurchase.push({
  id: "actions",
  cell: ({ row }: any) => {
    const { id } = row.original;
    const { mutate } = useDeletePurchase();
    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columnsPurchase;
