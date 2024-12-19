import { PaginationState } from '../../hooks';

export interface UsePaginationDataTableReturn {
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pageIndex: number;
  pageSize: number;
}
