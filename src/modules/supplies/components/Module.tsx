import columns from "./ColumnsTable";
import { useGetAllSupplies } from "../hooks/useGetAllSupplies";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DataTable,
  ErrorLoading,
  Loading,
  SearchBar,
  ToolTipTemplate,
} from "@/modules/core/components";
import { PlusIcon } from "lucide-react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components";

export const SuppliesModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get("search") || "";

  const { query, pagination, setPagination } = useGetAllSupplies({
    searchParameter: "",
    allRecords: true,
  });

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <Label className="text-2xl">Insumos</Label>

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        <div className="flex items-center justify-between gap-2 w-[650px] p-1">
          <SearchBar search={searchParameter} />
          <ToolTipTemplate content={"Crear"}>
            <Button
              className="bg-blue-600 rounded-full hover:bg-blue-400"
              onClick={() => navigate("../create")}
            >
              <PlusIcon className="w-4 h-4 mr-2" /> Crear
            </Button>
          </ToolTipTemplate>
        </div>
        <div className="w-[650px]">
          <DataTable
            columns={columns}
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

export default SuppliesModule;
