import { PlusIcon } from "lucide-react";

import { useNavigate, useSearchParams } from "react-router-dom";
import columns from "./ColumnsTable";
import { useGetAllCrops } from "../hooks/useGetAllCrops";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Loading,
  ErrorLoading,
  SearchBar,
  ToolTipTemplate,
  DataTable,
} from "../../core/components";

export const CropsModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get("search") || "";

  const { query, pagination, setPagination } = useGetAllCrops({
    searchParameter,
    allRecords: false,
  });

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <Label className="text-2xl">Cultivos</Label>

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        <div className="flex items-center justify-between gap-2 w-[1000px] p-1">
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
        <div className="w-[1000px]">
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

export default CropsModule;
