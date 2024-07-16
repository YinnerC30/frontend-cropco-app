import { ActionsTable } from "@/modules/core/components/table/ActionsTable";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components";
import { FormatDate } from "@/modules/core/helpers/FormatDate";
import { ArrowUpDown } from "lucide-react";
import { useDeleteConsumption } from "../hooks/useDeleteConsumption";
import { ConsumptionSupplies } from "../interfaces/ConsuptionSupplies";
import { formFields } from "../utils/formFields";

export let columnsConsumption: ColumnDef<ConsumptionSupplies>[] = [
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
];

columnsConsumption.push({
  id: "actions",
  cell: ({ row }: any) => {
    const { id } = row.original;
    const { mutate } = useDeleteConsumption();
    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columnsConsumption;
