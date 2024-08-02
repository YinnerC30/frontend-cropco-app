import { Supplier } from "@/modules/suppliers/interfaces/Supplier";
import { ColumnDef } from "@tanstack/react-table";

import { ButtonHeaderTable } from "../../core/components";
import { formFieldsSupplier } from "../utils/formFieldsSupplier";
import { ActionsTableSuppliers } from "./ActionsTableSuppliers";

export let columnsTableSuppliers: ColumnDef<Supplier>[] = [
  {
    accessorKey: formFieldsSupplier.first_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.first_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupplier.last_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.last_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupplier.email.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.email.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupplier.cell_phone_number.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.cell_phone_number.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupplier.address.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.address.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsSupplier.company_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsSupplier.company_name.label}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ActionsTableSuppliers,
  },
];

export default columnsTableSuppliers;
