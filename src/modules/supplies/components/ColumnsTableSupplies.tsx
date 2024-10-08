import { Supply } from "@/modules/supplies/interfaces/Supply";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components";
import { ButtonHeaderTable } from "@/modules/core/components";
import { formFieldsSupply } from "../utils";
import { ActionsTableSupplies } from "./ActionsTableSupplies";

export let columnsTableSupplies: ColumnDef<Supply>[] = [
  {
    accessorKey: formFieldsSupply.name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupply.brand.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.brand.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupply.unit_of_measure.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.unit_of_measure.label}
        />
      );
    },
    cell: ({ row }) => {
      const unitOfMeasure: string = row.getValue("unit_of_measure");
      return (
        <Badge variant={unitOfMeasure === "GRAMOS" ? "lime" : "cyan"}>
          {unitOfMeasure}
        </Badge>
      );
    },
  },
  {
    accessorKey: formFieldsSupply.observation.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupply.observation.label}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ActionsTableSupplies,
  },
];

export default columnsTableSupplies;
