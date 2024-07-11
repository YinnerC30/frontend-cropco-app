import { Button } from "@/components/ui/button";

import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DataTable,
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from "../../core/components";
import columnsPayment from "./ColumnsTablePayments";
import { useGetAllPayments } from "../hooks/useGetAllPayments";

export const PaymentsModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get("search") || "";

  const { query, pagination, setPagination } =
    useGetAllPayments(searchParameter);

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <Label className="text-2xl">Pagos</Label>

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* TODO: Agregar filtros de fecha, empleado, método de pago */}
        <div className="flex items-center justify-between gap-2 w-[750px] p-1">
          <ToolTipTemplate content={"Crear"}>
            <Button
              className="bg-blue-600 rounded-full hover:bg-blue-400"
              onClick={() => navigate("../create")}
            >
              <PlusIcon className="w-4 h-4 mr-2" /> Crear
            </Button>
          </ToolTipTemplate>
        </div>
        <div className="w-[750px]">
          <DataTable
            columns={columnsPayment}
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

export default PaymentsModule;
