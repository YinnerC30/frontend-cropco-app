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

      <ScrollArea className="w-full h-[80vh] ">
        <div className="flex items-center justify-center w-full py-2">
          <SearchBar search={searchParameter} />
        </div>
        <div className="flex items-center justify-end w-full py-2">
          <ButtonCreateRecord route={"../create"} />
        </div>
        <div>
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
