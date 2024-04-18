import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { HarvestProcessed } from "@/modules/harvests/Harvest";
import { formFieldsHarvestProcessed } from "./ElementsHarvestProcessedForm";
import { useDeleteHarvestProcessed } from "./hooks/useDeleteHarvestProcessed";
import { ActionsTable } from "../core/components";

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
    accessorKey: `${formFieldsHarvestProcessed.crop.name}`,
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsHarvestProcessed.crop.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsHarvestProcessed.harvest.name,
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsHarvestProcessed.harvest.label}
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
    const { id } = row.original;

    const { mutate } = useDeleteHarvestProcessed();

    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columnsHarvestProcessed;
