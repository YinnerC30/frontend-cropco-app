import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { useDeleteHarvestProcessed } from "../hooks/useDeleteHarvestProcessed";
import { HarvestProcessed } from "../interfaces/HarvestProcessed";
import { formFieldsHarvestProcessed } from "../utils/formFieldsHarvestProcessed";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ActionsHarvestProcessedTable } from "./ActionsHarvestProcessedTable";

export let columnsHarvestProcessed: ColumnDef<HarvestProcessed>[] = [
  {
    accessorKey: formFieldsHarvestProcessed.date.name,
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsHarvestProcessed.date.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsHarvestProcessed.total.name,
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsHarvestProcessed.total.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

columnsHarvestProcessed.push({
  id: "actions",
  cell: ({ row }: any) => {
    const { id } = useParams();

    const values = row.original;

    const queryClient = useQueryClient();

    const { mutate, isSuccess } = useDeleteHarvestProcessed();

    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["harvest", id] });
    }

    return (
      <ActionsHarvestProcessedTable
        mutate={mutate}
        id={row.original.id}
        values={values}
      />
    );
  },
});

export default columnsHarvestProcessed;
