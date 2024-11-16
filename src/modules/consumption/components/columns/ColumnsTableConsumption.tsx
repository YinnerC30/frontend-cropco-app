import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components";
import { FormatDate } from "@/modules/core/helpers/formatting/FormatDate";
import { ArrowUpDown } from "lucide-react";
import { ConsumptionSupplies } from "../../interfaces/ConsuptionSupplies";
import { formFieldsConsumption } from "../../utils/formFieldsConsumption";
import { ActionsTableConsumption } from "./ActionsTableConsumption";
import { useDeleteConsumption } from "../../hooks/useDeleteConsumption";

export let columnsConsumption: ColumnDef<ConsumptionSupplies>[] = [
  {
    accessorKey: formFieldsConsumption.date.name,
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
          {formFieldsConsumption.date.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const { id } = row.original;

      const { mutate } = useDeleteConsumption();

      return <ActionsTableConsumption mutate={mutate} id={id} />;
    },
  },
];

export default columnsConsumption;
