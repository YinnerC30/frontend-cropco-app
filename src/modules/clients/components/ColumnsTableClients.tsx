import { Client } from "@/modules/clients/interfaces/Client";
import { ColumnDef } from "@tanstack/react-table";
import { ButtonHeaderTable } from "../../core/components";
import { formFieldsClient } from "../utils";
import { ActionsTableClients } from "./ActionsTableClients";

export const columnsTableClients: ColumnDef<Client>[] = [
  {
    accessorKey: formFieldsClient.first_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.first_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsClient.last_name.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.last_name.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsClient.email.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.email.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsClient.cell_phone_number.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.cell_phone_number.label}
        />
      );
    },
  },
  {
    accessorKey: formFieldsClient.address.name,
    header: ({ column }: any) => {
      return (
        <ButtonHeaderTable
          column={column}
          label={formFieldsClient.address.label}
        />
      );
    },
  },

  {
    id: "actions",
    cell: ActionsTableClients,
  },
];

export default columnsTableClients;
