import { Button, Label, ScrollArea, Separator } from "@/components";
import {
  DataTable,
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from "@/modules/core/components";
import { PlusIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllPurchases } from "../hooks/useGetAllPurchases";
import columnsPurchase from "./ColumnsTablePurchase";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";

export const ShoppingModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get("search") || "";

  const { query, pagination, setPagination } =
    useGetAllPurchases(searchParameter);

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }
  return (
    <>
      <BreadCrumb
        items={[{ link: "/shopping/all", name: "Compras" }]}
        finalItem={`Todas las compras`}
      />
      <Label className="text-2xl">Compras</Label>

      <Separator className="my-2" />

      <ScrollArea className="w-full h-[80vh]">
        {/* TODO: Agregar filtros de fecha, pago pendiente */}
        <div className="flex items-start justify-between gap-2 w-[800px] p-1">
          <ToolTipTemplate content={"Crear"}>
            <Button
              className="bg-blue-600 rounded-full hover:bg-blue-400"
              onClick={() => navigate("../create")}
            >
              <PlusIcon className="w-4 h-4 mr-2" /> Crear
            </Button>
          </ToolTipTemplate>
        </div>
        {/* TODO: Agregar filtros de fecha y total */}
        <div className="w-[800px]">
          <DataTable
            columns={columnsPurchase}
            rows={query.data?.rows ?? 0}
            data={query.data}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </ScrollArea>
    </>
  );
};
export default ShoppingModule;
