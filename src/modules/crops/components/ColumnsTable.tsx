import { Crop } from "@/modules/crops/interfaces/Crop";
import { ColumnDef } from "@tanstack/react-table";

import { FormatDate } from "@/modules/core/helpers/FormatDate";
import { ActionsTable, ButtonHeaderTable } from "../../core/components";
import { useDeleteCrop } from "../hooks/useDeleteCrop";
import { formFields } from "../utils";
import { FormatNumber } from "@/modules/core/helpers/FormatNumber";

export let columns: ColumnDef<Crop>[] = [
  {
    accessorKey: formFields.name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.name.label} />
      );
    },
  },
  {
    accessorKey: formFields.description.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.description.label}
        />
      );
    },
  },
  {
    accessorKey: formFields.units.name,
    cell: ({ row }) => {
      return FormatNumber(row.getValue("units"));
    },
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.units.label} />
      );
    },
  },
  {
    accessorKey: formFields.location.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable column={column} label={formFields.location.label} />
      );
    },
  },
  {
    accessorKey: formFields.date_of_creation.name,
    cell: ({ row }) => {
      const date: string = row.getValue(formFields.date_of_creation.name);
      return FormatDate({ date });
    },
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.date_of_creation.label}
        />
      );
    },
  },
  {
    accessorKey: formFields.date_of_termination.name,
    cell: ({ row }) => {
      const date: string = row.getValue(formFields.date_of_termination.name);
      return FormatDate({ date });
    },
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFields.date_of_termination.label}
        />
      );
    },
  },
];

columns.push({
  id: "actions",
  cell: ({ row }: any) => {
    const { id } = row.original;
    const { mutate } = useDeleteCrop();
    return <ActionsTable mutate={mutate} id={id} />;
  },
});

export default columns;
