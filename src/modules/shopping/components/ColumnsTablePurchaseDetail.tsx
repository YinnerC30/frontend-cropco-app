import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import { useAppDispatch } from "@/redux/store";
import { toast } from "sonner";

import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { FormatNumber } from "@/modules/core/helpers/FormatNumber";
import { PurchaseDetails } from "../interfaces/PurchaseDetails";
import { calculateTotal, remove } from "../utils/purchaseSlice";
import { ModifyPurchaseDetail } from "./ModifyPurchaseDetail";

export const columnsPurchaseDetail: ColumnDef<PurchaseDetails>[] = [
  {
    accessorKey: "supply.name",
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Insumo:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "supplier.first_name",
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Proveedor:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => {
      return FormatNumber(row.getValue("amount"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Valor a comprar:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "total",
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
          {"Total a pagar:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

export const columnsPurchaseDetailActions = [
  ...columnsPurchaseDetail,
  {
    id: "actions",
    cell: ({ row }: any) => {
      const purchaseDetail = row.original;

      const dispatch = useAppDispatch();

      const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
      const [isDialogOpen, setDialogOpen] = useState(false);

      const handleDelete = () => {
        dispatch(remove(purchaseDetail));
        toast.success(
          `Se ha eliminado la compra del proveedor ${purchaseDetail.supplier.first_name}`
        );
        dispatch(calculateTotal());
        setOpenDropDownMenu(false);
      };

      return (
        <>
          <DropdownMenu open={openDropDownMenu} modal={openDropDownMenu}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-8 h-8 p-0"
                onClick={() => setOpenDropDownMenu(!openDropDownMenu)}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onPointerDownOutside={() => setOpenDropDownMenu(false)}
              align="center"
              className="flex flex-col items-center"
            >
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator className="w-full" />
              <DropdownMenuItem asChild>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"ghost"}>
                      <TrashIcon className="w-4 h-4 mr-2" /> Eliminar
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        ¿Estas seguro de eliminar el registro?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción es irreversible y no podrá recuperar su
                        registro
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel asChild>
                        <Button
                          variant="secondary"
                          onClick={() => setOpenDropDownMenu(false)}
                        >
                          Cancelar
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button onClick={() => handleDelete()}>
                          Continuar
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="w-full" />
              <DropdownMenuItem asChild>
                <>
                  <Button variant="ghost" onClick={() => setDialogOpen(true)}>
                    <Pencil2Icon className="w-full h-4 mr-2" /> Modificar
                  </Button>
                  <ModifyPurchaseDetail
                    defaultValues={purchaseDetail}
                    isDialogOpen={isDialogOpen}
                    setDialogOpen={setDialogOpen}
                    afterEffect={setOpenDropDownMenu}
                  />
                </>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

export default {
  columnsPurchaseDetail,
  columnsPurchaseDetailActions,
};
