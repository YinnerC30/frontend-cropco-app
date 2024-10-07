import { Button } from "@/components/ui/button";

import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ScrollArea } from "@/components/ui/scroll-area";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import {
  DataTable,
  ErrorLoading,
  Loading,
  SearchBar,
  ToolTipTemplate,
} from "../../core/components";
import { useGetAllClients } from "../hooks/useGetAllClients";
import { columnsTableClients } from "./ColumnsTableClients";

export const ClientsModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get("search") || "";

  const { query, pagination, setPagination } =
    useGetAllClients(searchParameter);

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb finalItem={`Clientes`} />

      <ScrollArea className="w-full h-[80vh]">
        <div className="flex items-center justify-between gap-2 w-[750px] p-1">
          <SearchBar query={searchParameter} />
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
            columns={columnsTableClients}
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

export default ClientsModule;
