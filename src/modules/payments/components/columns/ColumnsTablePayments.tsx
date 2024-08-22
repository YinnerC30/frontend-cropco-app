import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { FormatDate } from "@/modules/core/helpers/FormatDate";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";

import { Badge } from "@/components";
import { useDeletePayment } from "../../hooks/useDeletePayment";
import { Payment } from "../../interfaces/Payment";
import { formFieldsPayments } from "../../utils";
import { ActionsTablePayment } from "./ActionsTablePayment";

export const columnsPayment: ColumnDef<Payment>[] = [
  {
    accessorKey: formFieldsPayments.date.name,
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
          {formFieldsPayments.date.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsPayments.employee.name,
    cell: ({ row }) => {
      const employee: any = row.getValue("employee");
      return employee.first_name;
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsPayments.employee.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsPayments.method_of_payment.name,
    cell: ({ row }) => {
      const methodOfPayment = row.getValue("method_of_payment");
      let badge;
      switch (methodOfPayment) {
        case "EFECTIVO":
          badge = <Badge variant={"success"}>Efectivo</Badge>;
          break;
        case "TRANSFERENCIA":
          badge = <Badge variant={"destructive"}>Transferencia</Badge>;
          break;
        case "INTERCAMBIO":
          badge = <Badge variant={"default"}>Intercambio</Badge>;
          break;
        default:
          break;
      }
      return badge;
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {formFieldsPayments.method_of_payment.label}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: formFieldsPayments.total.name,
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

      const { mutate } = useDeletePayment();

      return <ActionsTablePayment mutate={mutate} id={id} />;
    },
  },
];

export default columnsPayment;
