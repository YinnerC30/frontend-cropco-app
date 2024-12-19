import { useState } from 'react';
import { UsePaginationDataTableReturn } from '../../interfaces/data-table/PaginationDataTableReturn';

interface Props {
  index?: number;
  size?: number;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export const usePaginationDataTable = ({
  index = 0,
  size = 10,
}: Props = {}): UsePaginationDataTableReturn => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: index,
    pageSize: size,
  });

  const { pageIndex, pageSize } = pagination;

  return {
    pagination,
    setPagination,
    pageIndex,
    pageSize,
  };
};
