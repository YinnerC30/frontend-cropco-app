import { Button } from "@/components/ui/button";

import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetAllHarvestsProcessed } from "./hooks/useGetAllHarvestsProcessed";
import columnsHarvestProcessed from "./ColumnsHarvestProcessed";
import {
  Loading,
  ErrorLoading,
  ToolTipTemplate,
  DataTable,
} from "../core/components";

export const HarvestProcessedModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get("search") || "";

  const { query, pagination, setPagination } =
    useGetAllHarvestsProcessed(searchParameter);

  if (query.isLoading) return <Loading />;

  if (query.isError) {
    return <ErrorLoading />;
  }

  return (
    <>
      <Label className="text-2xl">Cosechas procesadas</Label>

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
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
        <div className="w-[800px]">
          <DataTable
            columns={columnsHarvestProcessed}
            rows={query.data?.rows!}
            data={query.data}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </ScrollArea>
    </>
  );
};

export default HarvestProcessedModule;
