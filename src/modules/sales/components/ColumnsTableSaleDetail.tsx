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

// import { ModifySaleDetail } from "./ModifySaleDetail";
// import { remove, calculateTotal } from "../utils/harvestSlice";
import { SaleDetail } from "../interfaces/SaleDetail";
import { FormatMoneyValue } from "@/modules/core/helpers/FormatMoneyValue";
import { FormatNumber } from "@/modules/core/helpers/FormatNumber";
import { calculateTotal, remove } from "../utils/saleSlice";
import { ModifySaleDetail } from "./ModifySaleDetail";

export const columnsSaleDetail: ColumnDef<SaleDetail>[] = [
  {
    accessorKey: "crop.name",
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Cultivo:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "client.first_name",
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Cliente:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    cell: ({ row }) => {
      return FormatNumber(row.getValue("quantity"));
    },
    header: ({ column }: any) => {
      return (
        <Button
          className="px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {"Valor a vender:"}
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
          {"Total a recibir:"}
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];

export const columnsSaleDetailActions = [
  ...columnsSaleDetail,
  {
    id: "actions",
    cell: ({ row }: any) => {
      const saleDetail = row.original;

      const dispatch = useAppDispatch();

      const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
      const [isDialogOpen, setDialogOpen] = useState(false);

      const handleDelete = () => {
        dispatch(remove(saleDetail));
        toast.success(
          `Se ha eliminado la venta del cliente ${saleDetail.client.first_name}`
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
                  <ModifySaleDetail
                    defaultValues={saleDetail}
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
  columnsSaleDetail,
  columnsSaleDetailActions,
};
