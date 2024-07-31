import { UseQueryResult } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { ResponseApiGetAllRecords } from "./ResponseApiGetAllRecords";

export interface ResponseUseGetAllRecords<T> {
  query: UseQueryResult<ResponseApiGetAllRecords<T>, Error>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}
