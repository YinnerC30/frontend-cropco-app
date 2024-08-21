import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";


import { ColumnDef } from "@tanstack/react-table";

import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";

import { Badge } from "@/components";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { PaymentPending } from "../../interfaces/PaymentPending";
import { removeRecordToPay } from "../../utils/paymentSlice";
import { ActionsTablePaymentsToPay } from "./ActionsTablePaymentsToPay";

export const columnsPaymentsToPay: ColumnDef<PaymentPending>[] = [
  {
    accessorKey: "value_pay",
    cell: ({ row }) => {
      return FormatMoneyValue(row.getValue("value_pay"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Total a recibir:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "payment_is_pending",
    cell: ({ row }) => {
      const value = row.getValue("payment_is_pending");
      return value ? (
        <Badge variant={"destructive"}>SI</Badge>
      ) : (
        <Badge variant={"success"}>NO</Badge>
      );
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Pago pendiente:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    cell: ({ row }) => {
      const value = row.getValue("type");
      return value === "harvest" ? (
        <Badge variant={"destructive"}>Harvest</Badge>
      ) : (
        <Badge variant={"success"}>Work</Badge>
      );
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Tipo:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

export const columnsPaymentsToPayActions = [
  ...columnsPaymentsToPay,
  {
    id: "actions",
    cell: ({ row }: any) => {
      const record = row.original;

      const dispatch = useAppDispatch();

      const handleDelete = () => {
        toast.success(`Se ha eliminado el registro`);
        dispatch(removeRecordToPay({ ...record }));
      };

      return (
        <ActionsTablePaymentsToPay record={record} action={handleDelete} />
      );
    },
  },
];

export default {
  columnsPaymentsToPay,
  columnsPaymentsToPayActions,
};
