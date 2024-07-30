import {
  Loading,
  ErrorLoading,
  SearchBar,
  ToolTipTemplate,
  DataTable,
} from "@/modules/core/components";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import columns from "./ColumnsTable";
import { Button, Label, ScrollArea, Separator } from "@/components";
import { PlusIcon } from "lucide-react";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ButtonCreateRecord } from "@/modules/core/components/ButtonCreateRecord";

export const UsersModule = () => {
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get("search") || "";

  const { query, pagination, setPagination } = useGetAllUsers(searchParameter);

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb
        items={[{ link: "/users/view", name: "Usuarios" }]}
        finalItem={"Todos los usuarios"}
      />
      <Label className="text-2xl">Usuarios del sistema</Label>
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        <div className="flex items-center justify-between gap-2 w-[650px] p-1">
          <SearchBar search={searchParameter} />
          <ButtonCreateRecord route={"../create"} />
        </div>
        <div className="w-[650px]">
          <DataTable
            columns={columns}
            rows={query.data?.rows ?? 0}
            data={query.data ?? []}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </ScrollArea>
    </>
  );
};

export default UsersModule;
