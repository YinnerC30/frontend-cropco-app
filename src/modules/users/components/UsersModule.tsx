import {
  DataTable,
  ErrorLoading,
  Loading,
  SearchBar,
} from "@/modules/core/components";

import { ScrollArea } from "@/components";
import { BreadCrumb } from "@/modules/core/components/BreadCrumb";
import { ButtonCreateRecord } from "@/modules/core/components/ButtonCreateRecord";
import { useSearchParams } from "react-router-dom";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import columnsTableUsers from "./ColumnsTableUsers";

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
      <BreadCrumb finalItem={"Usuarios"} />

      <ScrollArea className="w-full h-[80vh]">
        <div className="flex items-center justify-between gap-2 w-[650px] p-1">
          <SearchBar search={searchParameter} />
          <ButtonCreateRecord route={"../create"} />
        </div>
        <div className="w-[650px]">
          <DataTable
            columns={columnsTableUsers}
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
